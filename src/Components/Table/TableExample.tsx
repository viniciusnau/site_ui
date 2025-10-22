import React from "react";
import Table from "./Table";
import {
  TableColumn,
  BooleanColumnConfig,
  DateColumnConfig,
  ActionsColumnConfig,
  GenericFilterConfig,
  CreateButtonConfig,
  TableCustomStyles,
} from "../../types/tableTypes";

/**
 * ====================================================================================================
 * 📚 DOCUMENTAÇÃO COMPLETA DO COMPONENTE TABLE
 * ====================================================================================================
 *
 * O componente Table é uma solução completa e avançada para exibição de dados tabulares com
 * funcionalidades modernas como skeleton loading, filtros inteligentes, ordenação, paginação,
 * e sistema de permissões robusto.
 *
 * ====================================================================================================
 * 🚀 COMO IMPORTAR E USAR
 * ====================================================================================================
 *
 * 1. IMPORTAÇÕES BÁSICAS:
 * ```tsx
 * import Table from './Components/Table/Table';
 * import { TableColumn, TableCustomStyles } from './types/tableTypes';
 * ```
 *
 * 2. IMPORTAÇÕES AVANÇADAS (com todas as configurações):
 * ```tsx
 * import Table from './Components/Table/Table';
 * import {
 *   TableColumn,
 *   StatusColumnConfig,
 *   DateColumnConfig,
 *   ActionsColumnConfig,
 *   GenericFilterConfig,
 *   CreateButtonConfig,
 *   TableCustomStyles
 * } from './types/tableTypes';
 * ```
 *
 * 3. USO BÁSICO:
 * ```tsx
 * <Table
 *   data={minhaListaDeDados}
 *   columns={configuracoesDeColuna}
 *   onDelete={(id) => deletarItem(id)}
 * />
 * ```
 *
 * ====================================================================================================
 * 🎨 SISTEMA DE ESTILIZAÇÃO CUSTOMIZÁVEL
 * ====================================================================================================
 *
 * O componente suporta customização completa de estilos através da prop `customStyles`.
 * Você pode sobrescrever QUALQUER parte visual da tabela:
 *
 * EXEMPLO DE ESTILIZAÇÃO COMPLETA:
 * ```tsx
 * const estilosCustomizados: TableCustomStyles = {
 *   // Container principal da tabela
 *   container: {
 *     backgroundColor: '#f8f9fa',
 *     borderRadius: '12px',
 *     boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
 *     border: '2px solid #e5e7eb'
 *   },
 *
 *   // Área de filtros no topo
 *   filtersContainer: {
 *     backgroundColor: '#ffffff',
 *     padding: '2rem',
 *     borderRadius: '12px 12px 0 0',
 *     borderBottom: '1px solid #e5e7eb'
 *   },
 *
 *   // Labels dos filtros
 *   filterLabel: {
 *     color: '#374151',
 *     fontWeight: '600',
 *     fontSize: '0.875rem',
 *     marginBottom: '0.5rem'
 *   },
 *
 *   // Inputs de filtro (busca, data)
 *   filterInput: {
 *     borderRadius: '8px',
 *     border: '2px solid #d1d5db',
 *     padding: '0.75rem',
 *     fontSize: '0.875rem',
 *     transition: 'border-color 0.2s ease',
 *     backgroundColor: '#ffffff'
 *   },
 *
 *   // Botão de filtrar
 *   filterButton: {
 *     backgroundColor: '#3b82f6',
 *     color: '#ffffff',
 *     borderRadius: '8px',
 *     padding: '0.75rem 1.5rem',
 *     fontWeight: '600',
 *     border: 'none',
 *     cursor: 'pointer',
 *     transition: 'background-color 0.2s ease'
 *   },
 *
 *   // Botão de limpar filtros
 *   clearButton: {
 *     backgroundColor: '#ef4444',
 *     color: '#ffffff',
 *     borderRadius: '8px',
 *     padding: '0.75rem 1.5rem',
 *     fontWeight: '600',
 *     border: 'none',
 *     cursor: 'pointer',
 *     transition: 'background-color 0.2s ease'
 *   },
 *
 *   // Cabeçalho da tabela
 *   thead: {
 *     backgroundColor: '#1f2937'
 *   },
 *
 *   // Células do cabeçalho
 *   header: {
 *     color: '#ffffff',
 *     fontSize: '0.875rem',
 *     fontWeight: '700',
 *     padding: '1rem',
 *     textTransform: 'uppercase',
 *     letterSpacing: '0.05em'
 *   },
 *
 *   // Linhas da tabela
 *   row: {
 *     borderBottom: '1px solid #e5e7eb',
 *     transition: 'background-color 0.2s ease',
 *     ':hover': {
 *       backgroundColor: '#f9fafb'
 *     }
 *   },
 *
 *   // Células da tabela
 *   cell: {
 *     padding: '1rem',
 *     fontSize: '0.875rem',
 *     color: '#374151'
 *   },
 *
 *   // Container da coluna de status
 *   statusContainer: {
 *     display: 'flex',
 *     justifyContent: 'center',
 *     alignItems: 'center',
 *     padding: '0.5rem',
 *     borderRadius: '50%',
 *     backgroundColor: '#f3f4f6'
 *   },
 *
 *   // Container da coluna de data
 *   dateContainer: {
 *     backgroundColor: '#fef3c7',
 *     padding: '0.5rem',
 *     borderRadius: '6px',
 *     border: '1px solid #fcd34d',
 *     fontSize: '0.75rem'
 *   },
 *
 *   // Container das ações
 *   actionsContainer: {
 *     display: 'flex',
 *     gap: '0.5rem',
 *     justifyContent: 'center'
 *   },
 *
 *   // Botões de ação
 *   actionButton: {
 *     padding: '0.5rem',
 *     borderRadius: '6px',
 *     backgroundColor: '#f3f4f6',
 *     border: '1px solid #d1d5db',
 *     cursor: 'pointer',
 *     transition: 'all 0.2s ease'
 *   },
 *
 *   // Container da paginação
 *   paginationContainer: {
 *     backgroundColor: '#f9fafb',
 *     padding: '1rem 2rem',
 *     borderRadius: '0 0 12px 12px',
 *     borderTop: '1px solid #e5e7eb',
 *     display: 'flex',
 *     justifyContent: 'space-between',
 *     alignItems: 'center'
 *   },
 *
 *   // Botões da paginação
 *   paginationButton: {
 *     backgroundColor: '#3b82f6',
 *     color: '#ffffff',
 *     borderRadius: '6px',
 *     padding: '0.5rem 1rem',
 *     border: 'none',
 *     cursor: 'pointer',
 *     fontWeight: '600',
 *     transition: 'background-color 0.2s ease'
 *   },
 *
 *   // Mensagem quando não há dados
 *   emptyMessage: {
 *     backgroundColor: '#fef3c7',
 *     color: '#92400e',
 *     padding: '3rem',
 *     textAlign: 'center',
 *     fontSize: '1.125rem',
 *     fontWeight: '600',
 *     borderRadius: '8px',
 *     border: '2px solid #fcd34d'
 *   }
 * };
 *
 * // Usar os estilos:
 * <Table customStyles={estilosCustomizados} ... />
 * ```
 *
 * ====================================================================================================
 * 📊 CONFIGURAÇÃO DE COLUNAS
 * ====================================================================================================
 *
 * COLUNAS BÁSICAS:
 * ```tsx
 * const colunas: TableColumn<MeuTipoDeDados>[] = [
 *   {
 *     key: 'nome',              // Campo do objeto de dados
 *     header: 'Nome Completo',  // Título que aparece no cabeçalho
 *     sortable: true,           // Se pode ser ordenada (opcional)
 *     width: '200px'            // Largura da coluna (opcional)
 *   },
 *   {
 *     key: 'email',
 *     header: 'E-mail',
 *     sortable: true,
 *     width: '250px'
 *   },
 *   {
 *     key: 'cargo',
 *     header: 'Cargo',
 *     sortable: false,
 *     width: '150px',
 *     render: (item) => item.cargo.join(', ') // Renderização customizada
 *   }
 * ];
 * ```
 *
 * COLUNA BOOLEANA (CHECK/X) PREDEFINIDA:
 * ```tsx
 * // Exemplo 1: Campo booleano simples
 * const configBooleano: BooleanColumnConfig<MeuTipoDeDados> = {
 *   enabled: true,
 *   header: 'Ativo',         // Título da coluna (obrigatório)
 *   field: 'isActive',       // Campo que será avaliado
 *   checkValue: true,        // Valor que resulta em ✓ (padrão: true)
 *   xValue: false,           // Valor que resulta em ✗ (padrão: false)
 *   width: '100px',          // Largura opcional
 *   sortable: true           // Se pode ser ordenada (opcional)
 * };
 *
 * // Exemplo 2: Campo string (status)
 * const configStatus: BooleanColumnConfig<MeuTipoDeDados> = {
 *   enabled: true,
 *   header: 'Publicado',
 *   field: 'status',         // Campo string
 *   checkValue: 'active',    // String 'active' = ✓
 *   xValue: 'inactive',      // String 'inactive' = ✗
 *   width: '100px',
 *   sortable: true
 * };
 *
 * // Exemplo 3: Campo numérico
 * const configNumerico: BooleanColumnConfig<MeuTipoDeDados> = {
 *   enabled: true,
 *   header: 'Aprovado',
 *   field: 'score',
 *   checkValue: 1,           // Número 1 = ✓
 *   xValue: 0,              // Número 0 = ✗
 *   width: '100px'
 * };
 *
 * // Exemplo 4: Sem coluna booleana
 * const semColuna: BooleanColumnConfig<MeuTipoDeDados> = {
 *   enabled: false,          // Desabilita a coluna
 *   header: '',
 *   field: 'anyField'
 * };
 * ```
 *
 * COLUNA DE DATA PREDEFINIDA:
 * ```tsx
 * // Para uma única data:
 * const configDataSimples: DateColumnConfig<MeuTipoDeDados> = {
 *   enabled: true,
 *   header: 'Data de Criação', // Opcional
 *   dateField: 'criadoEm',     // Campo da data
 *   width: '120px',            // Opcional
 *   sortable: true             // Opcional, padrão true
 * };
 *
 * // Para range de datas (início e fim):
 * const configDataRange: DateColumnConfig<MeuTipoDeDados> = {
 *   enabled: true,
 *   dateField: 'criadoEm',     // Data principal (opcional se tiver start/end)
 *   startDateField: 'dataInicio', // Data de início
 *   endDateField: 'dataFim',      // Data de fim
 *   width: '120px',
 *   sortable: true
 * };
 * ```
 *
 * COLUNA DE AÇÕES PREDEFINIDA:
 * ```tsx
 * const configAcoes: ActionsColumnConfig<MeuTipoDeDados> = {
 *   enabled: true,
 *   header: 'Ações',           // Opcional, padrão "Ações"
 *   width: '180px',            // Opcional, padrão "150px"
 *   permissions: {             // Permissões baseadas no usuário logado
 *     canView: true,           // Pode visualizar
 *     canEdit: true,           // Pode editar
 *     canDelete: true,         // Pode deletar
 *     canCreate: true          // Pode criar (afeta botão de criar)
 *   },
 *   view: {
 *     enabled: true,           // Opcional, padrão true se canView
 *     onClick: (item) => {     // Função ao clicar em visualizar
 *       console.log('Visualizar:', item);
 *       // Sua lógica aqui
 *     }
 *   },
 *   edit: {
 *     enabled: true,           // Opcional, padrão true se canEdit
 *     onClick: (item) => {     // Opcional, usa função padrão se não fornecido
 *       console.log('Editar:', item);
 *       // Sua lógica aqui
 *     }
 *   },
 *   delete: {
 *     enabled: true,           // Opcional, padrão true se canDelete
 *     confirmMessage: 'Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.', // Mensagem customizada
 *     onClick: (item) => {     // Opcional, usa onDelete da Table se não fornecido
 *       // Sua lógica de delete customizada aqui
 *       deletarUsuario(item.id);
 *     }
 *   }
 * };
 * ```
 *
 * ====================================================================================================
 * 🔍 SISTEMA DE FILTROS AVANÇADO
 * ====================================================================================================
 *
 * FILTROS GENÉRICOS CUSTOMIZÁVEIS:
 * ```tsx
 * const filtrosPersonalizados: GenericFilterConfig<MeuTipoDeDados>[] = [
 *   {
 *     enabled: true,
 *     label: 'Cargo',                    // Nome que aparece
 *     column: 'cargo',                   // Campo a ser filtrado
 *     options: ['Admin', 'User', 'Moderator'], // Opções disponíveis
 *     width: '160px',                    // Largura opcional
 *     multiple: true                     // Multi-seleção (opcional, padrão false)
 *   },
 *   {
 *     enabled: true,
 *     label: 'Departamento',
 *     column: 'departamento',
 *     options: ['TI', 'RH', 'Financeiro', 'Marketing'],
 *     width: '180px',
 *     multiple: false                    // Seleção única
 *   },
 *   {
 *     enabled: true,
 *     label: 'Status do Projeto',
 *     column: 'statusProjeto',
 *     options: ['Em Andamento', 'Concluído', 'Pausado', 'Cancelado'],
 *     width: '200px',
 *     multiple: true                     // Permite selecionar múltiplos status
 *   }
 * ];
 * ```
 *
 * INTEGRAÇÃO COM BACKEND (FILTROS):
 * ```tsx
 * // Funções para enviar filtros para o backend:
 * const handleFiltroData = (dataInicio: Date | null, dataFim: Date | null) => {
 *   console.log('Filtrar por data:', { dataInicio, dataFim });
 *   // api.filtrarPorData(dataInicio, dataFim);
 * };
 *
 * const handleFiltroBusca = (termo: string) => {
 *   console.log('Buscar por:', termo);
 *   // api.buscar(termo);
 * };
 *
 * const handleFiltrosGenericos = (filtros: Record<string, string | string[]>) => {
 *   console.log('Filtros aplicados:', filtros);
 *   // Exemplo de como processar:
 *   Object.entries(filtros).forEach(([campo, valor]) => {
 *     if (Array.isArray(valor)) {
 *       console.log(`Filtro múltiplo ${campo}:`, valor);
 *       // WHERE campo IN (valor1, valor2, ...)
 *     } else if (valor) {
 *       console.log(`Filtro simples ${campo}:`, valor);
 *       // WHERE campo = valor
 *     }
 *   });
 * };
 *
 * // Usar os callbacks:
 * <Table
 *   onDateFilter={handleFiltroData}
 *   onSearchFilter={handleFiltroBusca}
 *   onGenericFilter={handleFiltrosGenericos}
 *   ...
 * />
 * ```
 *
 * ====================================================================================================
 * 🔄 SISTEMA DE ORDENAÇÃO
 * ====================================================================================================
 *
 * ORDENAÇÃO LOCAL (automática):
 * Se você não fornecer callback `onSort`, a ordenação acontece automaticamente no frontend.
 *
 * ORDENAÇÃO NO BACKEND:
 * ```tsx
 * const handleOrdenacao = (campo: string, direcao: 'asc' | 'desc') => {
 *   console.log('Ordenar por:', campo, direcao);
 *   // api.ordenarPor(campo, direcao);
 * };
 *
 * <Table onSort={handleOrdenacao} ... />
 * ```
 *
 * ====================================================================================================
 * 📄 SISTEMA DE PAGINAÇÃO
 * ====================================================================================================
 *
 * CONFIGURAÇÃO DA PAGINAÇÃO:
 * ```tsx
 * <Table
 *   pagination={true}          // Habilita paginação
 *   itemsPerPage={10}         // Itens por página
 *   ...
 * />
 * ```
 *
 * ====================================================================================================
 * 🎭 ESTADOS DA TABELA
 * ====================================================================================================
 *
 * SKELETON LOADING (estado de carregamento):
 * ```tsx
 * <Table loading={true} ... />  // Mostra skeleton loading moderno
 * ```
 *
 * TABELA VAZIA:
 * ```tsx
 * <Table data={[]} ... />       // Mostra mensagem "Nenhuma informação foi encontrada!"
 * ```
 *
 * DADOS NORMAIS:
 * ```tsx
 * <Table data={meusDados} ... />
 * ```
 *
 * ====================================================================================================
 * 🔧 CONFIGURAÇÃO DO BOTÃO CRIAR
 * ====================================================================================================
 *
 * ```tsx
 * const botaoCriar: CreateButtonConfig = {
 *   enabled: true,             // Opcional, padrão baseado em permissions.canCreate
 *   text: 'Criar Novo Usuário', // Texto do botão
 *   onClick: () => {
 *     console.log('Abrir modal de criação');
 *     // Sua lógica aqui
 *   }
 * };
 * ```
 *
 * ====================================================================================================
 * 💡 EXEMPLO COMPLETO DE USO
 * ====================================================================================================
 *
 * ```tsx
 * function MinhaTabela() {
 *   const [dados, setDados] = useState([]);
 *   const [carregando, setCarregando] = useState(true);
 *
 *   // Definir estrutura dos dados
 *   interface MeuItem {
 *     id: number;
 *     nome: string;
 *     email: string;
 *     cargo: string[];
 *     ativo: boolean;
 *     criadoEm: string;
 *   }
 *
 *   // Configurar colunas
 *   const colunas: TableColumn<MeuItem>[] = [
 *     { key: 'nome', header: 'Nome', sortable: true },
 *     { key: 'email', header: 'E-mail', sortable: true },
 *     { key: 'cargo', header: 'Cargo', render: (item) => item.cargo.join(', ') }
 *   ];
 *
 *   // Estilos customizados
 *   const estilos: TableCustomStyles = {
 *     container: { borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' },
 *     header: { backgroundColor: '#3b82f6', color: 'white' }
 *   };
 *
 *   return (
 *     <Table
 *       data={dados}
 *       columns={colunas}
 *       loading={carregando}
 *       customStyles={estilos}
 *       booleanColumn={{ enabled: true, header: 'Ativo', field: 'isActive' }}
 *       dateColumn={{ enabled: true, dateField: 'criadoEm' }}
 *       actionsColumn={{
 *         enabled: true,
 *         permissions: { canView: true, canEdit: true, canDelete: true },
 *         view: { onClick: (item) => console.log('Ver', item) },
 *         edit: { onClick: (item) => console.log('Editar', item) },
 *         delete: { onClick: (item) => console.log('Deletar', item) }
 *       }}
 *       genericFilters={[
 *         { enabled: true, label: 'Cargo', column: 'cargo', options: ['Admin', 'User'] }
 *       ]}
 *       searchable={true}
 *       sortable={true}
 *       pagination={true}
 *       itemsPerPage={10}
 *       onDelete={(id) => console.log('Deletar ID:', id)}
 *     />
 *   );
 * }
 * ```
 *
 * ====================================================================================================
 */

// Exemplo de dados para demonstrar as funcionalidades
interface UserData {
  id: number;
  name: string;
  email: string;
  status: string;
  role: string[];
  department: string;
  createdAt: string;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
}

const sampleData: UserData[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@email.com",
    status: "active",
    role: ["Admin"],
    department: "TI",
    createdAt: "2024-01-15",
    startDate: "2024-01-15",
    endDate: "2025-12-31", // Data válida
    isActive: true,
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@email.com",
    status: "inactive",
    role: ["User"],
    department: "RH",
    createdAt: "2024-02-10",
    startDate: "2024-02-10",
    endDate: "2024-06-30", // Data expirada
    isActive: false,
  },
  {
    id: 3,
    name: "Pedro Costa",
    email: "pedro@email.com",
    status: "active",
    role: ["Moderator"],
    department: "Financeiro",
    createdAt: "2024-03-05",
    startDate: "2024-03-05",
    // Sem data final
    isActive: true,
  },
  {
    id: 4,
    name: "Ana Lima",
    email: "ana@email.com",
    status: "active",
    role: ["User"],
    department: "Marketing",
    createdAt: "2024-07-20", // Só data simples
    isActive: true,
  },
  {
    id: 5,
    name: "Carlos Ferreira",
    email: "carlos@email.com",
    status: "active",
    role: ["User"],
    department: "Vendas",
    createdAt: "2024-08-10",
    isActive: true,
  },
];

// Dados com problemas para simular erros
const corruptedData: any[] = [
  {
    id: 1,
    name: "",
    email: "email_sem_nome@email.com",
    status: "active",
    role: [],
    createdAt: "2024-01-15",
    isActive: true,
  },
  {
    id: 2,
    name: undefined, // Campo obrigatório ausente
    email: null,
    status: "unknown_status",
    role: ["Role_Inexistente"],
    createdAt: "data_invalida",
    isActive: "maybe", // Tipo errado
  },
  {
    id: 3,
    // Objeto sem alguns campos obrigatórios
    email: "teste@email.com",
    status: null,
    role: null,
    createdAt: null,
    isActive: undefined,
  },
];

const TableExample: React.FC = () => {
  // Configuração das colunas normais
  const columns: TableColumn<UserData>[] = [
    {
      key: "name",
      header: "Nome",
      sortable: true,
      width: "200px",
    },
    {
      key: "email",
      header: "E-mail",
      sortable: true,
      width: "250px",
    },
    {
      key: "role",
      header: "Cargo",
      sortable: false,
      width: "150px",
      render: (item) => {
        if (!item.role || !Array.isArray(item.role)) {
          return "-";
        }
        return item.role.length > 0 ? item.role.join(", ") : "-";
      },
    },
  ];

  const inputStyles = {
    padding: "1rem",
  };
  // Exemplo de estilos customizados
  const customStyles: TableCustomStyles = {
    container: {
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
      border: "2px solid #e5e7eb",
    },
    filtersContainer: {
      backgroundColor: "#f8fafc",
      padding: "2rem",
      borderRadius: "12px 12px 0 0",
    },
    filterLabel: {
      color: "#1e293b",
      fontWeight: "600",
      fontSize: "0.9rem",
    },
    filterInput: {
      borderRadius: "8px",
      border: "2px solid #e2e8f0",
      padding: "0.75rem",
      transition: "all 0.2s ease",
    },
    filterButton: {
      backgroundColor: "#3b82f6",
      borderRadius: "8px",
      padding: "0.75rem 1.5rem",
      fontWeight: "600",
      boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
    },
    clearButton: {
      backgroundColor: "#ef4444",
      borderRadius: "8px",
      padding: "0.75rem 1.5rem",
      fontWeight: "600",
      boxShadow: "0 2px 8px rgba(239, 68, 68, 0.3)",
    },
    thead: {
      backgroundColor: "#1e293b",
    },
    header: {
      color: "#ffffff",
      fontSize: "0.95rem",
      fontWeight: "700",
      padding: "1.25rem",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    row: {
      transition: "all 0.2s ease",
    },
    cell: {
      padding: "1.25rem",
      fontSize: "0.9rem",
      borderBottom: "1px solid #f1f5f9",
    },
    statusContainer: {
      padding: "0.75rem",
      borderRadius: "50%",
      backgroundColor: "#f8fafc",
    },
    dateContainer: {
      backgroundColor: "#fef3c7",
      padding: "0.5rem",
      borderRadius: "6px",
      border: "1px solid #fcd34d",
    },
    actionsContainer: {
      gap: "1rem",
    },
    actionButton: {
      padding: "0.75rem",
      borderRadius: "8px",
      backgroundColor: "#f1f5f9",
      border: "1px solid #e2e8f0",
      transition: "all 0.2s ease",
    },
    paginationContainer: {
      backgroundColor: "#f8fafc",
      padding: "1.5rem 2rem",
      borderRadius: "0 0 12px 12px",
      borderTop: "2px solid #e2e8f0",
    },
    paginationButton: {
      backgroundColor: "#3b82f6",
      borderRadius: "8px",
      padding: "0.75rem 1.25rem",
      fontWeight: "600",
      color: "#ffffff",
      border: "none",
      boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
    },
    emptyMessage: {
      backgroundColor: "#fef3c7",
      color: "#92400e",
      padding: "3rem",
      fontSize: "1.2rem",
      fontWeight: "700",
      borderRadius: "8px",
      border: "2px solid #fcd34d",
    },
  };

  // Callbacks para demonstrar integração com backend
  const handleDateFilter = (dateFrom: Date | null, dateTo: Date | null) => {
    console.log("Filtro de data para backend:", { dateFrom, dateTo });
    // Aqui você faria a requisição para o backend
    // api.filterByDate(dateFrom, dateTo)
  };

  const handleSearchFilter = (searchTerm: string) => {
    console.log("Busca para backend:", searchTerm);
    // Aqui você faria a requisição para o backend
    // api.search(searchTerm)
  };

  const handleSort = (key: string, direction: "asc" | "desc") => {
    console.log("Ordenação para backend:", { key, direction });
    // Aqui você faria a requisição para o backend
    // api.sortBy(key, direction)
  };

  const handleGenericFilter = (filters: Record<string, string | string[]>) => {
    console.log("Filtros genéricos para backend:", filters);
    // Aqui você faria a requisição para o backend
    // api.filterBy(filters)

    // Exemplo de como lidar com diferentes tipos:
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        console.log(`Filtro multi-seleção ${key}:`, value);
        // Para arrays: WHERE ${key} IN (${value})
      } else if (value) {
        console.log(`Filtro simples ${key}:`, value);
        // Para strings: WHERE ${key} = '${value}'
      }
    });
  };

  // Configuração da coluna booleana (check/X) predefinida
  const booleanConfig: BooleanColumnConfig<UserData> = {
    enabled: true,
    header: "Ativo",
    field: "isActive", // Campo booleano que será avaliado
    checkValue: true, // Valor que resulta em check (✓)
    xValue: false, // Valor que resulta em X (✗)
    width: "100px",
    sortable: true,
  };

  // Exemplo alternativo: Coluna booleana baseada em status
  const statusBooleanConfig: BooleanColumnConfig<UserData> = {
    enabled: true,
    header: "Publicado",
    field: "status", // Campo string que será avaliado
    checkValue: "active", // String 'active' resulta em check (✓)
    xValue: "inactive", // String 'inactive' resulta em X (✗)
    width: "100px",
    sortable: true,
  };

  // Exemplo: Sem coluna booleana
  const noBooleanConfig: BooleanColumnConfig<UserData> = {
    enabled: false,
    header: "",
    field: "isActive",
  };

  // Configuração da coluna de data predefinida
  const dateConfig: DateColumnConfig<UserData> = {
    enabled: true,
    header: "Data",
    dateField: "createdAt",
    startDateField: "startDate",
    endDateField: "endDate",
    width: "150px",
    sortable: true,
  };

  // Configuração dos filtros genéricos
  const genericFiltersConfig = [
    {
      enabled: true,
      label: "Cargo (Multi)",
      column: "role" as keyof UserData,
      options: ["Admin", "User", "Moderator", "User", "Moderator"],
      width: "160px",
      multiple: true, // Permite múltipla seleção
    },
    {
      enabled: true,
      label: "Departamento",
      column: "department" as keyof UserData,
      options: ["TI", "RH", "Financeiro", "Marketing", "Vendas"],
      width: "140px",
      multiple: false, // Seleção única
    },
  ];

  // Configuração da coluna de ações predefinida (usuário administrador)
  const adminActionsConfig: ActionsColumnConfig<UserData> = {
    enabled: true,
    header: "Ações",
    width: "150px",
    permissions: {
      canView: true,
      canEdit: true,
      canDelete: true,
      canCreate: true,
    },
    view: {
      enabled: true,
      onClick: (item) => {
        alert(`Visualizar usuário: ${item.name}`);
        console.log("Ver item:", item);
      },
    },
    edit: {
      onClick: (item) => {
        alert(`Editar usuário: ${item.name}`);
        console.log("Editar item:", item);
      },
    },
    delete: {
      confirmMessage: `Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.`,
      onClick: (item) => {
        alert(`Usuário ${item.name} deletado!`);
        console.log("Deletar item:", item);
      },
    },
  };

  // Configuração com mensagem de confirmação personalizada para cada item
  const customDeleteActionsConfig: ActionsColumnConfig<UserData> = {
    enabled: true,
    header: "Ações",
    width: "150px",
    permissions: {
      canView: true,
      canEdit: true,
      canDelete: true,
      canCreate: true,
    },
    view: {
      enabled: true,
      onClick: (item) => {
        alert(`Visualizar usuário: ${item.name}`);
      },
    },
    edit: {
      onClick: (item) => {
        alert(`Editar usuário: ${item.name}`);
      },
    },
    delete: {
      confirmMessage: `Você está prestes a excluir permanentemente o usuário. Esta operação é irreversível e todos os dados associados serão perdidos.`,
      onClick: (item) => {
        alert(`Usuário deletado permanentemente!`);
        console.log("Deletar item:", item);
      },
    },
  };

  // Configuração da coluna de ações para usuário comum (só visualizar)
  const userActionsConfig: ActionsColumnConfig<UserData> = {
    enabled: true,
    header: "Ações",
    width: "150px",
    permissions: {
      canView: true,
      canEdit: false,
      canDelete: false,
      canCreate: false,
    },
    view: {
      enabled: true,
      onClick: (item) => {
        alert(`Visualizar usuário: ${item.name}`);
        console.log("Ver item:", item);
      },
    },
  };

  // Configuração da coluna de ações para usuário sem permissões
  const noPermissionsActionsConfig: ActionsColumnConfig<UserData> = {
    enabled: true,
    header: "Ações",
    width: "150px",
    permissions: {
      canView: false,
      canEdit: false,
      canDelete: false,
      canCreate: false,
    },
  };

  const handleDelete = (id: number | string) => {
    console.log("Deletar usuário:", id);
  };

  // Configurações diferentes do botão criar para cada contexto
  const createUserButton: CreateButtonConfig = {
    text: "Criar novo usuário",
    onClick: () => {
      alert("Abrindo formulário para criar usuário!");
      console.log("Criar usuário");
    },
  };

  const createClientButton: CreateButtonConfig = {
    text: "Adicionar cliente",
    onClick: () => {
      alert("Abrindo formulário para adicionar cliente!");
      console.log("Criar cliente");
    },
  };

  const createDocumentButton: CreateButtonConfig = {
    text: "Novo documento",
    onClick: () => {
      alert("Abrindo formulário para criar documento!");
      console.log("Criar documento");
    },
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>
        Exemplo de Tabela com Colunas Predefinidas e Sistema de Permissões
      </h2>

      <h3>Administrador - Todas as Permissões (Ver, Editar, Deletar, Criar)</h3>
      <Table
        data={sampleData}
        columns={columns}
        onDelete={handleDelete}
        booleanColumn={booleanConfig}
        dateColumn={dateConfig}
        actionsColumn={adminActionsConfig}
        createButton={createUserButton}
        genericFilters={genericFiltersConfig}
        searchable={true}
        sortable={true}
        pagination={true}
        itemsPerPage={2}
      />

      <h3 style={{ marginTop: "3rem" }}>Contexto: Gerenciamento de Clientes</h3>
      <Table
        data={sampleData}
        columns={columns}
        onDelete={handleDelete}
        booleanColumn={booleanConfig}
        dateColumn={dateConfig}
        actionsColumn={adminActionsConfig}
        createButton={createClientButton}
        searchable={true}
        sortable={true}
        pagination={true}
        itemsPerPage={10}
      />

      <h3 style={{ marginTop: "3rem" }}>Contexto: Sistema de Documentos</h3>
      <Table
        data={sampleData}
        columns={columns}
        onDelete={handleDelete}
        booleanColumn={booleanConfig}
        dateColumn={dateConfig}
        actionsColumn={adminActionsConfig}
        createButton={createDocumentButton}
        searchable={true}
        sortable={true}
        pagination={true}
        itemsPerPage={10}
      />

      <h3 style={{ marginTop: "3rem" }}>Usuário Comum - Apenas Visualizar</h3>
      <Table
        data={sampleData}
        columns={columns}
        onDelete={handleDelete}
        booleanColumn={booleanConfig}
        dateColumn={dateConfig}
        actionsColumn={userActionsConfig}
        searchable={true}
        sortable={true}
        pagination={true}
        itemsPerPage={10}
      />

      <h3 style={{ marginTop: "3rem" }}>
        Exemplo com Coluna Booleana Baseada em Status (Publicado/Não Publicado)
      </h3>
      <p>
        Este exemplo mostra uma coluna booleana que avalia o campo 'status' em
        vez de 'isActive'.
      </p>
      <Table
        data={sampleData}
        columns={columns}
        onDelete={handleDelete}
        booleanColumn={statusBooleanConfig}
        dateColumn={dateConfig}
        actionsColumn={userActionsConfig}
        searchable={true}
        sortable={true}
        pagination={true}
        itemsPerPage={10}
      />

      <h3 style={{ marginTop: "3rem" }}>Exemplo sem Coluna Booleana</h3>
      <p>
        Este exemplo mostra a tabela sem nenhuma coluna de ícones (check/X).
      </p>
      <Table
        data={sampleData}
        columns={columns}
        onDelete={handleDelete}
        booleanColumn={noBooleanConfig}
        dateColumn={dateConfig}
        actionsColumn={userActionsConfig}
        searchable={true}
        sortable={true}
        pagination={true}
        itemsPerPage={10}
      />

      <h3 style={{ marginTop: "3rem" }}>
        Usuário Sem Permissões - Coluna de Ações Não Aparece
      </h3>
      <Table
        data={sampleData}
        columns={columns}
        onDelete={handleDelete}
        booleanColumn={booleanConfig}
        dateColumn={dateConfig}
        actionsColumn={noPermissionsActionsConfig}
        searchable={true}
        sortable={true}
        pagination={true}
        itemsPerPage={10}
      />

      <h3 style={{ marginTop: "3rem" }}>
        Exemplo com Uma Coluna de Data (apenas criação)
      </h3>
      <Table
        data={sampleData}
        columns={columns}
        onDelete={handleDelete}
        actionsColumn={{
          enabled: true,
          permissions: {
            canView: false,
            canEdit: true,
            canDelete: true,
            canCreate: true,
          },
          edit: {
            onClick: (item) => alert(`Editar: ${item.name}`),
          },
          delete: {
            onClick: (item) => alert(`Deletar: ${item.name}`),
          },
        }}
        createButton={{
          text: "Novo registro",
          onClick: () => alert("Criar novo registro!"),
        }}
        dateColumn={{
          enabled: true,
          header: "Criado em",
          dateField: "createdAt",
          width: "120px",
          sortable: true,
        }}
        searchable={true}
        sortable={true}
        pagination={true}
        itemsPerPage={10}
      />

      <h3 style={{ marginTop: "3rem" }}>
        Exemplo com Callbacks para Backend (Filtros e Ordenação)
      </h3>
      <p>
        Este exemplo usa callbacks - verifique o console para ver os valores
        enviados para o backend.
      </p>
      <Table
        data={sampleData}
        columns={columns}
        onDelete={handleDelete}
        booleanColumn={booleanConfig}
        dateColumn={dateConfig}
        actionsColumn={adminActionsConfig}
        createButton={createUserButton}
        genericFilters={genericFiltersConfig}
        searchable={true}
        sortable={true}
        pagination={true}
        itemsPerPage={5}
        onDateFilter={handleDateFilter}
        onSearchFilter={handleSearchFilter}
        onSort={handleSort}
        onGenericFilter={handleGenericFilter}
      />

      <h3 style={{ marginTop: "3rem" }}>
        Exemplo com Filtros Genéricos Personalizados
      </h3>
      <p>
        Este exemplo mostra filtros genéricos customizados funcionando
        localmente.
      </p>
      <Table
        data={sampleData}
        columns={columns}
        onDelete={handleDelete}
        dateColumn={dateConfig}
        actionsColumn={adminActionsConfig}
        createButton={createUserButton}
        genericFilters={[
          {
            enabled: true,
            label: "Função (Multi)",
            column: "role",
            options: ["Admin", "User", "Moderator"],
            width: "160px",
            multiple: true, // Multi-seleção
          },
          {
            enabled: true,
            label: "Estado",
            column: "status",
            options: ["active", "inactive"],
            width: "120px",
          },
        ]}
        searchable={true}
        sortable={true}
        pagination={true}
        itemsPerPage={10}
      />

      <h3 style={{ marginTop: "3rem" }}>Exemplo com Tabela Vazia</h3>
      <p>Este exemplo mostra como a tabela se comporta quando não há dados.</p>
      <Table
        data={[]}
        columns={columns}
        onDelete={handleDelete}
        dateColumn={dateConfig}
        actionsColumn={adminActionsConfig}
        createButton={createUserButton}
        genericFilters={genericFiltersConfig}
        searchable={true}
        sortable={true}
        pagination={true}
        itemsPerPage={10}
      />

      <h3 style={{ marginTop: "3rem" }}>
        Exemplo com Dados Filtrados que Retornam Vazio
      </h3>
      <p>
        Este exemplo simula quando há dados, mas a busca/filtros não encontram
        nada. Tente buscar por "xyz" ou filtrar por algo que não existe.
      </p>
      <Table
        data={sampleData}
        columns={columns}
        onDelete={handleDelete}
        dateColumn={dateConfig}
        actionsColumn={adminActionsConfig}
        createButton={createUserButton}
        genericFilters={[
          {
            enabled: true,
            label: "Status Inexistente",
            column: "status",
            options: ["pending", "blocked", "suspended"],
            width: "150px",
          },
          {
            enabled: true,
            label: "Cargo Inexistente",
            column: "role",
            options: ["SuperAdmin", "Guest", "Visitor"],
            width: "160px",
            multiple: true,
          },
        ]}
        searchable={true}
        sortable={true}
        pagination={true}
        itemsPerPage={10}
      />

      <h3 style={{ marginTop: "3rem" }}>Exemplo com Skeleton Loading</h3>
      <p>
        Este exemplo mostra o skeleton loading moderno com shimmer effect
        enquanto carrega os dados.
      </p>
      <Table
        data={sampleData}
        columns={columns}
        onDelete={handleDelete}
        loading={true}
        dateColumn={dateConfig}
        actionsColumn={adminActionsConfig}
        createButton={createUserButton}
        genericFilters={genericFiltersConfig}
        searchable={true}
        sortable={true}
        pagination={true}
        itemsPerPage={10}
      />

      <h3 style={{ marginTop: "3rem" }}>
        Exemplo com Dados Corrompidos/Problemáticos
      </h3>
      <p>
        Este exemplo mostra como a tabela lida com dados mal formados, campos
        nulos, etc.
      </p>
      <Table
        data={corruptedData as UserData[]}
        columns={columns}
        onDelete={handleDelete}
        dateColumn={dateConfig}
        actionsColumn={adminActionsConfig}
        createButton={createUserButton}
        genericFilters={genericFiltersConfig}
        searchable={true}
        sortable={true}
        pagination={true}
        itemsPerPage={10}
      />

      <h3 style={{ marginTop: "3rem" }}>Exemplo com Estilos Customizados</h3>
      <p>
        Este exemplo mostra como personalizar completamente a aparência da
        tabela com estilos customizados.
      </p>
      <Table
        data={sampleData}
        columns={columns}
        onDelete={handleDelete}
        loading={false}
        booleanColumn={booleanConfig}
        dateColumn={dateConfig}
        actionsColumn={adminActionsConfig}
        genericFilters={genericFiltersConfig}
        searchable={true}
        sortable={true}
        pagination={true}
        itemsPerPage={5}
        customStyles={customStyles}
      />

      <div style={{ marginTop: "2rem" }}>
        <h3>Explicação das Funcionalidades:</h3>
        <ul>
          <li>
            <strong>Estados de Dados:</strong>
            <ul>
              <li>
                <strong>Dados Normais:</strong> Exibe a tabela com todos os
                dados e funcionalidades
              </li>
              <li>
                <strong>Tabela Vazia:</strong> Quando <code>data=[]</code>,
                mostra "Nenhuma informação foi encontrada!" centralizado
              </li>
              <li>
                <strong>Filtros sem Resultado:</strong> Quando há dados, mas
                filtros/busca retornam array vazio, mostra a mesma mensagem
              </li>
              <li>
                <strong>Estado de Loading:</strong> Quando{" "}
                <code>loading=true</code>, exibe skeleton loading moderno com
                shimmer effect que simula a estrutura da tabela
              </li>
              <li>
                <strong>Dados Corrompidos:</strong> A tabela é robusta e lida
                com campos nulos, undefined, tipos errados
              </li>
            </ul>
          </li>
          <li>
            <strong>Customização de Estilos:</strong>
            <ul>
              <li>
                <strong>Estilos Completos:</strong> Pode customizar qualquer
                parte da tabela (container, filtros, cabeçalhos, células,
                paginação)
              </li>
              <li>
                <strong>CSS Properties:</strong> Aceita objetos de estilo
                React.CSSProperties
              </li>
              <li>
                <strong>Sobrescrita Total:</strong> Os estilos customizados
                sobrescrevem os estilos padrão
              </li>
              <li>
                <strong>Flexibilidade:</strong> Permite criar temas
                personalizados mantendo a funcionalidade
              </li>
            </ul>
          </li>
          <li>
            <strong>Coluna Booleana (Check/X):</strong> Aparece primeiro (à
            esquerda). Mostra ✓ (check verde) quando o campo tem o valor
            configurado como `checkValue` e ✗ (X vermelho) quando tem o valor
            `xValue`. Pode ser ordenada clicando na seta. Completamente
            configurável - pode avaliar qualquer campo com qualquer valor.
          </li>
          <li>
            <strong>Coluna de Data:</strong>
            <ul>
              <li>
                Se configurada apenas com <code>dateField</code>: cria uma
                coluna com a data
              </li>
              <li>
                Se configurada com <code>startDateField</code> e{" "}
                <code>endDateField</code>: cria duas colunas separadas (Data
                Inicial e Data Final)
              </li>
              <li>
                Datas expiradas: mostram "expirou" em vermelho na coluna Data
                Final
              </li>
              <li>
                Sem data final: mostra "sem data final" em vermelho na coluna
                Data Final
              </li>
              <li>
                Todas as colunas de data podem ser ordenadas clicando na seta
              </li>
            </ul>
          </li>
          <li>
            <strong>Sistema de Filtros:</strong>
            <ul>
              <li>
                <strong>Filtro Local:</strong> Se não houver callbacks{" "}
                <code>onDateFilter</code>, <code>onSearchFilter</code> ou{" "}
                <code>onGenericFilter</code>, filtra os dados localmente
              </li>
              <li>
                <strong>Filtro Backend:</strong> Se houver callbacks, envia os
                parâmetros para o backend via função callback
              </li>
              <li>
                <strong>Filtro de Data:</strong> Suporta campos únicos ou ranges
                de data (início/fim)
              </li>
              <li>
                <strong>Filtros Genéricos:</strong> Sistema de filtros
                customizáveis que pode filtrar qualquer coluna com lista de
                opções
              </li>
              <li>
                <strong>Botão Filtrar:</strong> Executa os filtros quando
                configurados callbacks
              </li>
            </ul>
          </li>
          <li>
            <strong>Filtros Genéricos Customizáveis:</strong>
            <ul>
              <li>
                <strong>Múltiplos Filtros:</strong> Pode ter vários filtros
                genéricos ao mesmo tempo
              </li>
              <li>
                <strong>Label Customizado:</strong> Cada filtro tem seu próprio
                rótulo (ex: "Cargo", "Categoria", "Tipo")
              </li>
              <li>
                <strong>Coluna Target:</strong> Aponta para qualquer coluna da
                tabela
              </li>
              <li>
                <strong>Opções Customizadas:</strong> Lista de opções
                completamente personalizável
              </li>
              <li>
                <strong>Largura Ajustável:</strong> Cada filtro pode ter sua
                própria largura
              </li>
              <li>
                <strong>Suporte Arrays:</strong> Funciona com campos array (como{" "}
                <code>role: ['Admin']</code>) e strings simples
              </li>
              <li>
                <strong>"Todos" Automático:</strong> Opção "Todos" é adicionada
                automaticamente
              </li>
            </ul>
          </li>
          <li>
            <strong>Sistema de Ordenação:</strong>
            <ul>
              <li>
                <strong>Ordenação Local:</strong> Se não houver callback{" "}
                <code>onSort</code>, ordena os dados localmente
              </li>
              <li>
                <strong>Ordenação Backend:</strong> Se houver callback, envia a
                chave e direção para o backend
              </li>
              <li>
                <strong>Colunas Predefinidas:</strong> Status e datas também
                podem ser ordenadas
              </li>
              <li>
                <strong>Clique na Seta:</strong> Alterna entre ASC → DESC → ASC
              </li>
            </ul>
          </li>
          <li>
            <strong>Coluna de Ações com Permissões:</strong>
            <ul>
              <li>
                <strong>permissions.canView:</strong> Controla se o botão Ver
                (👁️) aparece
              </li>
              <li>
                <strong>permissions.canEdit:</strong> Controla se o botão Editar
                (✏️) aparece
              </li>
              <li>
                <strong>permissions.canDelete:</strong> Controla se o botão
                Deletar (🗑️) aparece
              </li>
              <li>
                <strong>permissions.canCreate:</strong> Controla se o botão de
                criar aparece
              </li>
              <li>
                <strong>Coluna Oculta:</strong> Se nenhuma permissão for
                verdadeira, a coluna inteira desaparece
              </li>
              <li>Ícones alinhados horizontalmente lado a lado</li>
            </ul>
          </li>
          <li>
            <strong>Botão de Criar Customizável:</strong>
            <ul>
              <li>
                <strong>Ícone Fixo:</strong> Sempre usa o ícone CirclePlus
              </li>
              <li>
                <strong>Texto Personalizável:</strong> Pode ser "Criar novo
                usuário", "Adicionar cliente", "Novo documento", etc.
              </li>
              <li>
                <strong>Ação Customizada:</strong> Cada contexto pode ter sua
                própria função onClick
              </li>
              <li>
                <strong>Posicionamento:</strong> Sempre fora da tabela, acima
                dela, com recuo de 0.5rem
              </li>
              <li>
                <strong>Estilo:</strong> Verde fixo com hover mais escuro
              </li>
            </ul>
          </li>
          <li>
            <strong>Sistema de Permissões:</strong> Baseado no usuário logado,
            as ações podem ser habilitadas/desabilitadas dinamicamente.
          </li>
          <li>
            <strong>Integração Frontend/Backend:</strong>
            <ul>
              <li>
                <strong>Modo Local:</strong> Sem callbacks - todos os filtros e
                ordenação acontecem no frontend
              </li>
              <li>
                <strong>Modo Backend:</strong> Com callbacks - envia parâmetros
                para o backend e espera dados já filtrados/ordenados
              </li>
              <li>
                <strong>Híbrido:</strong> Pode combinar - ex: filtro no backend,
                ordenação local
              </li>
              <li>
                <strong>Filtros Genéricos Backend:</strong>{" "}
                <code>onGenericFilter</code> recebe objeto com chave=coluna,
                valor=filtro selecionado
              </li>
            </ul>
          </li>
          <li>
            <strong>Exemplos de Uso dos Filtros Genéricos:</strong>
            <ul>
              <li>
                <strong>Cargo/Role:</strong>{" "}
                <code>
                  column: 'role', options: ['Admin', 'User', 'Moderator']
                </code>
              </li>
              <li>
                <strong>Status:</strong>{" "}
                <code>column: 'status', options: ['active', 'inactive']</code>
              </li>
              <li>
                <strong>Categoria:</strong>{" "}
                <code>column: 'category', options: ['A', 'B', 'C']</code>
              </li>
              <li>
                <strong>Prioridade:</strong>{" "}
                <code>
                  column: 'priority', options: ['Alta', 'Média', 'Baixa']
                </code>
              </li>
            </ul>
          </li>
        </ul>

        <h3 style={{ marginTop: "2rem", color: "#1e293b" }}>
          📋 Guia Rápido de Implementação:
        </h3>

        <h4 style={{ color: "#374151" }}>
          1. Implementação Básica (5 minutos):
        </h4>
        <pre
          style={{
            backgroundColor: "#f8fafc",
            padding: "1rem",
            borderRadius: "8px",
            fontSize: "0.875rem",
            overflowX: "auto",
          }}
        >
          {`// 1. Importar
import Table from './Components/Table/Table';
import { TableColumn } from './types/tableTypes';

// 2. Definir colunas
const columns: TableColumn<MeuTipo>[] = [
  { key: 'nome', header: 'Nome', sortable: true },
  { key: 'email', header: 'E-mail', sortable: true }
];

// 3. Usar
<Table
  data={meusDados}
  columns={columns}
  onDelete={(id) => deletarItem(id)}
/>`}
        </pre>

        <h4 style={{ color: "#374151" }}>
          2. Com Funcionalidades Avançadas (10 minutos):
        </h4>
        <pre
          style={{
            backgroundColor: "#f8fafc",
            padding: "1rem",
            borderRadius: "8px",
            fontSize: "0.875rem",
            overflowX: "auto",
          }}
        >
          {`<Table
  data={dados}
  columns={colunas}
  loading={carregando}
  
  // Colunas predefinidas
  statusColumn={{ enabled: true, checkConditions: ['ativo'] }}
  dateColumn={{ enabled: true, dateField: 'criadoEm' }}
  actionsColumn={{
    enabled: true,
    permissions: { canView: true, canEdit: true, canDelete: true },
    view: { onClick: (item) => verItem(item) }
  }}
  
  // Filtros
  genericFilters={[
    { enabled: true, label: 'Cargo', column: 'cargo', options: ['Admin', 'User'] }
  ]}
  
  // Funcionalidades
  searchable={true}
  sortable={true}
  pagination={true}
  itemsPerPage={10}
  
  onDelete={(id) => deletarItem(id)}
/>`}
        </pre>

        <h4 style={{ color: "#374151" }}>
          3. Com Integração Backend (15 minutos):
        </h4>
        <pre
          style={{
            backgroundColor: "#f8fafc",
            padding: "1rem",
            borderRadius: "8px",
            fontSize: "0.875rem",
            overflowX: "auto",
          }}
        >
          {`// Callbacks para backend
const handleFiltroData = (inicio, fim) => api.filtrarPorData(inicio, fim);
const handleBusca = (termo) => api.buscar(termo);
const handleOrdenacao = (campo, direcao) => api.ordenar(campo, direcao);
const handleFiltrosGenericos = (filtros) => api.filtrar(filtros);

<Table
  // ... outras props
  onDateFilter={handleFiltroData}
  onSearchFilter={handleBusca}
  onSort={handleOrdenacao}
  onGenericFilter={handleFiltrosGenericos}
/>`}
        </pre>

        <h4 style={{ color: "#374151" }}>
          4. Com Estilos Customizados (20 minutos):
        </h4>
        <pre
          style={{
            backgroundColor: "#f8fafc",
            padding: "1rem",
            borderRadius: "8px",
            fontSize: "0.875rem",
            overflowX: "auto",
          }}
        >
          {`const estilosCustomizados: TableCustomStyles = {
  container: { borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' },
  filtersContainer: { backgroundColor: '#f8fafc', padding: '2rem' },
  header: { backgroundColor: '#3b82f6', color: 'white', fontWeight: '700' },
  cell: { padding: '1rem', fontSize: '0.875rem' },
  paginationContainer: { backgroundColor: '#f9fafb' }
};

<Table customStyles={estilosCustomizados} ... />`}
        </pre>

        <h3 style={{ marginTop: "2rem", color: "#1e293b" }}>
          🔧 Dicas de Troubleshooting:
        </h3>
        <ul style={{ fontSize: "0.875rem", lineHeight: "1.6" }}>
          <li>
            <strong>TypeScript Errors:</strong> Certifique-se de que o tipo{" "}
            <code>T</code> está correto nas configurações
          </li>
          <li>
            <strong>Filtros não funcionam:</strong> Verifique se os campos{" "}
            <code>column</code> existem nos dados
          </li>
          <li>
            <strong>Ordenação quebrada:</strong> Verifique se o campo existe e
            tem valor válido
          </li>
          <li>
            <strong>Estilo não aplica:</strong> Use <code>!important</code> se
            necessário, ou verifique a especificidade CSS
          </li>
          <li>
            <strong>Performance lenta:</strong> Use callbacks para backend em
            listas grandes (+ 1000 itens)
          </li>
        </ul>
      </div>

      <div className="example-section">
        <h2>📊 Exemplo: Múltiplas Colunas Booleanas</h2>
        <p>Demonstra como usar múltiplas colunas com ✓ e ✗ na mesma tabela:</p>

        <div className="code-block">
          <pre>
            <code>{`
// Configuração de múltiplas colunas booleanas
const multipleBooleanColumns: BooleanColumnConfig<UserData>[] = [
  {
    enabled: true,
    header: 'Ativo',
    field: 'isActive',
    checkValue: true,
    xValue: false,
    width: '80px',
    sortable: true
  },
  {
    enabled: true,
    header: 'Verificado',
    field: 'isVerified',
    checkValue: true,
    xValue: false,
    width: '90px',
    sortable: true
  },
  {
    enabled: true,
    header: 'Premium',
    field: 'isPremium',
    checkValue: true,
    xValue: false,
    width: '80px',
    sortable: true
  }
];

// Uso da tabela com múltiplas colunas booleanas
<Table
  data={userData}
  columns={baseColumns}
  onDelete={handleDelete}
  booleanColumns={multipleBooleanColumns} // Array de configurações
  actionsColumn={actionsConfig}
  searchable={true}
  sortable={true}
  pagination={true}
  itemsPerPage={10}
/>

// Estrutura de dados esperada:
interface UserData {
  id: number;
  name: string;
  email: string;
  isActive: boolean;    // Para coluna "Ativo"
  isVerified: boolean;  // Para coluna "Verificado"  
  isPremium: boolean;   // Para coluna "Premium"
}
          `}</code>
          </pre>
        </div>

        <p>
          <strong>Resultado:</strong> Tabela com 3 colunas booleanas à esquerda
          mostrando status de Ativo, Verificado e Premium.
        </p>

        <div className="note">
          <h4>💡 Dicas para Múltiplas Colunas Booleanas:</h4>
          <ul>
            <li>
              <strong>Ordem:</strong> As colunas booleanas aparecem na ordem do
              array, antes das colunas normais
            </li>
            <li>
              <strong>Compatibilidade:</strong> Pode usar{" "}
              <code>booleanColumn</code> (única) junto com{" "}
              <code>booleanColumns</code> (múltiplas)
            </li>
            <li>
              <strong>Performance:</strong> Cada coluna é renderizada
              independentemente
            </li>
            <li>
              <strong>Personalização:</strong> Cada coluna pode ter checkValue,
              xValue e width específicos
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TableExample;
