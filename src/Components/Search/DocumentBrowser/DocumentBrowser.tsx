import React, { useState, useMemo } from 'react';
import { Calendar, Download, Eye, CirclePlus, X, HardDrive } from 'lucide-react'; import SearchComponent from '../Search';
import FilterTypeSelector, { FilterOption } from '../FilterType/FilterTypeSelector';
import styles from './DocumentBrowser.module.css';
import Button from '../../Forms/Button';
import { IDocument } from '../../../Components/Helper';
import Modal from '../../Modal/Modal';


interface DocumentBrowserProps {
  documents: IDocument[];
  filterOptions: FilterOption[];
}

const DocumentBrowser: React.FC<DocumentBrowserProps> = ({ documents, filterOptions }) => {
  const [backup, setBackup] = useState<any>({});
  const [page, setPage] = useState<number>(1);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [tempPage, setTempPage] = useState<number | null>(null);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [openIndices, setOpenIndices] = useState<number[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

  const handleClearAll = () => {
    setSelectedOptions([]);
    setOpenIndices([]);
  };

  const handleClearFilters = () => {
    setPage(1);
    setIsSearched(false);
    setBackup({});
    setSelectedOptions([]);
    setOpenIndices([]);
  };

    const filteredDocuments = useMemo(() => {
    if (selectedOptions.length === 0) {
      return documents;
    }
    const selectedLabels = selectedOptions.map(opt => {
      const parts = opt.split('_');
      return parts[parts.length - 1];
    });

    return documents.filter(doc => selectedLabels.includes(doc.type));
  }, [selectedOptions, documents]); 
  const groupedDocuments = useMemo(() => {
    const groups: { [key: string]: IDocument[] } = {};
    filteredDocuments.forEach(doc => {
      if (!groups[doc.type]) {
        groups[doc.type] = [];
      }
      groups[doc.type].push(doc);
    });
    return groups;
  }, [filteredDocuments]);

  return (
    <div className={styles.documentBrowserContainer}>
        <aside className={styles.sidebar}>
            <FilterTypeSelector
                title="Filtrar por"
                content={filterOptions}
                selectedOptions={selectedOptions}
                onChange={setSelectedOptions}
                onClearAll={handleClearAll}
                openIndices={openIndices}
                setOpenIndices={setOpenIndices}
            />
        </aside>

        <main className={styles.mainContent}>
            <div className={styles.mobileFilterToggle}>
                <button onClick={() => setIsFilterModalOpen(true)} className={styles.filterToggleButton}>
                    <CirclePlus size={24} /> Filtros Avançados
                </button>
            </div>
            <SearchComponent
                setBackup={setBackup}
                setSearch={setIsSearched}
                search={isSearched}
                setPage={setPage}
                setTempPage={setTempPage}
                onClearFilters={handleClearFilters}
                />
            <div className={styles.documentListContainer}>
                <div className={styles.totalFiles}>
                    Total de arquivos para Download: {filteredDocuments.length < 10 ? `0${filteredDocuments.length}` : filteredDocuments.length}
                </div>

                {Object.keys(groupedDocuments).length > 0 ? (
                    Object.keys(groupedDocuments).map(type => (
                    <div key={type} className={styles.documentTypeSection}>
                        <h3 className={styles.documentTypeTitle}>{type}</h3>
                        {groupedDocuments[type].map((doc, docIndex) => (
                            <div key={docIndex} className={styles.documentCard}>
                                <p className={styles.documentTitle}>{doc.title}</p>
                                <div className={styles.documentMeta}>
                                    <span className={styles.documentinformation}><Calendar size={16} /> {doc.date}</span>
                                    {doc.size && <span className={styles.documentinformation}><HardDrive size={16} /> {doc.size}</span>}                     </div>
                                    <div className={styles.documentActions}>
                                        <a 
                                            href={doc.downloadLink}  
                                            className={styles.button} 
                                            download={doc.downloadLink.split('/').pop()}
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            title="Baixar arquivo automaticamente"
                                        >
                                            <Button className={styles.downloadButton} > <Download size={16} /> Baixar
                                            </Button>
                                        </a>
                                        <a 
                                            href={doc.downloadLink} 
                                            className={styles.button} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            title="Abrir para visualizar"
                                        >
                                            <Button className={styles.viewButton} >
                                                <Eye size={16} /> Visualizar
                                            </Button>
                                        </a>
                                </div>
                            </div>
                        ))}
                    </div>
                    ))
                ) : (
                    <p className={styles.noDocumentsMessage}>Nenhum documento encontrado para os filtros selecionados.</p>
                )}
            </div>
        </main>

        <Modal 
            isOpen={isFilterModalOpen} 
            onClose={() => setIsFilterModalOpen(false)} 
            withBackground={true}
            customStyles={styles}
        >
            <FilterTypeSelector
                title="Filtrar por"
                content={filterOptions}
                selectedOptions={selectedOptions}
                onChange={setSelectedOptions}
                onClearAll={handleClearAll}
                openIndices={openIndices}
                setOpenIndices={setOpenIndices}
            />
      </Modal>
    </div>
  );
};

export default DocumentBrowser;