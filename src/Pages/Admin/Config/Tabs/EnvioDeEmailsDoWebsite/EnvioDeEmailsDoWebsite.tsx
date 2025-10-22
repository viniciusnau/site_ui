import React, { useState, useEffect } from "react";
import style from "./EnvioDeEmailsDoWebsite.module.css";
import Input from "../../../../../Components/Forms/Input";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "../../../../../Components/Snackbar/Snackbar";
import {
  fetchEmailWebsite,
  patchEmailWebsite,
} from "../../../../../Services/Slices/EmailWebsiteSlice";

function EnvioDeEmailsDoWebsite() {
  const [snackbarType, setSnackbarType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.emailWebsite.data);
  const [form, setForm] = useState({
    email_website: { id: null, email: "" },
    comentarios: { id: null, email: "" },
    faq: { id: null, email: "" },
    relato_de_erros: { id: null, email: "" },
  });

  const mapDataToForm = (data: any[]) => {
    const mappedData: any = {
      email_website: { id: null, email: "" },
      comentarios: { id: null, email: "" },
      faq: { id: null, email: "" },
      relato_de_erros: { id: null, email: "" },
    };

    if (data && Array.isArray(data)) {
      data.forEach((item: any) => {
        if (mappedData.hasOwnProperty(item.location)) {
          mappedData[item.location] = {
            id: item.id,
            email: item.email || "",
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
    dispatch<any>(fetchEmailWebsite());
  }, [dispatch]);

  const handleChange = (value: string, type: keyof typeof form) => {
    setForm((prev) => ({
      ...prev,
      [type]: {
        id: prev[type]?.id || null,
        email: sanitize(value),
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
      const original = data.find((item: any) => item.location === key);
      const currentEmail = form[key]?.email || "";
      const originalEmail = original?.email || "";

      if (currentEmail !== originalEmail) {
        changedFields.push({
          id: form[key]?.id || original?.id,
          location: key,
          email: currentEmail,
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
            patchEmailWebsite(
              { location: item.location, email: item.email },
              item.id
            )
          )
        )
      );

      setSnackbarType("patchSuccess");

      await dispatch<any>(fetchEmailWebsite());
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
        <div className={style.details}>
          <p className={style.description}>
            Edite as informações fundamentais que definem a identidade de todo o
            site da Defensoria Pública. Os dados que você preenche aqui serão
            utilizados para apresentar o site nos resultados de busca do Google
            e também na aba do seu navegador.
          </p>
        </div>
        <div className={style.inputsContainer}>
          <div className={style.inputGroup}>
            <div className={style.titleContainer}>
              <p className={style.title}>E-mail do Website:</p>
            </div>
            <Input
              className={style.input}
              max={255}
              type="text"
              value={form.email_website?.email || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value, "email_website")
              }
              placeholder="Digite aqui o E-mail do site"
            />
          </div>
          <div className={style.inputGroup}>
            <div className={style.titleContainer}>
              <p className={style.title}>Comentários:</p>
            </div>
            <Input
              className={style.input}
              max={255}
              type="text"
              value={form.comentarios?.email || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value, "comentarios")
              }
              placeholder="Digite aqui o E-mail para receber os comentários"
            />
          </div>
          <div className={style.inputGroup}>
            <div className={style.titleContainer}>
              <p className={style.title}>FAQ:</p>
            </div>
            <Input
              className={style.input}
              max={255}
              type="text"
              value={form.faq?.email || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value, "faq")
              }
              placeholder="Digite aqui o E-mail para receber as perguntas frequentes"
            />
          </div>
          <div className={style.inputGroup}>
            <div className={style.titleContainer}>
              <p className={style.title}>Relato de Erros:</p>
            </div>
            <Input
              className={style.input}
              max={255}
              type="text"
              value={form.relato_de_erros?.email || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value, "relato_de_erros")
              }
              placeholder="Digite aqui o E-mail para receber os erros encontrados"
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

export default EnvioDeEmailsDoWebsite;
