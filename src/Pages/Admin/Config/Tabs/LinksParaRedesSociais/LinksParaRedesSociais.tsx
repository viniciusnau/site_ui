import React, { useState, useEffect } from "react";
import style from "./LinksParaRedesSociais.module.css";
import Input from "../../../../../Components/Forms/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSocialMedia,
  patchSocialMedia,
} from "../../../../../Services/Slices/SocialMediaSlice";
import Snackbar from "../../../../../Components/Snackbar/Snackbar";

function LinksParaRedesSociais() {
  const [snackbarType, setSnackbarType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.socialMedia.data);
  const [form, setForm] = useState({
    facebook: { id: null, url: "" },
    x: { id: null, url: "" },
    instagram: { id: null, url: "" },
    youtube: { id: null, url: "" },
    linkedin: { id: null, url: "" },
    pinterest: { id: null, url: "" },
    vimeo: { id: null, url: "" },
  });

  const mapDataToForm = (data: any[]) => {
    const mappedData: any = {
      facebook: { id: null, url: "" },
      x: { id: null, url: "" },
      instagram: { id: null, url: "" },
      youtube: { id: null, url: "" },
      linkedin: { id: null, url: "" },
      pinterest: { id: null, url: "" },
      vimeo: { id: null, url: "" },
    };
    
    if (data && Array.isArray(data)) {
      data.forEach((item: any) => {
        if (mappedData.hasOwnProperty(item.network)) {
          mappedData[item.network] = {
            id: item.id,
            url: item.url || "",
          };
        }
      });
    }
    
    return mappedData;
  };

  useEffect(() => {
    const mappedData = mapDataToForm(data);
    setForm(mappedData);
  }, [data]);

  useEffect(() => {
    dispatch<any>(fetchSocialMedia());
  }, [dispatch]);

  const handleChange = (value: string, type: keyof typeof form) => {
    setForm((prev) => ({
      ...prev,
      [type]: {
        id: prev[type]?.id || null,
        url: sanitize(value),
      },
    }));
  };

  const sanitize = (input: string) => {
    return input
      .replace(/[<>]/g, "")
      .replace(/script/gi, "")
      .replace(/[\u0000-\u001F\u007F]/g, "");
  };

  const handleSubmit = async (form: any) => {
    setIsLoading(true);
    
    const changedFields: any[] = [];

    Object.keys(form).forEach((key) => {
      const original = data.find((item: any) => item.network === key);
      const currentUrl = form[key]?.url || "";
      const originalUrl = original?.url || "";

      if (currentUrl !== originalUrl) {
        changedFields.push({
          id: form[key]?.id || original?.id,
          network: key,
          url: currentUrl,
        });
      }
    });

    if (changedFields.length === 0) {
      setSnackbarType("noneChange");
      setIsLoading(false);
      return;
    }

    try {
      await Promise.all(
        changedFields.map((item) =>
          dispatch<any>(
            patchSocialMedia({ network: item.network, url: item.url }, item.id)
          )
        )
      );

      setSnackbarType("patchSuccess");
      
      await dispatch<any>(fetchSocialMedia());
      
    } catch (err) {
      setSnackbarType("patchError");
      console.error("Erro ao salvar:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    const mappedData = mapDataToForm(data);
    setForm(mappedData);
  };

  return (
    <>
      {snackbarType === "noneChange" && (
        <Snackbar type="noneChange" setSnackbarType={setSnackbarType} />
      )}

      {snackbarType === "patchSuccess" && (
        <Snackbar type="patchSuccess" setSnackbarType={setSnackbarType} />
      )}

      {snackbarType === "patchError" && (
        <Snackbar type="error" setSnackbarType={setSnackbarType} />
      )}

      <div className={style.container}>
        <div className={style.descriptionContainer}>
          <p className={style.description}>
            Adicione o link das redes sociais utilizadas pela Defensoria
            Pública!
          </p>
        </div>
        <div className={style.inputsContainer}>
          <div className={style.inputGroup}>
            <div className={style.titleContainer}>
              <p className={style.title}>Facebook:</p>
            </div>
            <Input
              className={style.input}
              placeholder="Digite a URL do Facebook"
              max={255}
              type="text"
              value={form.facebook?.url || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value, "facebook")
              }
            />
          </div>
          
          <div className={style.inputGroup}>
            <div className={style.titleContainer}>
              <p className={style.title}>X:</p>
            </div>
            <Input
              className={style.input}
              placeholder="Digite a URL do X"
              max={255}
              type="text"
              value={form.x?.url || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value, "x")
              }
            />
          </div>
          
          <div className={style.inputGroup}>
            <div className={style.titleContainer}>
              <p className={style.title}>Instagram:</p>
            </div>
            <Input
              className={style.input}
              placeholder="Digite a URL do Instagram"
              max={255}
              type="text"
              value={form.instagram?.url || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value, "instagram")
              }
            />
          </div>
          
          <div className={style.inputGroup}>
            <div className={style.titleContainer}>
              <p className={style.title}>YouTube:</p>
            </div>
            <Input
              className={style.input}
              placeholder="Digite a URL do Youtube"
              max={255}
              type="text"
              value={form.youtube?.url || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value, "youtube")
              }
            />
          </div>
          
          <div className={style.inputGroup}>
            <div className={style.titleContainer}>
              <p className={style.title}>LinkedIn:</p>
            </div>
            <Input
              className={style.input}
              placeholder="Digite a URL do LinkedIn"
              max={255}
              type="text"
              value={form.linkedin?.url || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value, "linkedin")
              }
            />
          </div>
          
          <div className={style.inputGroup}>
            <div className={style.titleContainer}>
              <p className={style.title}>Pinterest:</p>
            </div>
            <Input
              className={style.input}
              placeholder="Digite a URL do Pinterest"
              max={255}
              type="text"
              value={form.pinterest?.url || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value, "pinterest")
              }
            />
          </div>
          
          <div className={style.inputGroup}>
            <div className={style.titleContainer}>
              <p className={style.title}>Vimeo:</p>
            </div>
            <Input
              className={style.input}
              placeholder="Digite a URL do Vimeo"
              max={255}
              type="text"
              value={form.vimeo?.url || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value, "vimeo")
              }
            />
          </div>
        </div>
        
        <div className={style.buttonsContainer}>
          <div className={style.buttonsGroup}>
            <button 
              className={style.button} 
              onClick={() => handleSubmit(form)}
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : "Salvar"}
            </button>
            <button
              className={`${style.button} ${style.cancel}`}
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LinksParaRedesSociais;