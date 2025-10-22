import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import style from "./NewsPage.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import PageNotFound from "../../../Pages/PageNotFound/PageNotFound";
import Loading from "../../../Components/Loading/Loading";
import { PATH } from "../../../PATH";

const NewsPage = () => {
  const { slug } = useParams();
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${PATH.base}/news/${slug}/`);
        if (res.data.status !== "published") {
          setNotFound(true);
        } else {
          setNews(res.data);
        }
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [slug]);

  if (loading) return <Loading size={100} type="spin" label="Carregando notícia" />;
  if (notFound) return <PageNotFound />;

  const FormatDate = (date: string) => {
    const [dayPart, timePart] = date.split("T");
    const [year, month, day] = dayPart.split("-");
    const [hour, minute] = timePart.split(":");
    return `${day}/${month}/${year} às ${hour}:${minute}`;
  };

  const formatFileName = (fileName: string) => {
    return fileName.split("/media/news/attachments/")[1];
  };

  return (
    <div className={style.container}>
      <div className={style.headerContainer}>
        <div className={style.titleContainer}>
          <h1 className={style.title}>{news.title}</h1>
        </div>
        {news.subtitle && (
          <div className={style.subtitleContainer}>
            <h3 className={style.subtitle}>{news.subtitle}</h3>
          </div>
        )}
        <div className={style.dateContainer}>
          {news.published_at && (
            <span>Publicado em: {FormatDate(news.published_at)}</span>
          )}
        </div>
        <div className={style.line}></div>
      </div>

      <div className={style.imageContainer}>
        {news.thumbnail && (
          <img
            src={news.thumbnail}
            alt={news.title}
            className={style.mainImage}
          />
        )}
      </div>

      <div className={style.textContainer}>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(news.text),
          }}
        />
      </div>

      {news.gallery && news.gallery.length > 0 && (
        <div className={style.galleryContainer}>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            className={style.swiperContainer}
          >
            {news.gallery.map((item: any) => (
              <SwiperSlide key={item.id}>
                <img
                  src={item.image}
                  alt={item.caption || ""}
                  className={style.galleryImage}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      {news.attachments && news.attachments.length > 0 && (
        <>
          <div className={style.attachmentContainer}>
            <h3>Arquivos:</h3>
            {news.attachments.map((item: any) => (
              <>
                <div className={style.attachmentContent}>
                  <button
                    key={item.id}
                    className={style.button}
                    onClick={() => window.open(item.file, "_blank")}
                  >
                    Visualizar
                  </button>
                  <span>{formatFileName(item.file)}</span>
                </div>
              </>
            ))}
          </div>
        </>
      )}
      <div className={style.line}></div>
      <div className={style.tagsContainer}>
        {news.tags.map((item: any) => (
          <div key={item.id} className={style.tagBox}>
            <span className={style.tag}>{item.name_tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
