import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import style from "./PostersPage.module.css";
import PageNotFound from "../../../Pages/PageNotFound/PageNotFound";
import { Download } from "lucide-react";
import { PATH } from "../../../PATH";
import Loading from "../../../Components/Loading/Loading";

const PostersPage = () => {
  const { slug } = useParams();
  const [posters, setPosters] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchPosters = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${PATH.base}/posters/${slug}/`);
        if (res.data.status !== "published") {
          setNotFound(true);
        } else {
          setPosters(res.data);
        }
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPosters();
  }, [slug]);

  if (loading) return <Loading size={100} type="spin" label="Carregando cartilha" />;
  if (notFound) return <PageNotFound />;

  const FormatDate = (date: string) => {
    const [dayPart, timePart] = date.split("T");
    const [year, month, day] = dayPart.split("-");
    const [hour, minute] = timePart.split(":");
    return `${day}/${month}/${year} às ${hour}:${minute}`;
  };

  const formatFileName = (fileName: string) => {
    try {
      const decoded = decodeURIComponent(fileName);
      const nameWithQuery = decoded.split("/").pop() || "arquivo";
      return nameWithQuery.split("?")[0];
    } catch {
      return "arquivo";
    }
  };

  const handleDownload = async () => {
    const response = await fetch(posters.attachment);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = slug || formatFileName(posters.attachment);
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={style.container}>
      <header className={style.header}>
        <h1 className={style.title}>{posters.title}</h1>
        {posters.published_at && (
          <span className={style.date}>
            Publicado em {FormatDate(posters.published_at)}
          </span>
        )}
      </header>
      <div className={style.line}></div>
      <div
        className={`${
          posters.description
            ? style.contentContainer
            : style.contentContainerImage
        }`}
      >
        <div className={style.imageWrapper}>
          <img
            src={posters.image}
            alt={posters.title}
            className={style.mainImage}
          />
        </div>
        {posters.description && posters.description.length > 1 && (
          <div className={style.descriptionContainer}>
            <div
              className={style.description}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(posters.description),
              }}
            />
          </div>
        )}
      </div>

      <div className={style.actions}>
        <button
          className={`${style.button} ${style.view}`}
          onClick={() => window.open(posters.attachment, "_blank")}
        >
          Visualizar
        </button>

        <button
          className={`${style.button} ${style.download}`}
          onClick={handleDownload}
        >
          <Download size={18} />
          <span>Baixar</span>
        </button>
      </div>
    </div>
  );
};

export default PostersPage;
