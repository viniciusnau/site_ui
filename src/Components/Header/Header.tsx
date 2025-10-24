import React, { useEffect, useRef, useState } from "react";
import image from "../../Assets/Defensoria_logo.png";
import { useNavigate } from "react-router-dom";
import { Search, ChevronUp, Menu, Ellipsis, X } from "lucide-react";
import { useIsResponsive } from "../Helper";
import DropdownItem from "../DropdownItem/DropdownItem";
import { menuItems } from "../Consts";
import { useLastPathSegment } from "../Helper";
import Modal from "../Modal/Modal";
import styles from "./Header.module.css";
import { extractKeywords } from "../Helper";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
import { TextField, InputAdornment, IconButton, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchHeader } from "../../Services/Slices/HeaderSlice";

interface MenuItem {
  name: string;
  type: "internal" | "external" | "path";
  link?: string;
  page?: string;
  children: MenuItem[];
}

function Header() {
  const data = useSelector((state: any) => state.headerSlice.data);
  const dataFiltered =
    data.length > 0 && data[0].structure ? data[0].structure : [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<MenuItem[]>([]);
  const [overflowItems, setOverflowItems] = useState<MenuItem[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isResponsive = useIsResponsive(1700);
  const isMobile = useIsResponsive(1200);
  const pageClass = useLastPathSegment();
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const iconSize = isResponsive ? 28 : 30;
  const dataAtual = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [form, setForm] = useState({
    words: [] as string[],
    words_contain: true,
  });

  const [keywords, setKeywords] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 300);

    if (value.length >= 3) {
      const filtered = extractKeywords(value);
      setKeywords(filtered);
    }
  };
  const toggleDropdown = (key: string) => {
    setOpenDropdowns((prev) => {
      const updated = new Set(prev);
      const isCurrentlyOpen = updated.has(key);
      if (isCurrentlyOpen) {
        for (const k of Array.from(updated)) {
          if (k === key || k.startsWith(`${key}-`)) {
            updated.delete(k);
          }
        }
      } else {
        updated.add(key);
      }

      return updated;
    });
  };

  useEffect(() => {
    dispatch<any>(fetchHeader());
  }, [dispatch]);

  useEffect(() => {
    const MAX_ITEMS = dataFiltered.length <= 7 ? 7 : 5;
    const MAX_VISIBLE_ITEMS = isResponsive ? 5 : MAX_ITEMS;
    const visible = dataFiltered.slice(0, MAX_VISIBLE_ITEMS);
    const overflow = dataFiltered.slice(MAX_VISIBLE_ITEMS);
    setVisibleItems(visible);
    setOverflowItems(overflow);
    setShowMore(false);
  }, [menuItems, isResponsive]);

  useEffect(() => {
    if (!sidebarOpen) {
      setOpenDropdowns(new Set());
    }
  }, [sidebarOpen]);

  useEffect(() => {
    if (isResponsive) {
      setSidebarOpen(false);
      setOpenDropdowns(new Set());
    }
  }, [isResponsive]);

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

  const handleDisable = () => {
    return (
      form.words.length === 0 //&&
      //!hasValue
    );
  };

  const renderMenuItems = (
    items: MenuItem[],
    parentKey = "",
    nameColor: string
  ): React.ReactNode => {
    return items.map((item, idx) => {
      const key = parentKey ? `${parentKey}-${idx}` : `${idx}`;
      const isOpen = openDropdowns.has(key);
      const isDesktop = !isMobile;
      const isActiveAncestor = Array.from(openDropdowns).some(
        (openKey) => openKey === key || openKey.startsWith(`${key}-`)
      );

      return (
        <DropdownItem
          key={key}
          item={item}
          keyPath={key}
          isOpen={isOpen}
          isActiveAncestor={isActiveAncestor}
          isDesktop={isDesktop}
          toggleDropdown={toggleDropdown}
          renderMenuItems={renderMenuItems}
          customStyles={styles}
          nameColor={nameColor}
        />
      );
    });
  };

  return (
    <header className={`${styles.header} ${styles[pageClass]}`}>
      <div className={styles.subContainer}>
        <div className={styles.informations}>
          <img
            src={image}
            className={styles.logo}
            alt="Logo"
            onClick={() => navigate("/")}
          />
        </div>
        <div className={styles.inputAndSocialLinksGroup}>
          <div className={styles.socialMedia}>
            <a
              href="https://www.instagram.com/defensoriasc/"
              className={styles.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={iconSize} />
            </a>
            <a
              href="https://www.facebook.com/defensoriasc"
              className={styles.facebook}
              target="_blank"
              rel="noreferrer"
            >
              <Facebook size={iconSize} />
            </a>
            <a
              href="https://x.com/defensoriaDPESC"
              target="_blank"
              className={styles.twitter}
              rel="noreferrer"
            >
              <Twitter size={iconSize} />
            </a>
            <a
              href="https://www.youtube.com/channel/UCsiXdbsU9_EVJlVfq8iNZkQ"
              className={styles.youtube}
              target="_blank"
              rel="noreferrer"
            >
              <Youtube size={iconSize} />
            </a>
            <a
              href="https://www.linkedin.com/company/defensoria-pública-do-estado-de-santa-catarina/"
              className={styles.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={iconSize} />
            </a>
          </div>
        </div>
      </div>
      <div
        className={styles.container}
        style={{ background: data?.[0]?.background_color }}
      >
        <button
          className={styles.mobileMenu}
          id="mobileMenu"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={32} />
        </button>
        <div className={styles.leftGroup}></div>
        {isMobile && (
          <div className={styles.logoContainer}>
            <img
              src={image}
              className={styles.logo}
              alt="Logo"
              onClick={() => navigate("/")}
            />
          </div>
        )}

        <div
          className={styles.headerButtons}
          id="headerButtons"
          ref={containerRef}
        >
          {dataFiltered.map((item: any, idx: any) => (
            <React.Fragment key={idx}>
              {renderMenuItems([item], "", data?.[0]?.name_color || "#000")}
            </React.Fragment>
          ))}

          {overflowItems.length > 0 && (
            <div
              className={styles.menuItemWrapper}
              onMouseEnter={() => setShowMore(!showMore)}
            >
              <div className={`${styles.menuItem} ${styles.menuItemWrapper}`}>
                <div
                  className={`${styles.menuItem} ${styles.menuItemWithIcon}`}
                >
                  <Ellipsis />
                  Ver mais
                  <ChevronUp size={16} className={styles.dropdownIcon} />
                </div>
              </div>
              {showMore && (
                <div className={styles.dropdown}>
                  {renderMenuItems(overflowItems, "", data?.[0]?.name_color || "" )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.rightGroup} id="rightGroup"></div>

        {sidebarOpen && (
          <div
            className={styles.sidebarOverlay}
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className={styles.sidebar}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeBtn}
                onClick={() => setSidebarOpen(false)}
              >
                <X />
              </button>
              <div>
                <Box sx={{ width: 224, maxWidth: "100%" }}>
                  <TextField
                    fullWidth
                    id="search"
                    placeholder="Buscar..."
                    variant="outlined"
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-root": {
                        height: "37px",
                        borderRadius: "8px",
                        paddingRight: "0px",
                        "&:hover fieldset": {
                          borderColor: "#ccc",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#9FC54D",
                        },
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ccc",
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          sx={{ marginRight: "15px" }}
                        >
                          <IconButton edge="end" aria-label="pesquisar">
                            <Search />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </div>
              <nav className={styles.sidebarNav}>
                {renderMenuItems(dataFiltered, "", "")}
              </nav>
            </div>
          </div>
        )}

        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            withBackground
            onClose={() => setIsModalOpen(false)}
          >
            <div className={styles.modalContent}>
              <div className={styles.searchModal}>
                <Input
                  className={styles.input}
                  onChange={handleChange}
                  placeholder="Digite algo com no mínimo 3 letras"
                />
                <div className={styles.info}>
                  <Button
                    id="searchButton"
                    className={styles.buttonModal}
                    onClick={handleSubmit}
                    disabled={handleDisable()}
                  >
                    <Search
                      className={styles.searchIcon}
                      size={24}
                      style={{ margin: "auto 0", marginRight: "0.5rem" }}
                    />
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </header>
  );
}

export default Header;
