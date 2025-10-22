import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useIsResponsive } from "../Helper";
import styles from './Breadcrumb.module.css';
import { House, ChevronRight } from 'lucide-react';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const isResponsive = useIsResponsive(1200)
  const iconSize = isResponsive ? 20 : 28;

  return (<>
    {pathnames.length > 0 && <nav id="Breadcrumb" className={styles.nav} aria-label="breadcrumb">
      <ul className={styles.list}>
        <li className={styles.line}>
          <Link to="/" className={styles.link}>
            <House size={iconSize} />
          </Link>
          {pathnames.length > 0 && <span className={styles.separator}><ChevronRight /></span>}
        </li>

        {pathnames.map((name, index) => {
          const isLast = index === pathnames.length - 1;
          const label = decodeURIComponent(name).replace(/-/g, " ").toUpperCase();

          return (
            <li key={index} className={styles.line}>
              {isLast ? (
                <Link to={location.pathname} className={styles.link}>
                  {label}
                </Link>
              ) : (
                <span className={styles.text}>
                  {label}
                </span>
              )}
              {!isLast && <span className={styles.separator}><ChevronRight size={iconSize}/></span>}
            </li>
          );
        })}
      </ul>
    </nav>}</>
  );
};

export default Breadcrumb;
