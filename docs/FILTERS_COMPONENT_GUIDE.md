# Documentação - Componente Filters

## 📋 Visão Geral

O **Filters** é um componente React para filtros avançados de tabelas, incluindo busca por texto, seleção de datas, filtros genéricos e controle de status.
Tem varias opções pre determinadas que podem ser configuradas de diferentes formas dependendo de onde forem importadas.

### ✨ **Principais Recursos:**
- 🔍 **Busca por texto** com campo dedicado
- 📅 **Filtros de data** (desde/até) com DatePicker
- 🎯 **Filtros genéricos** customizáveis com MultiSelect, podendo ser uma os varias opções, ve no multiset mais sobre
- 🎛️ **Filtros de status** (ativo/inativo/todos)
- 🧹 **Limpeza individual** e geral de filtros uma lixeiriha do lado da label do filtro pra limpar e um potao que limpa tudo
- 🎨 **Customização visual** completa

---

## 📥 Instalação e Importação

### **Dependências:**
```bash
npm install @mui/x-date-pickers date-fns lucide-react
```

### **Importação:**
```tsx
import Filters from '../../../Components/Table/Filters/Filters';
import type { GenericFilter, StatusFilter } from '../../../Components/Table/Filters/Filters';
```

---

## ⚙️ Props e Configurações

### **Interface Principal:**

```typescript
interface FiltersProps<T = any> {
  // Busca por texto
  searchable?: boolean;                    // Habilita/desabilita campo de busca (padrão: true)
  searchTerm: string;                      // Valor atual da busca
  onSearchTermChange: (value: string) => void; // Callback quando busca muda
  
  // Filtros de data
  dateFrom: Date | null;                   // Data inicial do filtro
  onDateFromChange: (date: Date | null) => void; // Callback para data inicial
  dateTo: Date | null;                     // Data final do filtro  
  onDateToChange: (date: Date | null) => void;   // Callback para data final
  
  // Filtros genéricos
  genericFiltersState: Record<string, string | string[]>; // Estado dos filtros aplicados
  onGenericFiltersChange: (filters: Record<string, string | string[]>) => void; // Callback para mudanças
  genericFilters?: GenericFilter<T>[];     // Configuração dos filtros disponíveis
  
  // Filtro de status  
  statusFilter?: StatusFilter<T>;          // Configuração do filtro de status especial
  
  // Controles
  onFilter: () => void;                    // Função chamada ao clicar "Filtrar"
  onClearFilters: () => void;              // Função chamada ao clicar "Limpar"
  tableId: string;                         // ID único para identificar a tabela
  
  // Customização
  customStyles?: CustomStyles;             // Estilos CSS personalizados
}
```

### **Detalhamento das Props:**

| Prop | Tipo | Obrigatório | Descrição | Exemplo |
|------|------|-------------|-----------|---------|
| `searchable` | `boolean` | ❌ | Controla se o campo de busca aparece | `true` (padrão) |
| `searchTerm` | `string` | ✅ | Texto atual da busca | `"João Silva"` |
| `onSearchTermChange` | `function` | ✅ | Callback executado quando usuário digita | `(value) => setSearch(value)` |
| `dateFrom` | `Date \| null` | ✅ | Data de início do período | `new Date('2024-01-01')` |
| `onDateFromChange` | `function` | ✅ | Callback para mudança da data inicial | `(date) => setDateFrom(date)` |
| `dateTo` | `Date \| null` | ✅ | Data de fim do período | `new Date('2024-12-31')` |
| `onDateToChange` | `function` | ✅ | Callback para mudança da data final | `(date) => setDateTo(date)` |
| `genericFiltersState` | `Record<string, string \| string[]>` | ✅ | Estado atual dos filtros genéricos | `{ role: ['Admin'], status: 'active' }` |
| `onGenericFiltersChange` | `function` | ✅ | Callback para mudanças nos filtros genéricos | `(filters) => setFilters(filters)` |
| `genericFilters` | `GenericFilter<T>[]` | ❌ | Array de configurações de filtros | Ver exemplos abaixo |
| `statusFilter` | `StatusFilter<T>` | ❌ | Configuração do filtro de status | Ver exemplos abaixo |
| `onFilter` | `function` | ✅ | Executada ao clicar botão "Filtrar" | `() => applyFilters()` |
| `onClearFilters` | `function` | ✅ | Executada ao clicar botão "Limpar" | `() => clearAllFilters()` |
| `tableId` | `string` | ✅ | Identificador único da tabela | `"users-table"` |
| `customStyles` | `CustomStyles` | ❌ | Objeto com estilos CSS customizados | Ver seção de customização |

### **Tipos de Filtros:**

#### **1. GenericFilter - Filtros Customizáveis**
```typescript
interface GenericFilter<T = any> {
  column: string | keyof T;     // Campo da tabela que será filtrado
  label: string;                // Nome exibido do filtro (ex: "Cargo", "Departamento")
  options: string[];            // Lista de opções disponíveis para seleção
  multiple?: boolean;           // Permite seleção múltipla (padrão: false)
  enabled: boolean;             // Se o filtro está ativo/visível
  width?: string;               // Largura do componente (ex: "200px", "15rem")
}
```

**Exemplos de GenericFilter:**
```tsx
// Filtro simples (seleção única)
const departmentFilter: GenericFilter<User> = {
  column: 'department',
  label: 'Departamento',
  options: ['TI', 'RH', 'Financeiro', 'Marketing'],
  multiple: false,        // Só permite uma seleção
  enabled: true,
  width: '180px'
};

// Filtro múltiplo (várias seleções)
const roleFilter: GenericFilter<User> = {
  column: 'role',
  label: 'Cargo',
  options: ['Admin', 'User', 'Moderator', 'Guest'],
  multiple: true,         // Permite múltiplas seleções
  enabled: true,
  width: '220px'
};

// Filtro com muitas opções
const cityFilter: GenericFilter<User> = {
  column: 'city',
  label: 'Cidade',
  options: [
    'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 
    'Salvador', 'Brasília', 'Fortaleza', 'Curitiba'
  ],
  multiple: true,
  enabled: true,
  width: '250px'
};
```

#### **2. StatusFilter - Filtro de Status Especial**
```typescript
interface StatusFilter<T = any> {
  enabled: boolean;             // Se o filtro está ativo
  label?: string;               // Nome do filtro (padrão: "Status")
  column: keyof T | string;     // Campo que contém o status
  activeValues: string[];       // Valores considerados "ativos"
  inactiveValues: string[];     // Valores considerados "inativos"
  activeLabel?: string;         // Texto para opção "ativos" (padrão: "Ativos")
  inactiveLabel?: string;       // Texto para opção "inativos" (padrão: "Inativos")
  allLabel?: string;            // Texto para opção "todos" (padrão: "Todos")
  width?: string;               // Largura do componente
}
```

**Exemplos de StatusFilter:**
```tsx
// Status simples (ativo/inativo)
const userStatusFilter: StatusFilter<User> = {
  enabled: true,
  label: 'Status do Usuário',
  column: 'status',
  activeValues: ['active', 'enabled'],     // Considera ativo se for 'active' ou 'enabled'
  inactiveValues: ['inactive', 'disabled'], // Considera inativo se for 'inactive' ou 'disabled'
  activeLabel: 'Usuários Ativos',
  inactiveLabel: 'Usuários Inativos',
  allLabel: 'Todos os Usuários',
  width: '200px'
};

// Status de pedidos
const orderStatusFilter: StatusFilter<Order> = {
  enabled: true,
  label: 'Status do Pedido',
  column: 'orderStatus',
  activeValues: ['completed', 'delivered', 'shipped'], // Pedidos "positivos"
  inactiveValues: ['cancelled', 'refunded', 'failed'], // Pedidos "negativos"
  activeLabel: 'Pedidos Concluídos',
  inactiveLabel: 'Pedidos Cancelados',
  allLabel: 'Todos os Pedidos'
};

// Status de aprovação
const approvalStatusFilter: StatusFilter<Document> = {
  enabled: true,
  column: 'approvalStatus',
  activeValues: ['approved', 'published'],
  inactiveValues: ['rejected', 'draft', 'pending'],
  activeLabel: 'Aprovados',
  inactiveLabel: 'Não Aprovados',
  allLabel: 'Todos'
};
```

#### **3. Como o Estado dos Filtros Funciona:**

```tsx
// Estado dos filtros genéricos
const [genericFiltersState, setGenericFiltersState] = useState<Record<string, string | string[]>>({
  // Exemplos de como os valores ficam armazenados:
  'role': ['Admin', 'User'],           // Array para seleção múltipla
  'department': 'TI',                  // String para seleção única
  'city': ['São Paulo', 'Rio de Janeiro'], // Array para múltiplas cidades
  'status': 'active'                   // String para status específico
});

// Quando usuário seleciona filtros:
// 1. Se multiple: true  → valor vira array: ['option1', 'option2']
// 2. Se multiple: false → valor vira string: 'option1'
// 3. Se nada selecionado → valor vira '' (string vazia) ou [] (array vazio)
```

---

## 🚀 Exemplos de Uso

### **Exemplo 1: Configuração Básica**

```tsx
const [searchTerm, setSearchTerm] = useState('');
const [dateFrom, setDateFrom] = useState<Date | null>(null);
const [dateTo, setDateTo] = useState<Date | null>(null);
const [genericFilters, setGenericFilters] = useState({});

const genericFiltersConfig: GenericFilter<User>[] = [
  {
    enabled: true,
    column: 'role',
    label: 'Cargo',
    options: ['Admin', 'User', 'Moderator'],
    multiple: true,
    width: '200px'
  },
  {
    enabled: true,
    column: 'department',
    label: 'Departamento',
    options: ['TI', 'RH', 'Financeiro'],
    multiple: false,
    width: '180px'
  }
];

<Filters
  searchTerm={searchTerm}
  onSearchTermChange={setSearchTerm}
  dateFrom={dateFrom}
  onDateFromChange={setDateFrom}
  dateTo={dateTo}
  onDateToChange={setDateTo}
  genericFiltersState={genericFilters}
  onGenericFiltersChange={setGenericFilters}
  genericFilters={genericFiltersConfig}
  onFilter={handleFilter}
  onClearFilters={handleClearFilters}
  tableId="users-table"
/>
```

### **Exemplo 2: Com Filtro de Status**

```tsx
const statusFilterConfig: StatusFilter<User> = {
  enabled: true,
  label: 'Status',
  column: 'status',
  activeValues: ['active'],
  inactiveValues: ['inactive'],
  activeLabel: 'Ativos',
  inactiveLabel: 'Inativos',
  allLabel: 'Todos',
  width: '150px'
};

<Filters
  // ... outras props
  statusFilter={statusFilterConfig}
/>
```

### **Exemplo 3: Customização Visual**

```tsx
const customStyles = {
  filtersContainer: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px'
  },
  filterButton: {
    backgroundColor: '#007bff',
    color: 'white'
  },
  clearButton: {
    backgroundColor: '#dc3545'
  }
};

<Filters
  // ... outras props
  customStyles={customStyles}
/>
```

---

## 🎛️ Funcionalidades Detalhadas

### **1. Busca por Texto**
- **Campo de input livre** para busca em qualquer texto
- **Limpeza individual** com ícone de lixeira ao lado do label
- **Placeholder configurável** (padrão: "Buscar...")
- **Máximo de 99 caracteres** para evitar consultas muito longas
- **Busca case-insensitive** (não diferencia maiúsculas/minúsculas)

```tsx
// Como a busca funciona internamente
const searchMatch = Object.values(item).some(value =>
  String(value).toLowerCase().includes(searchTerm.toLowerCase())
);
```

### **2. Filtros de Data**
- **DatePicker integrado com MUI** (@mui/x-date-pickers)
- **Localização em português brasileiro** automática
- **Formato DD/MM/AAAA** para entrada e exibição
- **Campos independentes**: "Desde" e "Até" funcionam separadamente
- **Limpeza individual** para cada campo com ícone de lixeira
- **Validação automática**: "Desde" não pode ser maior que "Até"

```tsx
// Exemplo de uso dos filtros de data
const filterByDate = (item: any) => {
  const itemDate = new Date(item.createdAt);
  
  // Se tem data "desde", verifica se item é posterior
  if (dateFrom && itemDate < dateFrom) return false;
  
  // Se tem data "até", verifica se item é anterior
  if (dateTo && itemDate > dateTo) return false;
  
  return true;
};
```

### **3. Filtros Genéricos (MultiSelect)**
- **Baseados no componente MultiSelect** (ver documentação específica)
- **Seleção única ou múltipla** conforme configuração
- **Busca integrada** dentro das opções disponíveis
- **"Selecionar Todos"** disponível para filtros múltiplos
- **Largura customizável** para cada filtro
- **Dropdown inteligente** que fecha ao clicar fora

```tsx
// Como funciona a seleção múltipla vs única
const handleGenericFilterChange = (column: string, value: string | string[]) => {
  setGenericFiltersState(prev => ({
    ...prev,
    [column]: value  // Pode ser string ou array dependendo de 'multiple'
  }));
};
```

### **4. Filtro de Status Especial**
- **Três opções fixas**: Ativos, Inativos, Todos
- **Configuração flexível** de quais valores são considerados ativos/inativos
- **Labels customizáveis** para cada opção
- **Lógica automática** para classificar itens

```tsx
// Como o filtro de status classifica itens
const getStatusCategory = (item: any, statusFilter: StatusFilter) => {
  const itemStatus = item[statusFilter.column];
  
  if (statusFilter.activeValues.includes(itemStatus)) return 'active';
  if (statusFilter.inactiveValues.includes(itemStatus)) return 'inactive';
  return 'unknown'; // Valores não mapeados
};
```

### **5. Controles de Ação**
- **Botão "Filtrar"**: 
  - Aplica todos os filtros configurados
  - Chama `onFilter()` que deve processar os dados
  - Fica desabilitado se não há filtros ativos
  - Visual destacado (cor primária)

- **Botão "Limpar"**: 
  - Remove TODOS os filtros de uma vez
  - Chama `onClearFilters()` para resetar estados
  - Fica desabilitado se não há filtros ativos
  - Visual secundário (cor neutra)

- **Limpeza Individual**:
  - Cada filtro tem seu próprio ícone de lixeira
  - Remove apenas aquele filtro específico
  - Atualiza automaticamente o estado

### **6. Responsividade Automática**
- **Layout flexível** que se adapta ao tamanho da tela
- **Wrap automático** dos filtros em telas menores
- **Tamanhos otimizados** para mobile e desktop
- **Touch-friendly** em dispositivos móveis

---

## 🔧 Handlers e Estados

### **Estados Necessários:**

```tsx
// Estados básicos
const [searchTerm, setSearchTerm] = useState('');
const [dateFrom, setDateFrom] = useState<Date | null>(null);
const [dateTo, setDateTo] = useState<Date | null>(null);
const [genericFilters, setGenericFilters] = useState<Record<string, string | string[]>>({});

// Handler para aplicar filtros
const handleFilter = () => {
  const filters = {
    search: searchTerm,
    dateFrom,
    dateTo,
    ...genericFilters
  };
  
  // Aplicar filtros aos dados
  const filteredData = applyFilters(originalData, filters);
  setFilteredData(filteredData);
};

// Handler para limpar filtros
const handleClearFilters = () => {
  setSearchTerm('');
  setDateFrom(null);
  setDateTo(null);
  setGenericFilters({});
  
  // Resetar dados
  setFilteredData(originalData);
};
```

### **Função de Filtro Exemplo:**

```tsx
const applyFilters = (data: User[], filters: any) => {
  return data.filter(item => {
    // Filtro de busca
    if (filters.search) {
      const searchMatch = Object.values(item)
        .some(value => 
          String(value).toLowerCase().includes(filters.search.toLowerCase())
        );
      if (!searchMatch) return false;
    }
    
    // Filtro de data
    if (filters.dateFrom) {
      const itemDate = new Date(item.createdAt);
      if (itemDate < filters.dateFrom) return false;
    }
    
    if (filters.dateTo) {
      const itemDate = new Date(item.createdAt);
      if (itemDate > filters.dateTo) return false;
    }
    
    // Filtros genéricos
    for (const [column, value] of Object.entries(filters)) {
      if (column !== 'search' && column !== 'dateFrom' && column !== 'dateTo' && value) {
        if (Array.isArray(value) && value.length > 0) {
          if (!value.includes(item[column as keyof User] as string)) {
            return false;
          }
        } else if (typeof value === 'string' && value !== '') {
          if (item[column as keyof User] !== value) {
            return false;
          }
        }
      }
    }
    
    return true;
  });
};
```

---

## 🎨 Customização

### **Estilos Customizáveis:**

```typescript
interface CustomStyles {
  filtersContainer?: React.CSSProperties;     // Container principal
  filtersRow?: React.CSSProperties;          // Linha de filtros
  filterGroup?: React.CSSProperties;         // Grupo individual
  filterLabel?: React.CSSProperties;         // Labels
  filterInput?: React.CSSProperties;         // Inputs
  filterButton?: React.CSSProperties;        // Botão filtrar
  clearButton?: React.CSSProperties;         // Botão limpar
  selectWrapper?: React.CSSProperties;       // Wrapper dos selects
  dropdown?: React.CSSProperties;            // Dropdowns
  dropdownOption?: React.CSSProperties;      // Opções dos dropdowns
}
```

### **Classes CSS Disponíveis:**

```css
.inputContainer { }          /* Container principal */
.filtersRow { }             /* Linha de filtros */
.filterGroup { }            /* Grupo de filtro */
.calenderContainer { }      /* Container do calendário */
.filterLabelContainer { }   /* Container do label */
.filterLabel { }            /* Label do filtro */
.filterTrashIcon { }        /* Ícone de lixeira */
.datePicker { }             /* DatePicker */
.searchInput { }            /* Input de busca */
.filterButton { }           /* Botão filtrar */
.clearButton { }            /* Botão limpar */
```

---

## 📊 Casos de Uso Comuns

### **1. Tabela de Usuários**

```tsx
const userFilters: GenericFilter<User>[] = [
  {
    enabled: true,
    column: 'role',
    label: 'Cargo',
    options: ['Admin', 'User', 'Moderator'],
    multiple: true
  },
  {
    enabled: true,
    column: 'status',
    label: 'Status',
    options: ['active', 'inactive'],
    multiple: false
  }
];
```

### **2. Tabela de Produtos**

```tsx
const productFilters: GenericFilter<Product>[] = [
  {
    enabled: true,
    column: 'category',
    label: 'Categoria',
    options: ['Eletrônicos', 'Roupas', 'Casa'],
    multiple: true
  },
  {
    enabled: true,
    column: 'brand',
    label: 'Marca',
    options: ['Samsung', 'Apple', 'Nike'],
    multiple: true
  }
];
```

### **3. Tabela com Status Customizado**

```tsx
const orderStatusFilter: StatusFilter<Order> = {
  enabled: true,
  column: 'status',
  activeValues: ['completed', 'shipped'],
  inactiveValues: ['cancelled', 'refunded'],
  activeLabel: 'Concluídos',
  inactiveLabel: 'Cancelados',
  allLabel: 'Todos os Pedidos'
};
```

---

## 🔄 Integração com Tabelas

### **Exemplo Completo:**

```tsx
function DataTable() {
  // Estados
  const [data, setData] = useState(originalData);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [genericFilters, setGenericFilters] = useState({});

  // Configuração dos filtros
  const filtersConfig: GenericFilter<DataType>[] = [
    {
      enabled: true,
      column: 'category',
      label: 'Categoria',
      options: getUniqueCategories(originalData),
      multiple: true
    }
  ];

  // Aplicar filtros
  const handleFilter = useCallback(() => {
    const filtered = applyFilters(originalData, {
      search: searchTerm,
      dateFrom,
      dateTo,
      ...genericFilters
    });
    setData(filtered);
  }, [searchTerm, dateFrom, dateTo, genericFilters]);

  // Auto-aplicar filtros
  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  return (
    <div>
      <Filters
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        dateFrom={dateFrom}
        onDateFromChange={setDateFrom}
        dateTo={dateTo}
        onDateToChange={setDateTo}
        genericFiltersState={genericFilters}
        onGenericFiltersChange={setGenericFilters}
        genericFilters={filtersConfig}
        onFilter={handleFilter}
        onClearFilters={() => {
          setSearchTerm('');
          setDateFrom(null);
          setDateTo(null);
          setGenericFilters({});
          setData(originalData);
        }}
        tableId="data-table"
      />
      
      <Table data={data} />
    </div>
  );
}
```

---

## 🛠️ Dicas e Melhores Práticas

### ✅ **Recomendações:**
- Use `useCallback` para handlers que dependem de múltiplos estados
- Implemente debounce para busca em tempo real
- Mantenha filtros em URL para deep linking
- Use `useMemo` para opções de filtros derivadas de dados
- Implemente loading states durante filtragem

### ⚡ **Performance:**
```tsx
// Debounce para busca
const debouncedSearch = useDebounce(searchTerm, 300);

// Memoização de opções
const categoryOptions = useMemo(() => 
  getUniqueValues(data, 'category'), [data]
);

// Callback otimizado
const handleFilter = useCallback(() => {
  // lógica de filtro
}, [searchTerm, dateFrom, dateTo, genericFilters]);
```

### 📱 **Responsividade:**
```tsx
const customStyles = {
  filtersRow: {
    flexWrap: 'wrap',
    gap: '1rem'
  },
  filterGroup: {
    minWidth: '200px',
    flex: '1 1 auto'
  }
};
```

---

## 📋 Checklist de Implementação

- [ ] Definir estados para todos os tipos de filtros
- [ ] Configurar filtros genéricos com opções corretas
- [ ] Implementar handlers de filtro e limpeza
- [ ] Adicionar filtro de status se necessário
- [ ] Configurar customização visual
- [ ] Testar responsividade
- [ ] Implementar integração com URL (opcional)
- [ ] Adicionar loading states
- [ ] Testar performance com grandes datasets

---

## 🔗 Integração com Backend

### **Exemplo de Filtros para API:**

```tsx
const sendFiltersToAPI = async (filters: any) => {
  const queryParams = new URLSearchParams();
  
  if (filters.search) queryParams.append('search', filters.search);
  if (filters.dateFrom) queryParams.append('dateFrom', filters.dateFrom.toISOString());
  if (filters.dateTo) queryParams.append('dateTo', filters.dateTo.toISOString());
  
  // Filtros genéricos
  Object.entries(filters).forEach(([key, value]) => {
    if (key !== 'search' && key !== 'dateFrom' && key !== 'dateTo' && value) {
      if (Array.isArray(value)) {
        value.forEach(v => queryParams.append(`${key}[]`, v));
      } else {
        queryParams.append(key, String(value));
      }
    }
  });
  
  const response = await fetch(`/api/data?${queryParams}`);
  return response.json();
};
```

---
