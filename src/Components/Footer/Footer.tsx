import { Link, useNavigate } from "react-router-dom";
import styles from "./Footer.module.css";
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
  const navigate = useNavigate();

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
              <a
                href="https://www.instagram.com/defensoriasc/"
                className={styles.instagram}
                target="_blank" rel="noreferrer"
              >
                <Instagram size={iconSize}/>
              </a>
              <a
                href="https://www.facebook.com/defensoriasc"
                className={styles.facebook}
                target="_blank" rel="noreferrer"
              >
                <Facebook size={iconSize}/>
              </a>
              <a
                href="https://x.com/defensoriaDPESC"
                target="_blank"
                className={styles.twitter} rel="noreferrer"
              >
                <Twitter size={iconSize}/>
              </a>
              <a
                href="https://www.youtube.com/channel/UCsiXdbsU9_EVJlVfq8iNZkQ"
                className={styles.youtube}
                target="_blank" rel="noreferrer"
              >
                <Youtube size={iconSize}/>
              </a>
              <a
                href="https://www.linkedin.com/company/defensoria-pública-do-estado-de-santa-catarina/"
                className={styles.linkedin}
                target="_blank" rel="noreferrer"
              >
                <Linkedin size={iconSize}/>
              </a>
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
