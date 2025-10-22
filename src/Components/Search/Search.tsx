import React, { useEffect, useState } from "react";
import styles from "./Search.module.css";
import Button from "../Forms/Button";
import SelectedList from "../SelectedList/SelectedList";
import { optionsCargo } from "../Helper";
import { useDispatch } from "react-redux";
//import { fetchPublic } from "../../Services/Slices/publicSlice";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';
import { Search } from 'lucide-react';


interface iSearch {
  setBackup?: any;
  setSearch?: any;
  search?: any;
  setPage?: any;
  setTempPage?: any;
  onClearFilters?: any;
  showCalendar?: boolean;
  showWords?: boolean;
  showSearchButton?: boolean;
  showCleanButton?: boolean;
  showTypeButtons?: boolean;
}

const SearchComponent: React.FC<iSearch> = ({
  setBackup,
  setSearch,
  setPage,
  setTempPage,
  onClearFilters,
  showCalendar = true,
  showWords = true,
  showSearchButton = true,
  showCleanButton = true,
  showTypeButtons = true,
}) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    date: { from: null as Date | null, to: null as Date | null },
    post_type: [] as string[],
    post_code: "",
    words: [] as string[],
    words_contain: true,
  });
  const [hasValue, setHasValue] = useState<boolean>(false);
  const dateFormat = "YYYY-MM-DD"

  const handleDisable = () => {
    return (
      !form.date.from &&
      !form.date.to &&
      form.post_type.length === 0 &&
      !form.post_code.trim() &&
      form.words.length === 0 &&
      !hasValue
    );
  };

  const handleKeyUp = (e: React.FocusEvent<HTMLInputElement> | any) => {
    const value = e.target.value.trim();
    const key = e.key;
    if (value !== "" && key==="Enter") {
      setForm((prev) => ({
        ...prev,
        words: [...prev.words, value],
      }));
      e.currentTarget.value = "";
    }
  };

  const handleSubmit = () => {
    const lowercaseWords = form.words.map((word: string) => word.toLowerCase());
    const updatedRange = {
      ...form,
      ...(form.date.from || form.date.to
        ? {
            date: {
              from: form.date.from
              ? format(form.date.from, dateFormat)
              : null,
              to: form.date.to
                ? format(form.date.to, dateFormat)
                : form.date.from
            },
          }
        : {}),
      words: lowercaseWords,
    };
    if (form.date.from && !form.date.to) {
      updatedRange.date.to = format(form.date.from, dateFormat);
    } else if (!form.date.from && form.date.to) {
      updatedRange.date.from = format(form.date.to, dateFormat);
    }
    //dispatch<any>(fetchPublic(updatedRange, "1"));
    setPage(1);
    setTempPage(1);
    setBackup(updatedRange);
    setSearch(true);
  };

  const handleDateChange = (newDate: Date | null, type: "from" | "to") => {
    setForm((prev) => ({
      ...prev,
      date: {
        ...prev.date,
        [type]: newDate,
      },
    }));
  };

  const handleClearFilters = () => {
    setSearch(false);
    setBackup({});
    setForm({
      date: { from: null, to: null },
      post_type: [],
      post_code: "",
      words: [],
      words_contain: true,
    });
    setHasValue(false);
    setPage(1);
    setTempPage(1);
    onClearFilters && onClearFilters();
    };
  useEffect(() => {
    const allClear =
      !form.date.from &&
      !form.date.to &&
      form.post_type.length === 0 &&
      !form.post_code.trim() &&
      form.words.length === 0 &&
      !hasValue;
  
    if (allClear) {
      onClearFilters && onClearFilters();
      setSearch(false);
      setBackup({});
      setPage(1);
      setTempPage(1);
    }
  }, [form, hasValue]);    
  return (
    <LocalizationProvider 
      dateAdapter={AdapterDateFns} 
      adapterLocale={ptBR}
      >
      <div className={styles.container}>
        <div className={styles.align}>
          <div className={styles.inputContainer}>
          {showCalendar && (
            <div id="calendarsContainer" className={styles.calendarsContainer}>
              <div className={styles.calendar}>
                <DatePicker
                  label="Data Inicial"
                  dayOfWeekFormatter={(weekday) => format(weekday as Date, 'EEEEEE', { locale: ptBR })}
                  value={form.date.from}
                  desktopModeMediaQuery="(min-width: 0px)"
                  onChange={(newValue) => handleDateChange(newValue as Date | null, "from")}
                  slotProps={{
                    textField: {
                      inputProps: {
                        placeholder: "DD/MM/AAAA",
                      },
                      sx: {
                        "&.MuiPickersTextField-root": {
                          backgroundColor: "var(--off-white-color) ",
                          width: "100%",
                          borderRadius: "var(--border-radius-input)",
                          boxShadow: "var(--light-shadow)",
                        },
                        "& .MuiPickersInputBase-root": {
                          borderRadius: "var(--border-radius-input)",
                          height: "3rem",
                          backgroundColor: "none",
                          "& fieldset": {
                            border: "none",
                            borderColor: "none",
                          },
                        },
                        "& .MuiSvgIcon-root": {
                          color: "#4A4A4A",
                        },
                        "& .MuiInputLabel-root": {
                          fontFamily: "var(--id-font-family)",
                          "&.Mui-focused": {
                            color: "#459436",
                          },
                        },
                      },
                    },
                    day: {
                      sx: {
                        "&.Mui-selected": {
                          backgroundColor: "var(--button-dark-green) !important ",
                          "&:hover": {
                            backgroundColor: "var(--button-dark-green-hover) !important",
                          },
                        },
                      }
                    }
                  }}
                />
              </div>
              <div className={styles.calendar}>
                <DatePicker
                  label="Data Final"
                  value={form.date.to}
                  dayOfWeekFormatter={(weekday) => format(weekday as Date, 'EEEEEE', { locale: ptBR })}
                  desktopModeMediaQuery="(min-width: 0px)"
                  onChange={(newValue) => handleDateChange(newValue as Date | null, "to")}
                  slotProps={{
                    textField: {
                      inputProps: {
                        placeholder: "DD/MM/AAAA",
                      },
                      sx: {
                        "&.MuiPickersTextField-root": {
                          backgroundColor: "var(--off-white-color) ",
                          width: "100%",
                          borderRadius: "var(--border-radius-input)",
                          boxShadow: "var(--light-shadow)",
                        },
                        "& .MuiPickersInputBase-root": {
                          height: "3rem",
                          borderRadius: "var(--border-radius-input)",
                          backgroundColor: "none",
                          "& fieldset": {
                            border: "none",
                            borderColor: "none",
                          },
                        },
                        "& .MuiSvgIcon-root": {
                          color: "#4A4A4A",
                        },
                        "& .MuiInputLabel-root": {
                          fontFamily: "var(--id-font-family)",
                          "&.Mui-focused": {
                            color: "#459436",
                          },
                        },
                      },
                    },
                    day: {
                      sx: {
                        "&.Mui-selected": {
                          backgroundColor: "var(--button-dark-green) !important ",
                          "&:hover": {
                            backgroundColor: "var(--button-dark-green-hover) !important",
                          },
                        },
                      }
                    }
                  }}
                />
              </div>
            </div>)}
            <div className={styles.firstColumn}>
              <div id="type" className={styles.type}>
                  <SelectedList
                    placeholder="Tipo"
                    field="post_type"
                    list={form}
                    setList={setForm}
                    options={optionsCargo}
                    isType
                    readOnly
                  />
                </div>
              {showWords && (
              <div id="keyword" className={styles.keyword}>
                <SelectedList
                  placeholder="Palavra-chave"
                  field="words"
                  list={form}
                  setList={setForm}
                  onKeyUp={handleKeyUp}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                    const value = e.target.value.trim();
                    if (value !== "") {
                      setForm((prev) => ({
                        ...prev,
                        words: [...prev.words, value],
                      }));
                      e.currentTarget.value = "";
                    }
                  }}
                  hasValue={setHasValue}
                />
              </div>)}
            </div>
          </div>
          <div className={styles.lastColumn}>
            <div className={styles.info}>

              {showSearchButton && (
                <Button id="searchButton" className={styles.button} onClick={handleSubmit} disabled={handleDisable()}>
                  <Search size={16} style={{margin:'auto 0', marginRight: '0.5rem' }} />
                    Pesquisar
                </Button>)}
              {showCleanButton && (
                <Button className={styles.cleanButton} onClick={handleClearFilters} disabled={handleDisable()}>
                  Limpar filtros
                </Button>)}
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default SearchComponent;