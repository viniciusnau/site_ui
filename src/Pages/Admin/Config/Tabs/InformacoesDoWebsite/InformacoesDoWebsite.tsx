import React, { useState } from "react";
import style from "./InformacoesDoWebsite.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWebsiteInformation,
  patchWebsiteInformation,
} from "../../../../../Services/Slices/WebsiteInformationSlice";
import { useEffect } from "react";
import Snackbar from "../../../../../Components/Snackbar/Snackbar";

function InformacoesDoWebsite() {
  const [snackbarType, setSnackbarType] = useState<string | null>(null);
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.websiteInformation.data);
  const [form, setForm] = useState({
    title: "",
    slogan: "",
    key_words: "",
    description: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        title: data.title,
        slogan: data.slogan,
        key_words: data.key_words,
        description: data.description,
      });
    }
  }, [data, dispatch]);

  useEffect(() => {
    dispatch<any>(fetchWebsiteInformation());
  }, [dispatch]);

  const handleChange = (
    value: string,
    type: "title" | "slogan" | "key_words" | "description"
  ) => {
    setForm((prev) => ({
      ...prev,
      [type]: sanitize(value),
    }));
  };

  const handleSubmit = (form: any) => {
    const changedFields: any = {};

    Object.keys(form).forEach((key) => {
      if (form[key] !== data[key]) {
        changedFields[key] = form[key];
      }
    });

    if (Object.keys(changedFields).length === 0) {
      setSnackbarType("noneChange");
      return;
    }

    setSnackbarType("patchSuccess");
    dispatch<any>(patchWebsiteInformation(changedFields));
  };

  const sanitize = (input: string) => {
    return input
      .replace(/[<>]/g, "")
      .replace(/script/gi, "")
      .replace(/[\u0000-\u001F\u007F]/g, "");
  };

  return (
    <>
      {data.error && (
        <Snackbar type="error" setSnackbarType={setSnackbarType} />
      )}

      {snackbarType === "noneChange" && (
        <Snackbar type="noneChange" setSnackbarType={setSnackbarType} />
      )}

      {snackbarType === "patchSuccess" && (
        <Snackbar type="patchSuccess" setSnackbarType={setSnackbarType} />
      )}

      <div className={style.informacoesWebsiteContainer}>
        <div className={style.informacoesWebsiteDescriptionContainer}>
          <p className={style.description}>
            Nesta área, você pode editar as informações fundamentais que definem
            a identidade de todo o site da Defensoria Pública. Os dados que você
            preenche aqui são utilizados para apresentar o site nos resultados
            de busca do Google e também na aba do seu navegador.
          </p>
        </div>
        <div className={style.informacoesWebsiteInputsContainer}>
          <div className={style.inputWebsiteContainer}>
            <div className={style.titleContainer}>
              <p className={style.title}>Título do Website:</p>
            </div>
            <input
              className={style.inputWebsite}
              max={254}
              type="text"
              placeholder={data.title || "Digite o título do Website"}
              value={form.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value, "title")
              }
            />
          </div>
          <div className={style.inputWebsiteContainer}>
            <div className={style.titleContainer}>
              <p className={style.title}>Slogan:</p>
            </div>
            <input
              className={style.inputWebsite}
              max={254}
              type="text"
              placeholder={data.slogan || "Digite o Slogan"}
              value={form.slogan}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value, "slogan")
              }
            ></input>
          </div>
          <div className={style.inputWebsiteContainer}>
            <div className={style.titleContainer}>
              <p className={style.title}>Palavras Chaves:</p>
            </div>
            <input
              className={style.inputWebsite}
              max={254}
              type="text"
              placeholder={data.key_words || "Digite as Palavras-chaves"}
              value={form.key_words}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value, "key_words")
              }
            />
          </div>
          <div className={style.inputWebsiteContainer}>
            <div className={style.titleContainer}>
              <p className={style.title}>Descrição:</p>
            </div>
            <input
              className={style.inputWebsite}
              max={254}
              type="text"
              placeholder={data.description || "Digite a Descrição"}
              value={form.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value, "description")
              }
            />
          </div>
        </div>
        <div className={style.buttonsWebsiteContainer}>
          <div className={style.buttonsWebsite}>
            <button className={style.button} onClick={() => handleSubmit(form)}>
              Salvar
            </button>
            <button
              className={`${style.button} ${style.cancel}`}
              onClick={() => setForm(data)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default InformacoesDoWebsite;
