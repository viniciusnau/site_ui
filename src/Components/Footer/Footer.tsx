import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Footer.module.css";
import { fetchSocialMedia } from "../../Services/Slices/SocialMediaSlice";
import image from "../../Assets/Defensoria_logo.png";
import { useIsResponsive } from "../Helper";
import { 
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Linkedin,
 } from 'lucide-react';


const Footer = () => {
  const isResponsive = useIsResponsive(900)
  const iconSize = isResponsive ? 28 : 38;
  const data = useSelector((state: any) => state.socialMedia.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const renderSocialIcon = (platform: string, size: number) => {
      const iconProps = { size };
      
      switch(platform.toLowerCase()) {
        case 'instagram':
          return <Instagram {...iconProps} />;
        case 'facebook':
          return <Facebook {...iconProps} />;
        case 'twitter':
          return <Twitter {...iconProps} />;
        case 'x':
          return <Twitter {...iconProps} />;
        case 'youtube':
          return <Youtube {...iconProps} />;
        case 'linkedin':
          return <Linkedin {...iconProps} />;
        default:
          console.warn(`Ícone não encontrado para plataforma: ${platform}`);
          return null;
      }
    };

  useEffect(() => {
      dispatch<any>(fetchSocialMedia());
    }, [dispatch]);

  return (
    <footer className={styles.footer}  id="footer">
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <div>
              <img
                onClick={() => navigate("/")}
                src={image}
                className={styles.logo}
                alt="Logo da Defensoria do Estado de Santa Catarina"
              />
          </div>
        <div className={styles.description}>
          <div className={styles.location}>
              <h3 className={styles.title}>Defensoria Pública de Santa Catarina - Florianópolis</h3>
              <p className={styles.text}>Av. Rio Branco, n° 919, Ed. Centro Executivo Rio Branco, Centro, Florianópolis/SC, 88015-205</p>
          </div>
          <div className={styles.workTime}>
            <h3 className={styles.title}>Horário de funcionamento</h3>
            <p className={styles.text}>De Segunda à Sexta das 12h às 19h</p>
          </div>
        </div>
          <div className={styles.infoContainer}>
            <div className={styles.socialMedia}>
              {Array.isArray(data) && data.length > 0 &&
                data
                  .filter(social => ['instagram', 'facebook', 'twitter', 'x', 'youtube', 'linkedin']
                  .includes(social.network.toLowerCase()))
                  .map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    className={styles[social.network.toLowerCase()]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {renderSocialIcon(social.network, iconSize)}
                  </a>
                ))
              }
            </div>
            <div className={styles.line}></div>
            <ul className={styles.informations}>
              <li><Link to={"/"} className={styles.links}>Mapa do Site</Link></li>
              <li><Link to={"/"} className={styles.links}>Termos de Uso</Link></li>
              <li><Link to={"/"} className={styles.links}>Políticas de Privacidade</Link></li>
              <li><Link to={"/"} className={styles.links}>Política de Cookies</Link></li>
              <li><Link to={"/lei-geral-de-protecao-de-dados"} className={styles.links}>LGPD</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.copyrightContainer}>
          <span className={styles.copyright}>&copy; 2025 | Defensoria Pública do Estado de Santa Catarina - Todos os direitos reservados.</span>
      </div>
    </footer>
  );
};

export default Footer;
