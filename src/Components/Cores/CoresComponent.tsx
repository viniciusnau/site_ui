import React, { useState } from "react";
import styles from "./CoresComponet.module.css";
import { ChevronUp, MapPin, Phone, Clock, Mail, User, Contact } from "lucide-react";
import { title } from "process";

type Unitscontent = {
    id?: number;
    unit_name: string;
    core?: string | number;
    subContent?: Unitscontent[];
    observation?: string;
    description?: string;
    name_dp?: string;
    cep?: string;
    street?: string;
    district?: string;
    city?: string;
    state?: string;
    phone?: string;
    is_whatsapp?: boolean;
    departament?: string;
    email?: string;
    type_of_service?: string;
    schedules?: string;
    area_of_duty?: string;
    emails?: any[];
    contacts?: any[];
    services?: any[];
};

interface Cores {
    core_name?: string;
    content: Unitscontent[];
}

const ToggleItem: React.FC<{
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children?: React.ReactNode;
}> = ({ title, isOpen, onToggle, children }) => (
    <div className={styles.item}>
        <button 
            onClick={onToggle} 
            className={`${styles.question} ${isOpen ? styles.open : ""}`}
        >
            {title}
            <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}>
                <ChevronUp />
            </span>
        </button>
        {isOpen && children && (
            <div className={styles.answer}>
                {children}
            </div>
        )}
    </div>
);

const ContentSection: React.FC<{
    condition: boolean;
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}> = ({ condition, icon, title, children }) => {
    if (!condition) return null;
    
    return (
        <>
            <p className={styles.titleContact}>
                <div className={styles.icon}>{icon}</div>
                {title}
            </p>
            {children}
            <div className={styles.separator}/>
        </>
    );
};

const UnitDetails: React.FC<{ item: Unitscontent }> = ({ item }) => {
    const formatArray = (value: string | undefined): string[] => 
        value ? [value] : [];

    const phones = [
        ...(item.phone ? [{
            phone: item.phone,
            is_whatsapp: item.is_whatsapp ? "Sim" : "Não",
            department: item.departament
        }] : []),
        ...(item.contacts?.map(contact => ({
            phone: contact.phone,
            is_whatsapp: contact.is_whatsapp ? "Sim" : "Não",
            department: contact.department
        })) || [])
    ];

    const emails = [
        ...(item.email ? [item.email] : []),
        ...(item.emails?.map(email => email.email) || [])
    ];

    const services = [
        ...(item.type_of_service && item.schedules ? [{
            service: item.type_of_service,
            schedules: item.schedules
        }] : []),
        ...(item.services?.map(service => ({
            service: service.type_of_service?.service_name,
            schedules: service.schedules
        })) || [])
    ];

    const nameDpArray = formatArray(item.name_dp);
    const descriptionArray = formatArray(item.description);
    const cepArray = formatArray(item.cep);
    const districtArray = formatArray(item.district);

    const areaContent = item.area_of_duty ? 
        (Array.isArray(item.area_of_duty) ? item.area_of_duty : item.area_of_duty.split('\n')) 
        : [];

    return (
        <div className={styles.contentContainer}>
            {nameDpArray.length > 0 && (
                <div className={styles.peopleContainer}>
                    <h3 className={styles.peopleTitle}>
                        <div className={styles.icon}><User size={18}/></div>
                        {nameDpArray.length > 1 ? "Defensores Públicos Titulares" : "Defensor Público Titular"}
                    </h3>
                    {nameDpArray.map((name, i) => (
                        <p key={i} className={styles.people}>{name}</p>
                    ))}
                    <div className={styles.separator}/>
                </div>
            )}

            {item.street && (
                <>
                    <p className={styles.address}>
                        <div className={styles.icon}><MapPin size={18} /></div>
                        {[item.street, districtArray[0], item.city, item.state, cepArray[0]]
                            .filter(Boolean).join(', ')}
                    </p>
                    <div className={styles.separator}/>
                </>
            )}

            <ContentSection 
                condition={phones.length > 0}
                icon={<Contact size={18}/>}
                title="Formas de Contato:"
            >
                {phones.map((phoneData, i) => (
                    <ul key={i} className={styles.list}>
                        <li className={styles.listLine}>
                            <div className={styles.icon}><Phone size={18} /></div>
                            <p className={styles.listText}>
                                {phoneData.phone}
                                {phoneData.is_whatsapp === "Sim" && " (WhatsApp)"}
                                {phoneData.department && ` - ${phoneData.department}`}
                            </p>
                        </li>
                    </ul>
                ))}
            </ContentSection>

            <ContentSection 
                condition={emails.length > 0}
                icon={<Mail size={18} />}
                title="Emails:"
            >
                {emails.map((email, i) => (
                    <ul key={i} className={styles.list}>
                        <li className={styles.listLine}>
                            <p className={styles.listText}>{email}</p>
                        </li>
                    </ul>
                ))}
            </ContentSection>

            <ContentSection 
                condition={services.length > 0}
                icon={<Clock size={18} />}
                title="Horários de Funcionamento:"
            >
                {services.map((service, i) => (
                    <ul key={i} className={styles.list}>
                        <li className={styles.listLine}>
                            <div className={styles.detailsContainer}>
                                {service.service && (
                                    <p className={styles.detailsTitle}>{service.service}:</p>
                                )}
                                <p className={styles.detailsText}>{service.schedules}</p>
                            </div>
                        </li>
                    </ul>
                ))}
            </ContentSection>

            {areaContent.length > 0 && (
                <div className={styles.description}>
                    <h4 className={styles.detailsTitle}>Área de Atuação:</h4>
                    {areaContent.map((line, idx) => (
                        <p key={idx} className={styles.detailsText}>{line}</p>
                    ))}
                    <div className={styles.separator}></div>
                </div>
            )}

            {item.observation && (
                <div className={styles.description}>
                    <h4 className={styles.detailsTitle}>Observações:</h4>
                    <p className={styles.detailsText}>{item.observation}</p>
                    <div className={styles.separator}></div>
                </div>
            )}

            {descriptionArray.length > 0 && (
                <div className={styles.description}>
                    <h4 className={styles.detailsTitle}>Informações Adicionais:</h4>
                    {descriptionArray.map((desc, idx) => (
                        <p key={idx} className={styles.detailsText}>{desc}</p>
                    ))}
                    <div className={styles.separator}></div>
                </div>
            )}
        </div>
    );
};

const CoresComponent: React.FC<Cores> = ({ content, core_name }) => {
    const [openIndices, setOpenIndices] = useState<number[]>([]);
    
    const toggle = (index: number) => {
        setOpenIndices(prev => {
            if (prev.includes(index)) {
                return index === 0 ? [] : prev.filter(i => i !== index);
            } else {
                return [...prev, index];
            }
        });
    };

    if (!content?.length) return null;

    return (
        <div className={styles.container}>
            <ToggleItem
                title={core_name || "Núcleo"}
                isOpen={openIndices.includes(0)}
                onToggle={() => toggle(0)}
            >
                <div className={styles.list}>
                    {content.map((item, index) => (
                        <ToggleItem
                            key={item.id || index}
                            title={item.unit_name}
                            isOpen={openIndices.includes(index + 1)}
                            onToggle={() => toggle(index + 1)}
                        >
                            <UnitDetails item={item} />
                        </ToggleItem>
                    ))}
                </div>
            </ToggleItem>
        </div>
    );
};

export default CoresComponent;