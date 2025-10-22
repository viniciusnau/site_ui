# Documentação - Componente MultiSelect

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Instalação e Importação](#instalação-e-importação)
3. [Props e Configurações](#props-e-configurações)
4. [Modos de Funcionamento](#modos-de-funcionamento)
5. [Exemplos de Uso](#exemplos-de-uso)
6. [Customização Visual](#customização-visual)
7. [Validações e Restrições](#validações-e-restrições)
8. [Eventos e Handlers](#eventos-e-handlers)
9. [Casos de Uso Avançados](#casos-de-uso-avançados)
10. [Solução de Problemas](#solução-de-problemas)

---

## 🎯 Visão Geral

O **MultiSelect** é um componente React altamente configurável que permite seleção única ou múltipla de opções com funcionalidades avançadas como busca, validação, tags visuais e controle de seleção.

### ✨ **Principais Características:**
- ✅ Seleção única ou múltipla
- 🔍 Busca/filtro integrado
- 🏷️ Tags visuais para múltiplas seleções
- ✋ Validações personalizáveis
- 🎨 Totalmente customizável via CSS
- ♿ Acessível e responsivo
- 🚫 Controle de estados (disabled, required)
- 🧹 Função de limpeza (clearable)

---

## 📥 Instalação e Importação

### **Localização do Arquivo:**
```
src/Components/MultiSelect/
├── MultiSelect.tsx
└── MultiSelect.module.css
```

### **Importação:**
```tsx
import MultiSelect from '../../../Components/MultiSelect/MultiSelect';
```

### **Dependências:**
- `lucide-react`: Para os ícones
- `React`: Hooks (useState, useEffect, useRef)

---

## ⚙️ Props e Configurações

### **Interface Completa:**

```typescript
interface MultiSelectProps {
  // Dados básicos
  options: string[];                    // Lista de opções disponíveis
  value?: string | string[];            // Valor(es) selecionado(s)
  onChange: (value: string | string[]) => void; // Callback de mudança
  
  // Configurações visuais
  placeholder?: string;                 // Texto placeholder
  label?: string;                       // Label do campo
  className?: string;                   // Classes CSS customizadas
  width?: string;                       // Largura do componente
  
  // Modos de funcionamento
  multiple?: boolean;                   // Seleção múltipla
  searchable?: boolean;                 // Habilita busca
  clearable?: boolean;                  // Botão de limpar
  disabled?: boolean;                   // Campo desabilitado
  showSelectAll?: boolean;              // Botão "Selecionar Todos"
  
  // Validações
  required?: boolean;                   // Campo obrigatório
  minSelection?: number;                // Mínimo de seleções (múltiplo)
  maxSelection?: number;                // Máximo de seleções (múltiplo)
  exactSelection?: number;              // Número exato de seleções
}
```

### **Propriedades Detalhadas:**

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `options` | `string[]` | **obrigatório** | Array com as opções disponíveis |
| `value` | `string \| string[]` | `undefined` | Valor(es) atualmente selecionado(s) |
| `onChange` | `function` | **obrigatório** | Função chamada quando seleção muda |
| `placeholder` | `string` | `"Selecione..."` | Texto mostrado quando nada está selecionado |
| `multiple` | `boolean` | `false` | Permite seleção de múltiplos itens |
| `searchable` | `boolean` | `true` | Habilita campo de busca no dropdown |
| `clearable` | `boolean` | `false` | Mostra botão para limpar seleção |
| `disabled` | `boolean` | `false` | Desabilita o componente |
| `width` | `string` | `auto` | Define largura (ex: "300px", "100%") |
| `label` | `string` | `undefined` | Label exibida acima do campo |
| `required` | `boolean` | `true` | Campo obrigatório (impede limpeza total) |
| `minSelection` | `number` | `1` | Mínimo de itens selecionados (modo múltiplo) |
| `maxSelection` | `number` | `undefined` | Máximo de itens selecionados (modo múltiplo) |
| `exactSelection` | `number` | `undefined` | Número exato de seleções permitidas |
| `showSelectAll` | `boolean` | `false` | Mostra opção "Selecionar Todos" |

---

## 🔧 Modos de Funcionamento

### **1. Modo Seleção Única (Single Select)**

```tsx
<MultiSelect
  options={['Opção 1', 'Opção 2', 'Opção 3']}
  value={selectedValue}
  onChange={(value) => setSelectedValue(value as string)}
  multiple={false}
  placeholder="Escolha uma opção"
/>
```

**Características:**
- ✅ Seleciona apenas um item
- ✅ Dropdown fecha automaticamente após seleção
- ✅ Valor retornado é `string`

### **2. Modo Seleção Múltipla (Multi Select)**

```tsx
<MultiSelect
  options={['Admin', 'User', 'Moderator']}
  value={selectedRoles}
  onChange={(value) => setSelectedRoles(value as string[])}
  multiple={true}
  placeholder="Selecione os cargos"
/>
```

**Características:**
- ✅ Seleciona múltiplos itens
- ✅ Mostra tags visuais para itens selecionados
- ✅ Dropdown permanece aberto para múltiplas seleções
- ✅ Valor retornado é `string[]`

### **3. Modo com Busca**

```tsx
<MultiSelect
  options={largeOptionsList}
  value={value}
  onChange={handleChange}
  searchable={true}
  placeholder="Digite para buscar..."
/>
```

**Características:**
- 🔍 Campo de busca no topo do dropdown
- 🔍 Filtragem em tempo real
- 🔍 Busca case-insensitive
- 🔍 Foco automático no campo de busca

---

## 💡 Exemplos de Uso

### **Exemplo 1: Seleção de Cargo (Simples)**

```tsx
const [selectedRole, setSelectedRole] = useState('');

<MultiSelect
  label="Cargo:"
  options={['Admin', 'User', 'Moderator']}
  value={selectedRole}
  onChange={(value) => setSelectedRole(value as string)}
  multiple={false}
  required={true}
  placeholder="Selecione um cargo"
/>
```

### **Exemplo 2: Seleção Múltipla com Validação**

```tsx
const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

<MultiSelect
  label="Habilidades:"
  options={['JavaScript', 'React', 'Node.js', 'Python', 'SQL']}
  value={selectedSkills}
  onChange={(value) => setSelectedSkills(value as string[])}
  multiple={true}
  minSelection={2}
  maxSelection={5}
  showSelectAll={true}
  placeholder="Selecione suas habilidades"
  width="100%"
/>
```

### **Exemplo 3: Seleção Exata com Clearable**

```tsx
const [selectedTeam, setSelectedTeam] = useState<string[]>([]);

<MultiSelect
  label="Equipe (exatamente 3 membros):"
  options={teamMembers}
  value={selectedTeam}
  onChange={(value) => setSelectedTeam(value as string[])}
  multiple={true}
  exactSelection={3}
  clearable={true}
  required={false}
  searchable={true}
  placeholder="Selecione exatamente 3 membros"
/>
```

### **Exemplo 4: Campo Desabilitado**

```tsx
<MultiSelect
  label="Permissões (somente leitura):"
  options={permissions}
  value={userPermissions}
  onChange={() => {}} // Não faz nada
  disabled={true}
  multiple={true}
  placeholder="Permissões do usuário"
/>
```

### **Exemplo 5: Com Validação Customizada**

```tsx
const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
const [error, setError] = useState('');

const handleCategoryChange = (value: string | string[]) => {
  const newValue = value as string[];
  setSelectedCategories(newValue);
  
  // Validação customizada
  if (newValue.length < 1) {
    setError('Selecione pelo menos uma categoria');
  } else if (newValue.length > 3) {
    setError('Máximo 3 categorias permitidas');
  } else {
    setError('');
  }
};

<div>
  <MultiSelect
    label="Categorias:"
    options={categories}
    value={selectedCategories}
    onChange={handleCategoryChange}
    multiple={true}
    maxSelection={3}
    className={error ? 'error' : ''}
  />
  {error && <span className="error-message">{error}</span>}
</div>
```

---

## 🎨 Customização Visual

### **Classes CSS Disponíveis:**

```css
/* Container principal */
.container { }

/* Label e container do label */
.labelContainer { }
.label { }
.required { } /* Asterisco de obrigatório */

/* Botão principal de seleção */
.selectButton { }
.disabled { } /* Estado desabilitado */
.placeholder { } /* Texto placeholder */

/* Conteúdo selecionado */
.selectedContent { }
.tagsContainer { }
.tag { }
.removeTag { }

/* Ícones */
.selectIcon { }
.rotated { } /* Ícone rotacionado quando aberto */
.clearButton { }

/* Dropdown */
.dropdown { }
.searchContainer { }
.searchInput { }
.searchIcon { }

/* Opções */
.optionsContainer { }
.option { }
.selected { } /* Opção selecionada */
.checkbox { }
.noOptions { } /* Mensagem quando não há opções */
```

### **Exemplo de Customização:**

```css
/* MultiSelect customizado */
.myCustomMultiSelect .selectButton {
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.myCustomMultiSelect .tag {
  background-color: #3b82f6;
  color: white;
  border-radius: 20px;
  font-size: 12px;
}

.myCustomMultiSelect .dropdown {
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
```

```tsx
<MultiSelect
  className="myCustomMultiSelect"
  // ... outras props
/>
```

---

## ✅ Validações e Restrições

### **1. Required (Campo Obrigatório)**

```tsx
<MultiSelect
  required={true} // Padrão
  // Impede que o usuário desmarque todos os itens
  // No modo múltiplo, mantém pelo menos minSelection itens
/>
```

### **2. Seleção Mínima**

```tsx
<MultiSelect
  multiple={true}
  minSelection={2}
  // Usuário deve selecionar pelo menos 2 itens
  // Não pode remover se estiver no limite mínimo
/>
```

### **3. Seleção Máxima**

```tsx
<MultiSelect
  multiple={true}
  maxSelection={5}
  // Usuário pode selecionar no máximo 5 itens
  // Opções ficam desabilitadas após atingir o limite
/>
```

### **4. Seleção Exata**

```tsx
<MultiSelect
  multiple={true}
  exactSelection={3}
  // Usuário deve selecionar exatamente 3 itens
  // Não pode selecionar mais nem menos
/>
```

### **Comportamentos de Validação:**

| Cenário | Comportamento |
|---------|---------------|
| `required=true` + modo único | Não permite desmarcar item selecionado |
| `required=true` + modo múltiplo | Mantém pelo menos `minSelection` itens |
| `maxSelection` atingido | Desabilita opções não selecionadas |
| `exactSelection` atingido | Desabilita todas as opções não selecionadas |
| Tentativa de remover abaixo do mínimo | Ação é ignorada |

---

## 🎛️ Eventos e Handlers

### **onChange - Evento Principal**

```tsx
const handleChange = (value: string | string[]) => {
  if (multiple) {
    const arrayValue = value as string[];
    console.log('Itens selecionados:', arrayValue);
    setSelectedItems(arrayValue);
  } else {
    const stringValue = value as string;
    console.log('Item selecionado:', stringValue);
    setSelectedItem(stringValue);
  }
};
```

### **Integração com Formulários**

```tsx
// Com React Hook Form
import { useForm, Controller } from 'react-hook-form';

const { control, handleSubmit } = useForm();

<Controller
  name="roles"
  control={control}
  rules={{ required: 'Selecione pelo menos um cargo' }}
  render={({ field, fieldState }) => (
    <div>
      <MultiSelect
        {...field}
        options={roleOptions}
        multiple={true}
        label="Cargos:"
      />
      {fieldState.error && (
        <span className="error">{fieldState.error.message}</span>
      )}
    </div>
  )}
/>
```

### **Integração com Estado Global**

```tsx
// Com Redux
import { useDispatch, useSelector } from 'react-redux';

const dispatch = useDispatch();
const selectedCategories = useSelector(state => state.form.categories);

const handleCategoryChange = (value: string | string[]) => {
  dispatch(updateCategories(value));
};

<MultiSelect
  value={selectedCategories}
  onChange={handleCategoryChange}
  options={categories}
  multiple={true}
/>
```

---

## 🚀 Casos de Uso Avançados

### **1. MultiSelect Dinâmico (Opções Carregadas de API)**

```tsx
const [options, setOptions] = useState<string[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadOptions = async () => {
    try {
      const response = await fetch('/api/options');
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error('Erro ao carregar opções:', error);
    } finally {
      setLoading(false);
    }
  };

  loadOptions();
}, []);

{loading ? (
  <div>Carregando opções...</div>
) : (
  <MultiSelect
    options={options}
    value={selectedValue}
    onChange={handleChange}
    placeholder="Selecione..."
  />
)}
```

### **2. MultiSelect com Grupos/Categorias**

```tsx
// Simulando agrupamento visual via separadores
const groupedOptions = [
  '--- Administrativo ---',
  'Admin',
  'Supervisor',
  '--- Operacional ---',
  'User',
  'Moderator',
  '--- Suporte ---',
  'Help Desk',
  'Técnico'
];

<MultiSelect
  options={groupedOptions.filter(opt => !opt.startsWith('---'))}
  // Filtrar separadores para seleção real
  value={value}
  onChange={onChange}
/>
```

### **3. MultiSelect com Busca Avançada**

```tsx
const [searchTerm, setSearchTerm] = useState('');
const [filteredOptions, setFilteredOptions] = useState(allOptions);

useEffect(() => {
  const filtered = allOptions.filter(option => {
    // Busca em múltiplos campos
    return option.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           option.code.toLowerCase().includes(searchTerm.toLowerCase());
  });
  setFilteredOptions(filtered);
}, [searchTerm, allOptions]);

// Usar filteredOptions no MultiSelect
```

### **4. MultiSelect com Validação Assíncrona**

```tsx
const [isValidating, setIsValidating] = useState(false);
const [validationError, setValidationError] = useState('');

const handleChangeWithValidation = async (value: string | string[]) => {
  setIsValidating(true);
  setValidationError('');
  
  try {
    // Validação no backend
    const response = await fetch('/api/validate-selection', {
      method: 'POST',
      body: JSON.stringify({ selection: value })
    });
    
    if (!response.ok) {
      throw new Error('Seleção inválida');
    }
    
    setSelectedValue(value);
  } catch (error) {
    setValidationError('Seleção inválida. Tente novamente.');
  } finally {
    setIsValidating(false);
  }
};
```

### **5. MultiSelect Condicional**

```tsx
const [primarySelection, setPrimarySelection] = useState('');
const [secondaryOptions, setSecondaryOptions] = useState<string[]>([]);

useEffect(() => {
  // Carregar opções secundárias baseadas na primeira seleção
  if (primarySelection) {
    const options = getSecondaryOptions(primarySelection);
    setSecondaryOptions(options);
  } else {
    setSecondaryOptions([]);
  }
}, [primarySelection]);

<div>
  <MultiSelect
    label="Categoria Principal:"
    options={primaryCategories}
    value={primarySelection}
    onChange={(value) => setPrimarySelection(value as string)}
  />
  
  {secondaryOptions.length > 0 && (
    <MultiSelect
      label="Subcategoria:"
      options={secondaryOptions}
      value={secondarySelection}
      onChange={(value) => setSecondarySelection(value as string[])}
      multiple={true}
    />
  )}
</div>
```

---

## 🛠️ Solução de Problemas

### **Problemas Comuns:**

#### **1. Componente não atualiza ao mudar `options`**

**Problema:** Options são atualizadas mas o componente não reflete.

**Solução:**
```tsx
// ✅ Correto - usar key para forçar re-render
<MultiSelect
  key={options.length} // Força re-render quando options mudam
  options={options}
  // ...
/>

// ✅ Alternativa - useEffect para reset
useEffect(() => {
  if (options.length > 0) {
    setSelectedValue(multiple ? [] : '');
  }
}, [options]);
```

#### **2. Valor não está sendo controlado corretamente**

**Problema:** Warning sobre componente controlado/não-controlado.

**Solução:**
```tsx
// ✅ Sempre inicializar valor corretamente
const [value, setValue] = useState<string | string[]>(
  multiple ? [] : ''
);

<MultiSelect
  value={value} // Sempre definido
  onChange={setValue}
  multiple={multiple}
/>
```

#### **3. Performance com muitas opções**

**Problema:** Dropdown lento com muitas opções.

**Solução:**
```tsx
// ✅ Virtualização ou paginação
const MAX_VISIBLE_OPTIONS = 100;
const visibleOptions = useMemo(() => 
  filteredOptions.slice(0, MAX_VISIBLE_OPTIONS),
  [filteredOptions]
);

<MultiSelect
  options={visibleOptions}
  // ...
/>
```

#### **4. Styling não aplica corretamente**

**Problema:** Classes CSS não funcionam.

**Solução:**
```tsx
// ✅ Usar CSS Modules ou styled-components
import styles from './MyComponent.module.css';

<MultiSelect
  className={styles.myMultiSelect}
  // ...
/>

// ✅ Ou definir estilos globalmente
```

### **Debugging:**

```tsx
// Adicionar logs para debug
const handleChange = (value: string | string[]) => {
  console.log('MultiSelect onChange:', {
    value,
    type: typeof value,
    isArray: Array.isArray(value),
    length: Array.isArray(value) ? value.length : 'N/A'
  });
  
  onChange(value);
};
```

---

## 📊 Comparação de Configurações

### **Tabela de Cenários Comuns:**

| Caso de Uso | Configuração |
|-------------|--------------|
| **Dropdown simples** | `multiple={false}` |
| **Lista de tags** | `multiple={true}` |
| **Campo obrigatório** | `required={true}` |
| **Campo opcional** | `required={false}`, `clearable={true}` |
| **Seleção limitada** | `maxSelection={3}` |
| **Busca desabilitada** | `searchable={false}` |
| **Seleção de equipe** | `exactSelection={5}` |
| **Campo somente leitura** | `disabled={true}` |

### **Combinações Recomendadas:**

```tsx
// 🎯 Seleção de usuário único
<MultiSelect
  multiple={false}
  required={true}
  searchable={true}
/>

// 🎯 Tags de habilidades
<MultiSelect
  multiple={true}
  showSelectAll={true}
  clearable={true}
  required={false}
/>

// 🎯 Seleção de time/equipe
<MultiSelect
  multiple={true}
  exactSelection={3}
  searchable={true}
  required={true}
/>

// 🎯 Configuração avançada
<MultiSelect
  multiple={true}
  minSelection={1}
  maxSelection={5}
  searchable={true}
  clearable={true}
  showSelectAll={true}
  required={false}
/>
```

---