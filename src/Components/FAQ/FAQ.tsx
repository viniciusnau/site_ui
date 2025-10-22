import React, { useState } from "react";
import styles from "./FAQ.module.css";
import { ChevronUp, MapPin, Phone, Clock, Mail, User, Contact } from "lucide-react";

type FAQcontent = {
  question: string;
  answer?: string;
  subContent?: FAQcontent[];
  address?: string;
  phone?: string[];
  email?: string[];
  workTime?: string[];
  description?: string;
  details?: string[];
  people?: string;
};

interface iFAQ {
  title?: string;
  content: FAQcontent[];
  isUnity?: boolean;
}

const FAQ: React.FC<iFAQ> = ({ content, title, isUnity = false }) => {
  const [openIndices, setOpenIndices] = useState<number[]>([]);
  const toggle = (index: number) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  return (
    <>
      {!isUnity && (
        <div className={styles.container}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.list}>
            {content.map((item, index) => (
              <div key={index} className={styles.item}>
                <button onClick={() => toggle(index)} className={styles.question}>
                  {item.question}
                  <span
                    className={`${styles.icon} ${
                      openIndices.includes(index) ? styles.iconOpen : ""
                    }`}
                  >
                    <ChevronUp />
                  </span>
                </button>
                {openIndices.includes(index) && (
                  <div className={styles.answer}>
                    {item.answer && <p>{item.answer}</p>}
                    {item.subContent && <FAQ content={item.subContent} />}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {isUnity && (
        <div className={styles.container}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.list}>
            {content.map((item, index) => (
              <div key={index} className={styles.item}>
                <button onClick={() => toggle(index)}  className={`${styles.question} ${
                  openIndices.includes(index) ? styles.open : ""
                }`}>
                  {item.question}
                  <span
                    className={`${styles.icon} ${
                      openIndices.includes(index) ? styles.iconOpen : ""
                    }`}
                  >
                    <ChevronUp />
                  </span>
                </button>
                <div className={openIndices.includes(index) ? styles.separator : ""}></div>

                {openIndices.includes(index) && (
                  <>
                    <div className={styles.contentContainer}>
                      {item.people && item.people.length>0 &&(
                        <div className={styles.peopleContainer}>
                          <h3 className={styles.peopleTitle}>
                            <div className={styles.icon}>
                              <User size={18}/> 
                            </div>
                            Defensor Público Titular
                          </h3>
                          <p className={styles.people}>
                            {item.people}    
                          </p>
                          <div className={styles.separator}/>
                        </div>
                      )}
                        {item.address && (
                          <>
                          <p className={styles.address}>
                            <div className={styles.icon}>
                              <MapPin size={18} />
                            </div>
                            {item.address}
                          </p>
                          <div className={styles.separator}/>
                          </>
                        )}
                        {item.phone && item.phone.length > 0 && (
                          <>
                            <p className={styles.titleContact}>
                              <div className={styles.icon}>
                                <Contact size={18}/>
                              </div>
                                Formas de Contato:
                            </p>
                            <ul className={styles.list}>
                              {item.phone.map((phoneNumber, i) => (
                                <li key={i} className={styles.listLine}>
                                  <div className={styles.icon}>
                                    <Phone size={18} />
                                  </div>
                                  <p className={styles.listText}>{phoneNumber}</p>
                                </li>
                              ))}
                            </ul>
                            {item.email && item.email.length>0 &&(
                                <ul className={styles.list}>
                                  {item.email.map((mail, i) => (
                                    <li key={i} className={styles.listLine}>
                                      <div className={styles.icon}>
                                        <Mail size={18} />
                                      </div>
                                      <p className={styles.listText}>{mail}</p>
                                    </li>
                                  ))}
                                </ul>
                            )}
                            <div className={styles.separator}/>
                          </>
                        )}
                       {item.workTime && item.workTime?.length > 0 && (
                        <>
                          <ul className={styles.list}>
                            {item.details?.map((detail, i) => (
                              <li key={i} className={styles.listLine}>
                                <div className={styles.icon}>
                                  <Clock size={18} />
                                </div>
                                <p className={styles.detailsTitle}>{detail}</p>
                                <p className={styles.detailsText}>{item.workTime?.[i] ?? ""}</p>
                              </li>
                            ))}
                          </ul>
                          <div className={styles.separator}/>
                        </>
                        )}
                       {item.description && (<>
                          <div className={styles.description}>
                            {item.description.split('\n').map((line, idx) => (
                              <p key={idx}>{line}</p>
                            ))}
                          </div>
                          <div className={styles.separator}></div>
                        </>
                      )}
                        {item.subContent && item.subContent.length > 0 && (
                          <div className={styles.subcontent}>
                            <FAQ content={item.subContent} isUnity={true} />
                          </div>
                        )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FAQ