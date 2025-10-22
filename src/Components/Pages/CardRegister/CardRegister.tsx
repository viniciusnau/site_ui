import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import style from "./CardRegister.module.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import PageNotFound from "../../../Pages/PageNotFound/PageNotFound";
import Loading from "../../../Components/Loading/Loading";
import { PATH } from "../../../PATH";
import CardButton from "../../../Components/CardButton/CardButton";

const CardRegister = () => {
  const { slug } = useParams();
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchCard = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${PATH.base}/card-register/${slug}/`);
        if (res.data.status !== "published") {
          setNotFound(true);
        } else {
          setCard(res.data);
        }
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [slug]);

  if (loading) return <Loading size={100} type="spin" label="Carregando card" />;
  if (notFound) return <PageNotFound />;

  const relatedCards = card.related_cards?.map((related: any) => ({
    title: related.title,
    content: [
      {
        description: related.subtitle,
        seeMore: true,
        link: `${related.slug}`,
      },
    ],
  })) || [];

  return (
      <div className={style.container}>
        <div className={style.headerContainer}>
          <div className={style.cardContainer}>
            <h1 className={style.card}>{card.card_detail.title}</h1>
          </div>

          {card.subtitle && (
              <div className={style.subtitleContainer}>
                <h1 className={style.title}>{card.title}</h1>
                <h3 className={style.subtitle}>{card.subtitle}</h3>
              </div>
          )}

          <div className={style.line}></div>
        </div>

        <div className={style.imageContainer}>
          {card.image && (
              <img
                  src={card.image}
                  alt={card.title}
                  className={style.mainImage}
              />
          )}
        </div>

        <div className={style.textContainer}>
          <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(card.text),
              }}
          />
        </div>

        <div className={style.line}></div>

        {relatedCards.length > 0 && (
            <div className={style.relatedContainer}>
              <h2 className={style.relatedTitle}>Veja Também:</h2>
              <CardButton cards={relatedCards.slice(0, 3)} />
            </div>
        )}
      </div>
  );
};

export default CardRegister;
