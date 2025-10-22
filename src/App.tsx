import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Breadcrumb from "./Components/Breadcrumb/Breadcrumb";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import { useRef, useState } from "react";
import "./App.css";
import Login from "./Pages/Login/Login";
import UnityAndCores from "./Pages/Support/UnityAndCores/UnityAndCores";
import AboutDefensoria from "./Pages/Institutional/AboutDefensoria/AboutDefensoria";
import WhoCanBeServed from "./Pages/Support/WhoCanBeServed/WhoCanBeServed";
import RequiredDocumentation from "./Pages/Support/RequiredDocumentation/RequiredDocumentation";
import FederalLegislation from "./Pages/Legislation/FederalLegislation/FederalLegislation";
import AboutOuvidoria from "./Pages/Institutional/Ouvidoria/AboutOuvidoria/AboutOuvidoria";
import StateLegislation from "./Pages/Legislation/StateLegislation/StateLegislation";
import AreasOfActivity from "./Pages/Institutional/AreasOfActivity/AreasOfActivity";
import OuvidoraComposition from "./Pages/Institutional/Ouvidoria/Composition/OuvidoraComposition";
import PublicTransparencyRadar from "./Pages/Transparency/PublicTransparencyRadar/PublicTransparencyRadar";
import Organograma from "./Pages/Institutional/Administration/Organograma/Organograma";
import LGPD from "./Pages/LGPD/LGPD";
import SpecializedCores from "./Pages/Support/SpecializedCores/SpecializedCores";
import CompositionGeneralPublicDefenders from "./Pages/Institutional/Administration/GeneralPublicDefenders/CompositionGeneralPublicDefenders";
import ResponsibilitiesGeneralPublicDefenders from "./Pages/Institutional/Administration/GeneralPublicDefenders/ResponsibilitiesGeneralPublicDefenders";
import RegulationsGeneralPublicDefenders from "./Pages/Institutional/Administration/GeneralPublicDefenders/RegulationsGeneralPublicDefenders";
import DutiesOfDefensoria from "./Pages/Support/DutiesOfDefensoria/DutiesOfDefensoria";
import CompositionGeneralOversightOffice from "./Pages/Institutional/Administration/GeneralOversightOffice/CompositionGeneralOversightOffice";
import ResponsibilitiesGeneralOversightOffice from "./Pages/Institutional/Administration/GeneralOversightOffice/ResponsibilitiesGeneralOversightOffice";
import RegulationsGeneralOversightOffice from "./Pages/Institutional/Administration/GeneralOversightOffice/RegulationsGeneralOversightOffice";
import CompositionSuperiorCouncil from "./Pages/Institutional/Administration/SuperiorCouncil/CompositionSuperiorCouncil";
import ResponsibilitiesSuperiorCouncil from "./Pages/Institutional/Administration/SuperiorCouncil/ResponsibilitiesSuperiorCouncil";
import RegulationsSuperiorCouncil from "./Pages/Institutional/Administration/SuperiorCouncil/RegulationsSuperiorCouncil";
import ServiceCharter from "./Pages/Services/ServiceCharter/ServiceCharter";
import ScrollToTop from "react-scroll-to-top";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import A11y from "./Components/A11y/A11y";
import Admin from "./Pages/Admin/Main/Admin";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Nudeconci from "./Pages/Institutional/Nudeconci/Nudeconci";
import MenuAdmin from "./Components/MenuAdmin/MenuAdmin";
import Profile from "./Pages/Admin/Profile/Profile";
import Users from "./Pages/Admin/Users/Users";
import Posters from "./Pages/Admin/Posters/Posters";
import Config from "./Pages/Admin/Config/Config";
import { useDispatch, useSelector } from "react-redux";
import { fetchWebsiteInformation } from "./Services/Slices/WebsiteInformationSlice";
import FAQPage from "./Pages/Admin/FAQ/FAQPage";
import Cores from "./Pages/Admin/Cores/Cores";

import MainNews from "./Pages/Admin/News/MainNews";
import NewsPage from "./Components/Pages/News/NewsPage";
import CardRegister from "./Components/Pages/CardRegister/CardRegister";
import PostersPage from "./Components/Pages/Posters/PostersPage";
import ModulesPage from "./Pages/Admin/Modules/ModulesPage";
import Teste from "./Pages/Admin/Modules/Teste";
import News from "./Pages/News/News";
import MainPostersPage from "./Pages/Posters/MainPostersPage";
import MenuWebsite from "./Pages/Admin/WebsiteMenu/WebsiteMenu";
import Pages from "./Pages/Admin/Pages/Pages";
import MainCards from "./Pages/Admin/Cards/MainCards";
import FrequentsQuestions from "./Pages/FAQ/FrequentsQuestions";
import Cards from "./Pages/Cards/Cards";

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.websiteInformation.data);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [colorInverted, setColorInverted] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [grayscale, setGrayscale] = useState(false);
  const [customCursor, setCustomCursor] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isOpenModal, setIsOpenModal] = useState<Boolean>(true);
  const handleMouseMove = (e: any) => {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  };

  const handleMouseEnter = () => {
    if (cursorRef.current) {
      const cursorStyle = cursorRef.current.style;
      cursorStyle.top = mousePosition.y + "px";
      cursorStyle.left = mousePosition.x + "px";
      setTimeout(() => {
        cursorStyle.display = "block";
      }, 1);
    }
  };

  useEffect(() => {
    dispatch<any>(fetchWebsiteInformation());
  }, [dispatch]);

  useEffect(() => {
    if (data && data.title) {
      document.title = data.title;
    }
  }, [data]);

  const handleMouseLeave = () => {
    if (cursorRef.current) {
      cursorRef.current.style.display = "none";
    }
  };

  const handleOutsideClick = () => {
    setIsOpenModal(true);
  };

  return (
    <BrowserRouter>
      <RouterContent
        cursorRef={cursorRef}
        colorInverted={colorInverted}
        setColorInverted={setColorInverted}
        fontSize={fontSize}
        setFontSize={setFontSize}
        grayscale={grayscale}
        setGrayscale={setGrayscale}
        customCursor={customCursor}
        setCustomCursor={setCustomCursor}
        mousePosition={mousePosition}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        handleMouseMove={handleMouseMove}
        handleOutsideClick={handleOutsideClick}
      />
    </BrowserRouter>
  );
}

function RouterContent({
  cursorRef,
  colorInverted,
  setColorInverted,
  fontSize,
  setFontSize,
  grayscale,
  setGrayscale,
  customCursor,
  setCustomCursor,
  mousePosition,
  isOpenModal,
  setIsOpenModal,
  handleMouseEnter,
  handleMouseLeave,
  handleMouseMove,
  handleOutsideClick,
}: any) {
  const location = useLocation();
  const isViewerPath = location.pathname.includes("viewer");
  const isAdminPath = location.pathname.startsWith("/admin");

  const style = {
    fontSize: `${fontSize}rem`,
    cursor: `${customCursor ? "none" : "auto"}`,
    "--font-size": `${fontSize}rem`,
    "--cursor-pointer": `${customCursor ? "none" : "pointer"}`,
    "--cursor-not-allowed": `${customCursor ? "none" : "not-allowed"}`,
    "--cursor-default": `${customCursor ? "none" : "default"}`,
    "--cursor-text": `${customCursor ? "none" : "text"}`,
  };

  return (
    <div
      className={`App ${colorInverted ? "invert-colors" : ""} ${
        grayscale ? "grayscale" : ""
      } ${isViewerPath ? "viewer" : ""}`}
      style={style}
      onMouseEnter={
        customCursor && !isViewerPath ? handleMouseEnter : undefined
      }
      onMouseLeave={
        customCursor && !isViewerPath ? handleMouseLeave : undefined
      }
      onMouseMove={customCursor && !isViewerPath ? handleMouseMove : undefined}
      onClick={handleOutsideClick}
    >
      <div
        ref={cursorRef}
        className={`${customCursor ? "cursor" : ""}`}
        style={{
          top: customCursor && !isViewerPath ? mousePosition.y + "px" : "auto",
          left: customCursor && !isViewerPath ? mousePosition.x + "px" : "auto",
        }}
      />

      {isAdminPath ? (
        <>
          <MenuAdmin>
            <Routes>
              <Route
                path="/admin"
                element={<ProtectedRoute Component={Admin} path="/admin" />}
              />
              <Route
                path="/admin/meu-perfil"
                element={
                  <ProtectedRoute
                    Component={Profile}
                    path="/admin/meu-perfil"
                  />
                }
              />
              <Route
                path="/admin/alterar-senha"
                element={
                  <ProtectedRoute
                    Component={ChangePassword}
                    path="/admin/alterar-senha"
                  />
                }
              />
              <Route
                path="/admin/cartilhas"
                element={
                  <ProtectedRoute Component={Posters} path="/admin/cartilhas" />
                }
              ></Route>
              <Route
                path="/admin/usuarios"
                element={
                  <ProtectedRoute Component={Users} path="/admin/usuarios" />
                }
              />
              <Route
                path="/admin/configuracao"
                element={
                  <ProtectedRoute
                    Component={Config}
                    path="/admin/configuracao"
                  />
                }
              />
              <Route
                path="/admin/faqs"
                element={
                  <ProtectedRoute
                    Component={FAQPage}
                    path="/admin/faqs"
                  ></ProtectedRoute>
                }
              ></Route>
              <Route
                path="/admin/nucleos"
                element={
                  <ProtectedRoute
                    Component={Cores}
                    path="/admin/nucleos"
                  ></ProtectedRoute>
                }
              ></Route>
              <Route
                path="/admin/modulos"
                element={
                  <ProtectedRoute
                    Component={ModulesPage}
                    path="/admin/modulos"
                  ></ProtectedRoute>
                }
              ></Route>
              <Route
                path="/admin/modulos/teste/:id"
                element={
                  <ProtectedRoute
                    Component={Teste}
                    path="/admin/modulos/teste/:id"
                  ></ProtectedRoute>
                }
              ></Route>
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute Component={PageNotFound} path="/admin/*" />
                }
              />
              <Route
                path="/admin/noticias"
                element={
                  <ProtectedRoute Component={MainNews} path="/admin/noticias" />
                }
              ></Route>
              <Route
                  path="/admin/paginas"
                  element={
                    <ProtectedRoute Component={Pages} path="/admin/paginas" />
                  }
              ></Route>
              <Route
                  path="/admin/cards"
                  element={
                    <ProtectedRoute Component={MainCards} path="/admin/cards" />
                  }
              ></Route>
              <Route
                path="/admin/menu-website"
                element={
                  <ProtectedRoute Component={MenuWebsite} path="/admin/menu-website" />
                }
              ></Route>
            </Routes>
          </MenuAdmin>
        </>
      ) : (
        <>
          <Header />
          <main>
            <Breadcrumb />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/institucional/sobre-a-defensoria"
                element={<AboutDefensoria />}
              ></Route>
              <Route
                path="/institucional/administracao-superior/organograma"
                element={<Organograma />}
              ></Route>
              <Route
                path="/institucional/administracao-superior/defensoria-publica-geral-e-subdefensoria-publica-geral/composicao"
                element={<CompositionGeneralPublicDefenders />}
              ></Route>
              <Route
                path="/institucional/administracao-superior/defensoria-publica-geral-e-subdefensoria-publica-geral/atribuicoes"
                element={<ResponsibilitiesGeneralPublicDefenders />}
              ></Route>
              <Route
                path="/institucional/administracao-superior/defensoria-publica-geral-e-subdefensoria-publica-geral/regimento"
                element={<RegulationsGeneralPublicDefenders />}
              ></Route>
              <Route
                path="/institucional/administracao-superior/corregedoria-geral/composicao"
                element={<CompositionGeneralOversightOffice />}
              ></Route>
              <Route
                path="/institucional/administracao-superior/corregedoria-geral/atribuicoes"
                element={<ResponsibilitiesGeneralOversightOffice />}
              ></Route>
              <Route
                path="/institucional/administracao-superior/corregedoria-geral/regimento"
                element={<RegulationsGeneralOversightOffice />}
              ></Route>
              <Route
                path="/institucional/administracao-superior/conselho-superior/composicao"
                element={<CompositionSuperiorCouncil />}
              ></Route>
              <Route
                path="/institucional/administracao-superior/conselho-superior/atribuicoes"
                element={<ResponsibilitiesSuperiorCouncil />}
              ></Route>
              <Route
                path="/institucional/administracao-superior/conselho-superior/regimento"
                element={<RegulationsSuperiorCouncil />}
              ></Route>
              <Route
                path="/institucional/areas-de-atuacao"
                element={<AreasOfActivity />}
              ></Route>
              <Route
                path="/institucional/ouvidoria-geral/sobre-a-ouvidoria"
                element={<AboutOuvidoria />}
              ></Route>
              <Route
                path="/institucional/ouvidoria-geral/composicao"
                element={<OuvidoraComposition />}
              ></Route>
              <Route
                path="/institucional/nudeconci"
                element={<Nudeconci />}
              ></Route>
              <Route
                path="/atendimento/quem-pode-ser-atendido"
                element={<WhoCanBeServed />}
              ></Route>
              <Route
                path="/atendimento/documentacao-necessaria"
                element={<RequiredDocumentation />}
              ></Route>
              <Route
                path="/atendimento/nucleos-especializados"
                element={<SpecializedCores />}
              ></Route>
              <Route
                path="/atendimento/nucleos-regionais-e-unidades"
                element={<UnityAndCores />}
              ></Route>
              <Route
                path="/atendimento/atribuicoes-das-defensorias"
                element={<DutiesOfDefensoria />}
              ></Route>
              <Route
                path="/transparencia/radar-da-transparencia"
                element={<PublicTransparencyRadar />}
              ></Route>
              <Route
                path="/servicos/cartas-de-servicos"
                element={<ServiceCharter />}
              ></Route>
              <Route
                path="/legislacao/legislacao-estadual"
                element={<StateLegislation />}
              ></Route>
              <Route
                path="/legislacao/legislacao-federal"
                element={<FederalLegislation />}
              ></Route>
              <Route
                path="/lei-geral-de-protecao-de-dados"
                element={<LGPD />}
              ></Route>
              <Route
                path="/perguntas-frequentes"
                element={<FrequentsQuestions/>}
              ></Route>
              <Route
                path="/esqueceu-a-senha"
                element={<ChangePassword />}
              ></Route>
              <Route path="*" element={<PageNotFound />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route
                path="/comunicacao/noticias/:slug"
                element={<NewsPage />}
              />
              <Route path="/comunicacao/noticias/" element={<News />} />
              <Route
                  path="/comunicacao/cards/:slug"
                  element={<CardRegister />}
              />
              <Route
                  path="/comunicacao/card-list/:id"
                  element={<Cards />}
              />
              <Route
                path="/servicos/cartilhas-e-revista/:slug"
                element={<PostersPage />}
              ></Route>
              <Route
                path="/servicos/cartilhas-e-revista/"
                element={<MainPostersPage />}
              />
            </Routes>
            <ScrollToTop
              smooth
              top={100}
              color="white"
              className="button-to-top"
            />
          </main>
          <div className="container-acessibility">
            <A11y
              setColorInverted={setColorInverted}
              colorInverted={colorInverted}
              setFontSize={setFontSize}
              setGrayscale={setGrayscale}
              grayscale={grayscale}
              setCustomCursor={setCustomCursor}
              mousePosition={mousePosition}
              isOpenModal={isOpenModal}
              setIsOpenModal={setIsOpenModal}
            />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
