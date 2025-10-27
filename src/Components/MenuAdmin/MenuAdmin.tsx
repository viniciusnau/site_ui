import React, {ReactNode, useState} from 'react';
import style from './MenuAdmin.module.css';
import image from '../../Assets/LogoWhite.png'
import { logout } from '../../Auth/Auth';
import { useNavigate } from 'react-router-dom';
import { X, LogOut, CircleHelp, ListTree, Files, List, Building2, Newspaper, Images, Rss, AppWindow, CalendarCheck, RectangleEllipsis, Users, History, Mails, ChartNoAxesCombined, Settings, Menu, Server } from 'lucide-react';
import { useIsResponsive } from "../Helper";

interface HeaderAdminProps {
  children: ReactNode;
}

function HeaderAdmin({children}: HeaderAdminProps) {
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenuName, setActiveMenuName] = useState<string>('Dashboard');
  const isMobile = useIsResponsive(1300);
  const iconSize = isMobile ? 18 : 22;

  const userName = (window.sessionStorage.getItem('username') || '').trim() || 'Usuário';

  const handleMenuClick = (name: string, path?: string) => {
    setActiveMenuName(name);
    if (path) navigate(path);
    if (isMobile) setIsSidebarOpen(false);
  };

  const toggleMenu = (key: string) =>
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className={style.adminLayout}>
      <header className={style.header}>
        <div className={style.headerContainer}>
          <div className={style.logoName}>
            {!isMobile && (
              <div className={style.logoBox}>
                <div className={style.logo}>
                  <img src={image} alt="Logo Defensoria Pública" className={style.logoImage} onClick={()=>navigate("/")}/>
                </div>
              </div>
            )}
            {isMobile && (
              <div className={style.hamburger} onClick={toggleSidebar}>
                <Menu size={24} className={isSidebarOpen ? style.hamburgerIconHidden : style.hamburgerIcon} />
              </div>
            )}
            <div className={style.titleHeader}>{activeMenuName}</div>
          </div>
          <div className={style.containerButtonHeader}>
              <span className={style.headerUserName}>Olá, {userName}!</span>
              {!isMobile && (
              <div className={style.headerUserGroup}>
                  <div onClick={() => logout(navigate)} className={style.button}>
                  Sair <LogOut />
                  </div>
              </div>
              )}
          </div>
        </div>
      </header>
      <div className={style.adminContainer}>
        <aside
          className={`${style.sidebar} ${
            isMobile ? (isSidebarOpen ? style.sidebarOpen : style.sidebarClosed) : ""
          }`}
        >
          {isMobile && (
              <div className={style.sidebarHeader}>
                <div className={style.logo}>
                  <img src={image} alt="Logo Defensoria Pública" className={style.logoImage} onClick={()=>navigate("/")}/>
                </div>
                <div className={style.closeButton} onClick={toggleSidebar}>
                  <X/>
                </div>
              </div>
          )}
          <nav className={style.nav}>
            <ul className={style.navContent}>
              <li className={style.menuList} onClick={() => handleMenuClick("Módulos", "/admin/modulos") }>
                <div className={style.buttonIcon}>
                  <p>Módulos</p>
                  <ListTree size={iconSize}/>
                </div>
              </li>
              <li className={style.menuList} onClick={() => handleMenuClick("Páginas", "/admin/paginas") }>
                <div className={style.buttonIcon}>
                  <p>Páginas</p>
                  <Files size={iconSize}/>
                </div>
              </li>
              <li className={style.menuList} onClick={() => handleMenuClick("FAQs", "/admin/faqs") }>
                <div className={style.buttonIcon}>
                  <p>FAQs</p>
                  <List size={iconSize}/>
                </div>
              </li>
              <li className={style.menuList} onClick={() => handleMenuClick("Coleções", "/admin/colecoes") }>
                <div className={style.buttonIcon}>
                  <p>Coleções</p>
                  <Server size={iconSize}/>
                </div>
              </li>
              <li className={style.menuList} onClick={() => handleMenuClick("Núcleos", "/admin/nucleos") }>
                <div className={style.buttonIcon}>
                  <p>Núcleos</p>
                  <Building2 size={iconSize}/>
                </div>
              </li>
              <li className={style.menuList} onClick={() => handleMenuClick("Notícias", "/admin/noticias") }>
                <div className={style.buttonIcon}>
                  <p>Notícias</p>
                  <Newspaper size={iconSize}/>
                </div>
              </li>
              <li className={`${style.menuList} ${style.menuListBorder}`} onClick={() => handleMenuClick("Cartilhas", "/admin/cartilhas") }>
                <div className={style.buttonIcon}>
                  <p>Cartilhas</p>
                  <Images size={iconSize}/>
                </div>
              </li>
              {/*<li className={`${style.menuList} ${style.menuListBorder}`} onClick={() => handleMenuClick("Blog", "/admin/blog") }>*/}
              {/*  <div className={style.buttonIcon}>*/}
              {/*    <p>Blog</p>*/}
              {/*    <Rss size={iconSize}/>*/}
              {/*  </div>*/}
              {/*</li>*/}
              <li className={style.menuList} onClick={() => handleMenuClick("Menu do Website", "/admin/menu-website") }>
                <div className={style.buttonIcon}>
                  <p>Menu do Website</p>
                  <AppWindow size={iconSize}/>
                </div>
              </li>
              {/*<li className={style.menuList} onClick={() => handleMenuClick("Agenda de eventos", "/admin/agenda-eventos") }>*/}
              {/*  <div className={style.buttonIcon}>*/}
              {/*    <p>Agenda de eventos</p>*/}
              {/*    <CalendarCheck size={iconSize}/>*/}
              {/*  </div>*/}
              {/*</li>*/}
              {/*<li className={`${style.menuList} ${style.menuListBorder}`} onClick={() => handleMenuClick("Formulários", "/admin/formularios") }>*/}
              {/*  <div className={style.buttonIcon}>*/}
              {/*    <p>Formulários</p>*/}
              {/*    <RectangleEllipsis size={iconSize}/>*/}
              {/*  </div>*/}
              {/*</li>*/}
              <li className={style.menuList} onClick={() => handleMenuClick("Usuários", "/admin/usuarios") }>
                <div className={style.buttonIcon}>
                  <p>Usuários</p>
                  <Users size={iconSize}/>
                </div>
              </li>
              {/*<li className={style.menuList} onClick={() => handleMenuClick("Histórico de ações", "/admin/historico-de-acoes") }>*/}
              {/*  <div className={style.buttonIcon}>*/}
              {/*    <p>Histórico de ações</p>*/}
              {/*    <History size={iconSize}/>*/}
              {/*  </div>*/}
              {/*</li>*/}
              {/*<li className={`${style.menuList} ${style.menuListBorder}`} onClick={() => handleMenuClick("Emails Recebidos", "/admin/emails-recebidos") }>*/}
              {/*  <div className={style.buttonIcon}>*/}
              {/*    <p>Emails Recebidos</p>*/}
              {/*    <Mails size={iconSize}/>*/}
              {/*  </div>*/}
              {/*</li>*/}
              {/*<li className={style.menuList} onClick={() => handleMenuClick("Estatística", "/admin/estatistica") }>*/}
              {/*  <div className={style.buttonIcon}>*/}
              {/*    <p>Estatística</p>*/}
              {/*    <ChartNoAxesCombined size={iconSize}/>*/}
              {/*  </div>*/}
              {/*</li>*/}
              <li className={`${style.menuList}`} onClick={() => handleMenuClick("Configuração", "/admin/configuracao") }>
                <div className={style.buttonIcon}>
                  <p>Configurações</p>
                  <Settings size={iconSize}/>
                </div>
              </li>
            </ul>
          </nav>
          <div className={style.bottomSidebarContainer} >
              <div >
                <div className={`${style.menuList}`}>
                  {isMobile && (
                    <div onClick={() => logout(navigate)} className={style.buttonIcon}>
                      <p>Sair</p>
                      <LogOut size={iconSize}/>
                    </div>
                  )}
                </div>
                <div className={` ${style.buttonHelp}`} onClick={() => window.open("https://sit.defensoria.sc.def.br/")}> 
                    <p>Ajuda</p>
                    <CircleHelp size={iconSize}/>
                </div>
              </div>
          </div>
        </aside>
        <main className={style.mainContent}>
          <section className={style.content}>
              {children}
          </section>
        </main>
      </div>
    </div>
  )
}

export default HeaderAdmin