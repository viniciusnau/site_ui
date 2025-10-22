# Documentação - Componente Table

## 📋 Visão Geral

O **Table** é um componente React avançado para exibição de dados tabulares com funcionalidades completas de filtros, ordenação, paginação, ações e customização.

### ✨ **Principais Recursos:**
- 🗂️ **Colunas dinâmicas** com renderização customizada
- 🔍 **Sistema de filtros** integrado (texto, data, genéricos)
- ↕️ **Ordenação** por qualquer coluna
- 📄 **Paginação** automática
- ⚡ **Ações em linha** (visualizar, editar, excluir)
- ✅ **Colunas booleanas** (check/X)
- 📅 **Colunas de data** com formatação
- 💀 **Loading skeleton** animado
- 🎨 **Customização visual** completa

---

## 📥 Instalação e Importação

### **Dependências:**
```bash
npm install @mui/x-date-pickers date-fns lucide-react
```

### **Importação:**
```tsx
import Table from '../../../Components/Table/Table';
import type { 
  TableColumn, 
  BooleanColumnConfig, 
  DateColumnConfig, 
  ActionsColumnConfig,
  GenericFilterConfig,
  TableCustomStyles 
} from '../../../types/tableTypes';
```

---

## ⚙️ Props e Configurações

### **Props Essenciais:**

```typescript
interface TableProps<T> {
  // 📊 OBRIGATÓRIOS
  data: T[];                              // Seus dados
  columns: TableColumn<T>[];              // Como mostrar as colunas
  onDelete: (id: number | string) => void; // O que fazer ao excluir
  
  // ⚙️ OPCIONAIS BÁSICOS
  loading?: boolean;                      // true = mostra skeleton
  searchable?: boolean;                   // true = campo de busca
  sortable?: boolean;                     // true = ordenar por coluna
  pagination?: boolean;                   // true = páginas
  itemsPerPage?: number;                  // Quantos por página
  
  // 🎨 COLUNAS ESPECIAIS
  booleanColumn?: BooleanColumnConfig<T>;   // Coluna ✓/✗
  dateColumn?: DateColumnConfig<T>;         // Coluna de datas
  actionsColumn?: ActionsColumnConfig<T>;   // Botões (ver/editar/excluir) tem que ver a questão de permissões aqui, pra isso aparecer ou não, ou as opões de ver editar e excluir dentro
  
  // 🔍 FILTROS isso da pra ver melhor do doc de filters como funciona melhor
  genericFilters?: GenericFilterConfig<T>[]; // Dropdowns
  onSearchFilter?: (term: string) => void;  // Busca personalizada
  
  // 💄 VISUAL
  customStyles?: TableCustomStyles;       // Estilos personalizados
}
```

### **🚀 Como usar - 3 Exemplos Rápidos:**

#### **1. Básico:**
```tsx
const dados = [
  { id: 1, nome: "João", email: "joao@email.com" },
  { id: 2, nome: "Maria", email: "maria@email.com" }
];

const colunas = [
  { key: "nome", header: "Nome" },
  { key: "email", header: "E-mail" }
];

<Table 
  data={dados}
  columns={colunas}
  onDelete={(id) => console.log("Excluir", id)}
/>
```

#### **2. Com busca e páginas:**
```tsx
<Table 
  data={dados}
  columns={colunas}
  onDelete={excluir}
  searchable={true}     // Campo de busca
  pagination={true}     // Páginas
  itemsPerPage={5}      // 5 por página, escolhe ou monta uma logica, da pra depois colocar opção de paginação 
/>
```

#### **3. Com status e botões:**
```tsx
const statusConfig = {
  enabled: true,
  header: "Ativo?",
  field: "status",
  checkValue: "ativo",    // ✓
  xValue: "inativo"       // ✗
};

const botoesConfig = {
  enabled: true,
  permissions: { canView: true, canEdit: true, canDelete: true },
  view: { onClick: (item) => alert(`Ver ${item.nome}`) }
};

<Table 
  data={dados}
  columns={colunas}
  onDelete={excluir}
  booleanColumn={statusConfig}
  actionsColumn={botoesConfig}
/>
```

#### **4. Com datas e status de validade:**
```tsx
const dadosComDatas = [
  { 
    id: 1, 
    nome: "Contrato A", 
    createdAt: "2024-01-15", 
    startDate: "2024-01-15", 
    endDate: "2025-12-31",  // Válido
    status: "ativo" 
  },
  { 
    id: 2, 
    nome: "Contrato B", 
    createdAt: "2024-02-10", 
    startDate: "2024-02-10", 
    endDate: "2024-06-30",  // Expirado - aparece "INATIVO"
    status: "inativo" 
  },
  { 
    id: 3, 
    nome: "Contrato C", 
    createdAt: "2024-03-05", 
    // Sem data final
    status: "ativo" 
  }
];

const colunasComDatas = [
  { key: "nome", header: "Nome do Contrato" },
  { key: "status", header: "Status" }
];

const dataConfig = {
  enabled: true,
  header: "Vigência",
  dateField: "createdAt",     // Data principal
  startDateField: "startDate", // Data início
  endDateField: "endDate",    // Data fim (se expirada = "INATIVO")
  sortable: true
};

<Table 
  data={dadosComDatas}
  columns={colunasComDatas}
  onDelete={excluir}
  dateColumn={dataConfig}     // Mostra datas + status automático
  searchable={true}
/>
```

### **Configurações Rápidas:**

#### **Coluna de Status (✓/✗):**
```tsx
const statusConfig = {
  enabled: true,
  header: "Ativo?",
  field: "status",           // Campo que tem o status
  checkValue: "ativo",       // Valores que mostram ✓
  xValue: "inativo"          // Valores que mostram ✗
};
```

#### **Coluna de Data:**
```tsx
const dataConfig = {
  enabled: true,
  header: "Data",
  dateField: "createdAt",    // Campo que tem a data
  sortable: true             // Pode ordenar por data
};
```

#### **Botões de Ação:**
```tsx
const botoesConfig = {
  enabled: true,
  permissions: {
    canView: true,           // Pode ver
    canEdit: isAdmin,        // Só admin edita
    canDelete: isAdmin       // Só admin exclui
  },
  view: { onClick: (item) => verDetalhes(item) },
  edit: { onClick: (item) => editarItem(item) },
  delete: { confirmMessage: "Tem certeza?" }
};
```

#### **Filtros:**
```tsx
const filtros = [
  {
    enabled: true,
    label: "Cargo",
    column: "role",
    options: ["Admin", "User", "Moderator"],
    multiple: true           // Seleção múltipla
  }
];
```

---

## � Estados Básicos

```tsx
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);

// Excluir
const handleDelete = (id) => {
  setUsers(prev => prev.filter(user => user.id !== id));
};

// Ver detalhes
const handleView = (user) => {
  alert(`Vendo: ${user.nome}`);
};

// Editar
const handleEdit = (user) => {
  alert(`Editando: ${user.nome}`);
};
```

---

## 🎨 Customização Visual

```tsx
const estilosCustomizados = {
  header: { 
    backgroundColor: "#4f46e5", 
    color: "white" 
  },
  row: { 
    "&:hover": { backgroundColor: "#f3f4f6" } 
  },
  actionButton: {
    borderRadius: "8px",
    padding: "8px"
  }
};

<Table 
  customStyles={estilosCustomizados} //ou passa o style de onde tu vai usar a table mesmo 
  // ... outras props
/>
```

---

## � Checklist Rápido

- [ ] Importar componente Table
- [ ] Definir seus dados (`data`)
- [ ] Configurar colunas (`columns`)
- [ ] Implementar `onDelete`
- [ ] Adicionar funcionalidades opcionais (busca, paginação)
- [ ] Configurar colunas especiais (se precisar)
- [ ] Testar responsividade
- [ ] Customizar visual (se quiser)

---

