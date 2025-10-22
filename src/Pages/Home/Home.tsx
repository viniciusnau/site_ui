import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsResponsive } from "../../Components/Helper";
import { SelectChangeEvent } from "@mui/material/Select";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CardDisplayer from "../../Components/CardDisplayer/CardDisplayer";
import QuickButton from "../../Components/QuickButton/QuickButton";
import style from "./Home.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { TextField, InputAdornment, Box } from "@mui/material";
import BoxContainer from "../../Components/BoxContainer/BoxContainer";
import NewsCard from "../../Components/NewsCard/NewsCard";
import ServicesButton from "../../Components/ServicesButton/ServicesButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanner } from "../../Services/Slices/BannerSlice";
import { fetchContainer } from "../../Services/Slices/ContainerSlice";
import { fetchServiceButtons } from "../../Services/Slices/ServiceButtonsSlice";
import { fetchQuickAccessButtons } from "../../Services/Slices/QuickAccessButtonsSlice";

function Home() {
  const navigate = useNavigate();
  const isResponsive = useIsResponsive(900);
  const [location, setLocation] = useState("");
  const containers = useSelector((state: any) => state.containerSlice.data);
  const atendimentoContainer = containers.find((c: any) => c.id === 1);
  const acessoRapidoContainer = containers.find((c: any) => c.id === 2);
  const acessoRapido2Container = containers.find((c: any) => c.id === 3);
  const noticiasContainer = containers.find((c: any) => c.id === 4);
  const searchContainer = containers.find((c: any) => c.id === 5);
  const banner = useSelector((state: any) => state.bannerSlice.data);
  const slidesBanners = banner.filter((item: any) => item.group === "slides");
  const footerBanners = banner.filter(
    (item: any) => item.group === "footer_banner"
  );
  const serviceButtonsData = useSelector(
    (state: any) => state.serviceButtonsSlice.data
  );
  const orderingServiceButtons = serviceButtonsData
    .filter((item: any) => item.position)
    .sort((a: any, b: any) => a.position - b.position);
  const quickAccessButtonsData = useSelector(
    (state: any) => state.quickAccessButtonsSlice.data
  );
  const upperGroupQuickAccessButtons = quickAccessButtonsData
    .filter((item: any) => item.group === "above_group")
    .sort((a: any, b: any) => a.position - b.position);

  const lowerGroupQuickAccessButtons = quickAccessButtonsData
    .filter((item: any) => item.group === "under_group")
    .sort((a: any, b: any) => a.position - b.position);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(fetchContainer());
    dispatch<any>(fetchBanner("true"));
    dispatch<any>(fetchServiceButtons());
    dispatch<any>(fetchQuickAccessButtons());
  }, [dispatch]);

  const [form, setForm] = useState({
    words: [] as string[],
    words_contain: true,
  });

  const handleChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
  };

  const handleSubmit = () => {
    const lowercaseWords = form.words.map((word: string) => word.toLowerCase());
    const updatedRange = {
      ...form,
      words: lowercaseWords,
    };
    //dispatch<any>(fetchPublic(updatedRange, "1"));
    //setPage(1);
    //setTempPage(1);
    //setBackup(updatedRange);
    //setSearch(true);
  };

  return (
    <div className={style.container}>
      <div className={style.galleryContainer}>
        <Swiper
          modules={[Navigation]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          className={style.swiperContainer}
        >
          {slidesBanners.map((item: any) => (
            <SwiperSlide key={item.id}>
              <img
                src={
                  isResponsive && item.banner_mobile
                    ? item.banner_mobile
                    : item.banner
                }
                alt={item.alt || ""}
                className={`${style.galleryImage} ${
                  item.slug ? style.cursorActive : ""
                }`}
                onClick={() => item.slug && navigate(item.slug)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <BoxContainer
        title={searchContainer?.show_title ? searchContainer?.title : ""}
        titleColor={searchContainer?.title_color}
        redirectButton={searchContainer?.redirect_button}
        backgroundColor={searchContainer?.background_color}
      >
        <div className={style.searchContainer}>
          <Box
            sx={{
              width: "100%",
              maxWidth: "100%",
              height: "100%",
              maxHeight: "100%",
            }}
          >
            <TextField
              fullWidth
              id="search"
              placeholder="O que você procura?"
              variant="outlined"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "4px",
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    border: "solid 1px",
                    borderColor: "#9D9D9D",
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "solid 1px",
                  borderColor: "#9D9D9D",
                },
                "& input::placeholder": {
                  color: "#474747",
                  fontFamily: "var(--id-font-family)",
                  fontSize: "22px",
                  fontWeight: 300,
                  opacity: 1,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ marginRight: "5px" }}>
                    <button
                      aria-label="pesquisar"
                      className={style.inputButton}
                      onClick={handleSubmit}
                    >
                      <Search />
                    </button>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </div>
      </BoxContainer>
      <BoxContainer
        title={
          atendimentoContainer?.show_title ? atendimentoContainer?.title : ""
        }
        titleColor={atendimentoContainer?.title_color}
        backgroundColor={atendimentoContainer?.background_color}
        redirectButton={atendimentoContainer?.redirect_button}
        boxShadow="0 4px 4px rgba(0,0,0,0.25)"
      >
        <CardDisplayer
          gap={1}
          component={ServicesButton}
          content={orderingServiceButtons}
          customStyle={style}
        />
      </BoxContainer>
      <BoxContainer
        title={
          acessoRapidoContainer?.show_title ? acessoRapidoContainer?.title : ""
        }
        titleColor={acessoRapidoContainer?.title_color}
        backgroundColor={acessoRapidoContainer?.background_color}
        redirectButton={acessoRapidoContainer?.redirect_button}
        boxShadow="0 4px 4px rgba(0,0,0,0.25)"
      >
        <CardDisplayer
          gap={2}
          component={QuickButton}
          content={upperGroupQuickAccessButtons}
          customStyle={style}
        />
      </BoxContainer>
      <BoxContainer
        title={
          acessoRapido2Container?.show_title
            ? acessoRapido2Container?.title
            : ""
        }
        titleColor={acessoRapido2Container?.title_color}
        backgroundColor={acessoRapido2Container?.background_color}
        redirectButton={acessoRapido2Container?.redirect_button}
        boxShadow="0 4px 4px rgba(0,0,0,0.25)"
      >
        <CardDisplayer
          gap={2}
          component={QuickButton}
          content={lowerGroupQuickAccessButtons}
          customStyle={style}
        />
      </BoxContainer>

      <BoxContainer
        title={noticiasContainer?.show_title ? noticiasContainer?.title : ""}
        titleColor={noticiasContainer?.title_color}
        backgroundColor={noticiasContainer?.background_color}
        redirectButton={noticiasContainer?.redirect_button}
      >
        <NewsCard></NewsCard>
      </BoxContainer>
      {footerBanners.length > 0 && (
        <div className={style.galleryContainer}>
          {footerBanners.map((item: any) => (
            <img
              key={item.id}
              src={item.banner}
              alt={item.alt || ""}
              className={`${style.galleryImage} ${
                item.slug ? style.cursorActive : ""
              }`}
              onClick={() => item.slug && navigate(item.slug)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
