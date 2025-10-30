import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from "dompurify";
import {
  patchHeader,
  fetchHeader,
} from "../../../../../Services/Slices/HeaderSlice";
import { fetchPages } from "../../../../../Services/Slices/PagesSlice";
import { headerForm, MenuItem } from "../../../../../Services/interfaces";
import MenuItemEditor from "./MenuItemEditor";
import style from "./MainHeaderAdminPage.module.css";
import ColorPicker from "../../../../../Components/ColorPicker/ColorPicker";
import { Plus } from "lucide-react";
import { DndProvider } from "react-dnd";
import Snackbar from "../../../../../Components/Snackbar/Snackbar";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";

function MainHeaderAdminPage() {
  const [snackbarType, setSnackbarType] = useState<string | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const dispatch = useDispatch<any>();
  const data = useSelector((state: any) => state.headerSlice.data);
  const initialForm: headerForm = {
    status: "published",
    name_color: "#ffffff",
    background_color: "#1a1a1a",
    structure: [],
  };
  const [form, setForm] = useState<headerForm>(initialForm);

  const resetForm = (custom?: Partial<headerForm>) => {
    setForm({ ...initialForm, ...custom });
  };

  useEffect(() => {
    dispatch(fetchHeader());
    dispatch(fetchPages());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      const headerData = data[0] || data["0"] || data;
      const addUid = (items: MenuItem[]): MenuItem[] =>
        items.map((item) => ({
          uid: item.uid || uuidv4(),
          ...item,
          children: item.children ? addUid(item.children) : [],
        }));

      setForm({
        ...headerData,
        structure: addUid(headerData.structure || []),
      });
    }
  }, [data]);

  const handleAddRootItem = () => {
    const newItem: MenuItem = {
      uid: uuidv4(),
      name: "Novo Menu",
      type: "path",
      page: "",
      children: [],
    };
    setForm({ ...form, structure: [...(form.structure || []), newItem] });
  };

  const handleUpdateItem = (index: number, updatedItem: MenuItem) => {
    const newStructure = [...form.structure];
    newStructure[index] = updatedItem;
    setForm({ ...form, structure: newStructure });
  };

  const handleDeleteItem = (index: number) => {
    const newStructure = form.structure.filter((_, i) => i !== index);
    setForm({ ...form, structure: newStructure });
  };

  const handleSave = async () => {
    try {
      let response;
      response = await dispatch(patchHeader(form));

      if (response?.error || response?.status >= 400) {
        throw new Error("Erro ao salvar Cabeçalho");
      }

      setSnackbarType("patchSuccess");
      setSnackbarMessage("");
    } catch (err: any) {
      const errorMessage =
        typeof err === "string"
          ? err
          : err?.response?.data?.__all__?.[0] ||
            err?.message ||
            "Erro ao salvar Cabeçalho";
      setSnackbarType("patchError");
      setSnackbarMessage(errorMessage);
    }
  };

  const handleChange = (value: any, type: string) => {
    setForm((prev) => ({
      ...prev,
      [type]: DOMPurify.sanitize(value),
    }));
  };

  const handleReset = () => {
    if (data && data[0]) {
      const headerData = data[0];
      const addUid = (items: MenuItem[]): MenuItem[] =>
        items.map((item) => ({
          uid: item.uid || uuidv4(),
          ...item,
          children: item.children ? addUid(item.children) : [],
        }));

      setForm({
        ...headerData,
        structure: addUid(headerData.structure || []),
      });
    }
  };

  function removeItemPure(
    arr: MenuItem[],
    source: MenuItem
  ): [MenuItem[], MenuItem | null] {
    for (let i = 0; i < arr.length; i++) {
      const current = arr[i];
      if (current.uid === source.uid) {
        const newArr = arr.slice(0, i).concat(arr.slice(i + 1));
        return [newArr, current];
      }
      if (current.children?.length) {
        const [newChildren, removed] = removeItemPure(current.children, source);
        if (removed) {
          const replaced = { ...current, children: newChildren };
          const newArr = arr
            .slice(0, i)
            .concat([replaced])
            .concat(arr.slice(i + 1));
          return [newArr, removed];
        }
      }
    }
    return [arr, null];
  }

  function insertItemPure(
    arr: MenuItem[],
    target: MenuItem,
    removed: MenuItem,
    position: "above" | "below" | "inside"
  ): MenuItem[] {
    let inserted = false;

    const result = arr.flatMap((item) => {
      if (inserted) return [item];

      if (item.uid === target.uid) {
        inserted = true;

        if (position === "inside") {
          return [
            {
              ...item,
              children: [...(item.children || []), removed],
            },
          ];
        }
        if (position === "above") return [removed, item];
        if (position === "below") return [item, removed];
      }
      if (item.children?.length) {
        const updatedChildren = insertItemPure(
          item.children,
          target,
          removed,
          position
        );
        if (JSON.stringify(updatedChildren) !== JSON.stringify(item.children)) {
          inserted = true;
          return [
            {
              ...item,
              children: updatedChildren,
            },
          ];
        }
      }

      return [item];
    });

    return result;
  }

  function moveItem(
    items: MenuItem[],
    source: MenuItem,
    target: MenuItem | null,
    position: "above" | "below" | "inside" | "root"
  ): MenuItem[] {
    const [withoutSource, removed] = removeItemPure(items, source);
    if (!removed) return items;

    if (!target || position === "root") return [...withoutSource, removed];

    return insertItemPure(
      withoutSource,
      target,
      removed,
      position as "above" | "below" | "inside"
    );
  }

  const handleMoveItem = (
    source: MenuItem,
    target: MenuItem | null,
    position: "above" | "below" | "inside" | "root"
  ) => {
    setForm((prev) => {
      const newStructure = moveItem(
        prev.structure || [],
        source,
        target,
        position
      );
      return { ...prev, structure: newStructure };
    });
  };

  return (
    <>
      {snackbarType === "patchSuccess" && (
        <Snackbar
          type="patchSuccess"
          setSnackbarType={setSnackbarType}
          customMessage={snackbarMessage}
        />
      )}
      {snackbarType === "patchError" && (
        <Snackbar
          type="patchError"
          setSnackbarType={setSnackbarType}
          customMessage={snackbarMessage}
        />
      )}
      <DndProvider backend={HTML5Backend}>
        <div className={style.container}>
          <div className={style.body}>
            <div className={style.content}>
              <div className={style.header}>
                <h1 className={style.title}>Editor do cabeçalho</h1>
              </div>

              <div className={style.groupContainer}>
                <div>
                  <label className={style.label}>Cor do Texto</label>
                  <div className={style.pickColor}>
                    <ColorPicker
                      value={form.name_color}
                      onChange={(color: string) =>
                        handleChange(color, "name_color")
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className={style.label}>Cor de Fundo</label>
                  <div className={style.pickColor}>
                    <ColorPicker
                      value={form.background_color}
                      onChange={(color: string) =>
                        handleChange(color, "background_color")
                      }
                    />
                  </div>
                </div>
              </div>

              <div className={style.itensContainer}>
                <div className={style.addButtonContainer}>
                  <button onClick={handleAddRootItem} className={style.button}>
                    <Plus size={22} style={{ marginRight: 6 }} />
                    Adicionar novo Menu
                  </button>

                  <div className={style.buttonsContainer}>
                    <button className={style.button} onClick={handleSave}>
                      Salvar
                    </button>
                    <button
                      className={`${style.button} ${style.cancel}`}
                      onClick={() => {
                        handleReset();
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>

                {form.structure.length === 0 ? (
                  <div className={style.noneContainer}>
                    <p className={style.mainText}>Nenhum item no menu</p>
                    <p className={style.subText}>
                      Clique em "Adicionar Item Raiz" para começar
                    </p>
                  </div>
                ) : (
                  form.structure.map((item, index) => (
                    <MenuItemEditor
                      styles={style}
                      key={item.uid}
                      item={item}
                      index={index}
                      onUpdate={(updated: MenuItem) =>
                        handleUpdateItem(index, updated)
                      }
                      onDelete={handleDeleteItem}
                      onMove={handleMoveItem}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </DndProvider>
    </>
  );
}

export default MainHeaderAdminPage;
