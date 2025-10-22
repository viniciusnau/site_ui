import React, { useRef, useState } from "react";
import styles from "./SelectedList.module.css";
import { sanitizeInput, maxLenght } from "../Helper";
import Input from "../Forms/Input";
import { v4 as uuidv4 } from "uuid";
import { Trash2 } from 'lucide-react';

interface iSelectedList {
    setList: any;
    list: any;
    placeholder?: string;
    isType?: boolean;
    field: string;
    value?: any;
    readOnly?: boolean;
    className?: any;
    classNameDiv?: any;
    options?: string[];
    onBlur?: any;
    onKeyUp?: any;
    hasValue?: any;
}

const SelectedList: React.FC<iSelectedList> = ({
                                                   setList,
                                                   list = {},
                                                   placeholder,
                                                   isType,
                                                   field,
                                                   value,
                                                   readOnly,
                                                   className,
                                                   classNameDiv,
                                                   options,
                                                   onKeyUp,
                                                   hasValue,
                                                   ...props
                                               }) => {
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const inputValue = value !== undefined ? value : "";
    const optionsListRef = useRef<HTMLDivElement | null>(null);

    const handleAddItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
        let inputValue = e.currentTarget.value.trim();
        inputValue = sanitizeInput(inputValue);
        if ((e.key === "Enter" && inputValue !== "" && inputValue !== "")) {
            if (inputValue.length > maxLenght) {
                return;
              }
            if (field === "status" && list[field]?.length >= 1) {
                return;
            }
            if (field === "type" && list[field]?.length >= 1) {
                return;
            }
            setList((prev: any) => ({
                ...prev,
                [field]: [...(prev[field] || []), inputValue],
            }));
            e.currentTarget.value = "";
            e.preventDefault();
        }
    };

    const removeItem = (keyword: string) => {
        setList((prev: any) => {
            const updatedKeywords = Array.isArray(prev[field]) ? [...prev[field]] : [];
            const index = updatedKeywords.indexOf(keyword);
            if (index !== -1) {
                updatedKeywords.splice(index, 1);
            }
            return {
                ...prev,
                [field]: updatedKeywords,
            };
        });
    };

    const handleOption = (e: any) => {
        const option = e.currentTarget.value;
        if (field === "status" || field === "type") {
            setList((prev: any) => ({
                ...prev,
                [field]: [option],
            }));
        } else {
            if (!list[field]) {
                setList((prev: any) => ({
                    ...prev,
                    [field]: [option],
                }));
            } else if (!list[field].includes(option)) {
                setList((prevRange: any) => ({
                    ...prevRange,
                    [field]: [...prevRange[field], option],
                }));
            }
        }
        setShowOptions(false);
    };

    const handleBlur = (e: React.FocusEvent) => {
        if (!optionsListRef.current?.contains(e.relatedTarget)) {
            setTimeout(() => {
                setShowOptions(false);
            }, 100);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;
        inputValue = sanitizeInput(inputValue);

        if (inputValue.includes(" ")) {
            const wordsArray = inputValue.trim().split(" ");
            const lastWord = wordsArray[wordsArray.length - 1];
    
            if (lastWord !== "") {
                setList((prev: any) => ({
                    ...prev,
                    [field]: [...(prev[field] || []), lastWord],
                }));
            }
            e.target.value = "";
        }
    
        e.target.value !== "" ? hasValue(true) : hasValue(false);
    };
    
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        let pastedText = e.clipboardData.getData("text");
    
        const wordsArray = pastedText.split(/[\s,.;:?()!]+/).filter(Boolean);
    
        setList((prev: any) => ({
            ...prev,
            [field]: [...(prev[field] || []), ...wordsArray],
        }));
    };
    

    return (
        <div className={styles.listContainer}>
            <Input
                className={`${styles.input} ${className}`}
                onKeyPress={handleAddItem}
                name={field}
                onPaste={handlePaste}
                placeholder={placeholder}
                onFocus={isType && (() => {
                    setShowOptions(true);
                })}
                onBlur={isType && handleBlur}
                defaultValue={inputValue}
                readOnly={readOnly}
                onKeyUp={onKeyUp}
                max={field ==="words" ? maxLenght : undefined}
                onChange={handleChange}
                {...props}
            />
            {showOptions && (
                <div className={styles.list} ref={optionsListRef}>
                    {options?.map((option: any) => (
                        <button
                            className={`${styles.option} ${list[field]?.includes(option) ? styles.selectedOption : ""}`}
                            key={uuidv4()}
                            value={option}
                            onClick={handleOption}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
            {!showOptions && list[field]?.length > 0 && (
                <div className={styles.selectionContainer}>
                    <div className={styles.scrollWrapper}>
                        <div className={styles.selected}>
                            {list[field]?.map((item: string) => (
                                <div key={uuidv4()} className={`${styles.item} ${classNameDiv}`}>
                                    {item}
                                    <button
                                        className={styles.remove}
                                        onClick={() => removeItem(item)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectedList;
