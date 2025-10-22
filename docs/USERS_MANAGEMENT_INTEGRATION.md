# Documentação - Sistema de Gerenciamento de Usuários

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Estrutura de Arquivos](#estrutura-de-arquivos)
3. [Configuração com Backend](#configuração-com-backend)
4. [Sistema de Permissões](#sistema-de-permissões)
5. [Handlers e Funções](#handlers-e-funções)
6. [Configuração da Tabela](#configuração-da-tabela)
7. [Tipos de Dados](#tipos-de-dados)
8. [Exemplos Práticos](#exemplos-práticos)

---

## 🎯 Visão Geral

O sistema de gerenciamento de usuários é composto por:
- **Users.tsx**: Página principal com tabela de usuários
- **UserModal.tsx**: Modal para criar/editar usuários
- **ViewUserModal.tsx**: Modal para visualizar detalhes do usuário
- **PermissionsModal.tsx**: Modal para gerenciar permissões
- **userTypes.ts**: Tipos TypeScript para os dados

---

## 📁 Estrutura de Arquivos

```
src/Pages/Admin/Users/
├── Users.tsx                 # Página principal
├── UserModal.tsx            # Modal criar/editar
├── ViewUserModal.tsx        # Modal visualizar
├── PermissionsModal.tsx     # Modal permissões
├── Users.module.css         # Estilos da página
├── UserModal.module.css     # Estilos do modal
└── ViewUserModal.module.css # Estilos da visualização

src/types/
└── userTypes.ts             # Interfaces TypeScript
```

---

## 🔗 Configuração com Backend

### 1. Substituir Dados Mock

**Localização**: `Users.tsx` - linha 11-86

```tsx
// REMOVER os mockUsers e substituir por chamada de API
const mockUsers: User[] = [
  // ... dados mock
];

// SUBSTITUIR por:
export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Erro ao carregar usuários');
        }
        
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
}
```

### 2. Configurar Handlers para API

#### handleSaveUser - Criar/Editar Usuário

```tsx
const handleSaveUser = async (userData: CreateUserData | UpdateUserData) => {
  try {
    if (modalMode === 'create') {
      // POST para criar usuário
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Erro ao criar usuário');
      }

      const newUser = await response.json();
      setUserList(prev => [...prev, newUser]);
      
    } else {
      // PUT para editar usuário
      const updateData = userData as UpdateUserData;
      const response = await fetch(`/api/users/${updateData.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar usuário');
      }

      const updatedUser = await response.json();
      setUserList(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    }
    
    // Fechar modal após sucesso
    setIsModalOpen(false);
    setSelectedUser(null);
    
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    // Adicionar notificação de erro para o usuário
    alert('Erro ao salvar usuário. Tente novamente.');
  }
};
```

#### handleDeleteUser - Excluir Usuário

```tsx
const handleDeleteUser = async (id: number | string) => {
  const confirmDelete = window.confirm("Tem certeza que deseja deletar este usuário?");
  
  if (confirmDelete) {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir usuário');
      }

      // Remover da lista local
      setUserList(prev => prev.filter(user => user.id !== id));
      
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      alert('Erro ao excluir usuário. Tente novamente.');
    }
  }
};
```

---

## 🔐 Sistema de Permissões

### 1. Configurar Permissões do Usuário Logado

**Criar hook para permissões do usuário atual:**

```tsx
// src/hooks/useCurrentUserPermissions.ts
export function useCurrentUserPermissions() {
  const [permissions, setPermissions] = useState<UserPermission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await fetch('/api/users/me/permissions', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        const data = await response.json();
        setPermissions(data);
      } catch (error) {
        console.error('Erro ao carregar permissões:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, []);

  // Função para verificar permissões específicas
  const hasPermission = (resource: string, action: 'create' | 'edit' | 'view' | 'delete') => {
    const permission = permissions.find(p => p.id === resource);
    return permission ? permission[action] : false;
  };

  return { permissions, hasPermission, loading };
}
```

### 2. Aplicar Permissões na Tabela

**No componente Users.tsx:**

```tsx
function Users() {
  // ... outros estados
  const { hasPermission } = useCurrentUserPermissions();

  // Configurar actions baseado nas permissões
  const actionsColumn: ActionsColumnConfig<User> = {
    enabled: true,
    header: 'Ações',
    width: '150px',
    permissions: {
      canView: hasPermission('users', 'view'),
      canEdit: hasPermission('users', 'edit'),
      canDelete: hasPermission('users', 'delete')
    },
    view: {
      enabled: hasPermission('users', 'view'),
      onClick: handleViewUser
    },
    edit: {
      enabled: hasPermission('users', 'edit'),
      onClick: handleEditUser
    },
    delete: {
      enabled: hasPermission('users', 'delete'),
      confirmMessage: 'Tem certeza que deseja excluir este usuário?'
    }
  };

  // Mostrar/ocultar botão de criar baseado na permissão
  const canCreateUser = hasPermission('users', 'create');

  return (
    <div className={style.container}>
      <div className={style.headerContainer}>
        {canCreateUser && (
          <Button 
            onClick={handleCreateUser}
            className={style.createButton}
          >
            <CirclePlus size={20} />
            Criar novo usuário
          </Button>
        )}
      </div>
      
      {/* ... resto do componente */}
    </div>
  );
}
```

### 3. Configurar Permissões de Usuários

**Carregar permissões específicas do usuário:**

```tsx
// No ViewUserModal, substituir mockUserPermissions
const [userPermissions, setUserPermissions] = useState<UserPermission[]>([]);

useEffect(() => {
  if (selectedUser) {
    const fetchUserPermissions = async () => {
      try {
        const response = await fetch(`/api/users/${selectedUser.id}/permissions`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        const data = await response.json();
        setUserPermissions(data);
      } catch (error) {
        console.error('Erro ao carregar permissões do usuário:', error);
      }
    };

    fetchUserPermissions();
  }
}, [selectedUser]);
```

---

## 🎛️ Handlers e Funções

### Principais Handlers

| Handler | Descrição | Uso |
|---------|-----------|-----|
| `handleCreateUser()` | Abre modal para criar usuário | Botão "Criar novo usuário" |
| `handleEditUser(user)` | Abre modal para editar usuário | Ação "Editar" na tabela |
| `handleViewUser(user)` | Abre modal para visualizar usuário | Ação "Ver" na tabela |
| `handleDeleteUser(id)` | Exclui usuário | Ação "Excluir" na tabela |
| `handleEditFromView(user)` | Edita usuário vindo do modal de visualização | Botão "Editar" no ViewUserModal |
| `handleSaveUser(userData)` | Salva dados do usuário (criar/editar) | Botão "Salvar/Cadastrar" no UserModal |

### Estados Principais

| Estado | Tipo | Descrição |
|--------|------|-----------|
| `userList` | `User[]` | Lista de usuários na tabela |
| `selectedUser` | `User \| null` | Usuário selecionado para edição/visualização |
| `modalMode` | `'create' \| 'edit'` | Modo do modal (criar ou editar) |
| `isModalOpen` | `boolean` | Controla abertura do UserModal |
| `isViewModalOpen` | `boolean` | Controla abertura do ViewUserModal |
| `isTransitioning` | `boolean` | Controla skeleton durante transições |

---

## ⚙️ Configuração da Tabela

### Colunas da Tabela

```tsx
const userColumns: TableColumn<User>[] = [
  {
    key: 'name',
    header: 'Nome',
    render: (user: User) => (
      <div className={style.nameContainer}>
        <UserIcon className={style.icon} />
        <div className={style.name}>{user.name}</div>
      </div>
    ),
    width: '400px'
  },
  {
    key: 'role',
    header: 'Cargo',
    render: (user: User) => (
      <div className={style.roleContainer}>
        <Briefcase className={style.icon} />
        <span className={style.role}>{user.role.join(', ')}</span>
      </div>
    ),
    width: '200px'
  },
  {
    key: 'email',
    header: 'Email',
    render: (user: User) => (
      <div className={style.mailContainer}>
        <Mail className={style.icon} />
        <span className={style.mail}>{user.email}</span>
      </div>
    ),
    width: '300px'
  }
];
```

### Filtros

```tsx
const genericFilters: GenericFilterConfig<User>[] = [
  {
    enabled: true,
    label: 'Cargo',
    column: 'role',
    options: ['Admin', 'User', 'Moderator'], // Buscar do backend
    multiple: true,
    width: '200px'
  },
  {
    enabled: true,
    label: 'Status',
    column: 'status',
    options: ['active', 'inactive'],
    multiple: false,
    width: '150px'
  }
];
```

---

## 📝 Tipos de Dados

### Interface User

```typescript
export interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin: string;
  role: string[];           // Array para compatibilidade com backend
  function?: string[];      // Array de funções
}
```

### Interface UserPermission

```typescript
export interface UserPermission {
  id: string;           // Identificador único (ex: 'users', 'noticias')
  label: string;        // Nome para exibição (ex: 'Usuários', 'Notícias')
  create: boolean;      // Pode criar
  edit: boolean;        // Pode editar
  exclude: boolean;     // Pode excluir
  view: boolean;        // Pode visualizar
}
```

### Dados para Criar/Editar

```typescript
export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: string[];           // Enviado como array [cargo] para backend
  function: string[];       // Array de funções selecionadas
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface UpdateUserData {
  id: number;
  name: string;
  email: string;
  password?: string;        // Opcional na edição
  role: string[];           // Enviado como array [cargo] para backend
  function: string[];       // Array de funções selecionadas
  status: 'active' | 'inactive';
  createdAt: string;
}

// IMPORTANTE: Estrutura interna do formulário (UserModal)
interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;             // String simples no formulário (seleção única)
  function: string[];       // Array no formulário (seleção múltipla)
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}
```

---

## 🚀 Exemplos Práticos

### 1. Conectar com API Real

**Substituir a função useUsers:**

```tsx
export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Substituir esta URL pela sua API
    fetch('/api/admin/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro:', error);
        setLoading(false);
      });
  }, []);

  return { users, loading };
}
```

### 2. Implementar Busca de Permissões

**No UserModal.tsx, para carregar permissões disponíveis:**

```tsx
// Adicionar no UserModal
const [availablePermissions, setAvailablePermissions] = useState([]);

useEffect(() => {
  // Carregar permissões disponíveis do backend
  fetch('/api/permissions')
    .then(response => response.json())
    .then(data => setAvailablePermissions(data));
}, []);

// Passar para o PermissionsModal
<PermissionsModal
  isOpen={isPermissionsModalOpen}
  onClose={() => setIsPermissionsModalOpen(false)}
  onSave={handlePermissionsSave}
  initialPermissions={userPermissions}
  userRole={formData.role}
  userFunction={formData.function}
  availablePermissions={availablePermissions} // Do backend
  rolePermissionConfigs={rolePermissionConfigs}
  functionPermissionConfigs={functionPermissionConfigs}
/>
```

### 3. Configurar Diferentes Níveis de Permissão

**Exemplo de estrutura de permissões no backend:**

```json
{
  "userId": 1,
  "permissions": [
    {
      "id": "users",
      "label": "Usuários",
      "create": true,
      "edit": true,
      "exclude": false,
      "view": true
    },
    {
      "id": "noticias",
      "label": "Notícias",
      "create": true,
      "edit": true,
      "exclude": true,
      "view": true
    }
  ]
}
```

---

## 🔧 Configurações Adicionais

### ⚠️ Importante: Cargo vs Função

**Comportamento no Formulário:**
- **Cargo**: Seleção única (um cargo por usuário)
  - Tipo no formulário: `string`
  - Tipo enviado ao backend: `string[]` (convertido para array)
  - Component: `<MultiSelect multiple={false} />`

- **Função**: Seleção múltipla (várias funções por usuário)
  - Tipo no formulário: `string[]`
  - Tipo enviado ao backend: `string[]` (permanece array)
  - Component: `<MultiSelect multiple={true} />`

**Conversões no handleSave:**
```tsx
// Formulário → Backend
const saveData = {
  role: [formData.role],              // string → string[]
  function: formData.function         // string[] → string[] (sem conversão)
};

// Backend → Formulário (no useEffect)
const formData = {
  role: user.role[0] || '',           // string[] → string (primeiro item)
  function: user.function || []       // string/string[] → string[]
};
```

### 1. Configuração de Roles e Functions

**Buscar do backend:**

```tsx
// No UserModal.tsx
const [roleOptions, setRoleOptions] = useState<string[]>([]);
const [functionOptions, setFunctionOptions] = useState<string[]>([]);

useEffect(() => {
  // Carregar roles disponíveis
  fetch('/api/roles')
    .then(response => response.json())
    .then(data => setRoleOptions(data));

  // Carregar functions disponíveis
  fetch('/api/functions')
    .then(response => response.json())
    .then(data => setFunctionOptions(data));
}, []);

// IMPORTANTE: Estrutura do formulário
// - role: seleção única (string) no formulário
// - function: seleção múltipla (string[]) no formulário
// - Ao salvar, role vira array [formData.role] para o backend
// - function permanece como array para o backend
```

### 2. Validação de Formulário

**Adicionar validações no UserModal:**

```tsx
const validateForm = () => {
  const errors: string[] = [];
  
  if (!formData.name.trim()) {
    errors.push('Nome é obrigatório');
  }
  
  if (!formData.email.trim()) {
    errors.push('Email é obrigatório');
  }
  
  if (mode === 'create' && !formData.password.trim()) {
    errors.push('Senha é obrigatória');
  }
  
  if (!formData.role.trim()) {                    // Agora é string
    errors.push('Cargo deve ser selecionado');
  }
  
  if (formData.function.length === 0) {           // Array de funções
    errors.push('Pelo menos uma função deve ser selecionada');
  }
  
  return errors;
};

const handleSave = () => {
  const errors = validateForm();
  
  if (errors.length > 0) {
    alert(errors.join('\n'));
    return;
  }
  
  // Prosseguir com o save...
  // role vira array: [formData.role]
  // function permanece array: formData.function
};
```

### 3. Tratamento de Erros

**Implementar sistema de notificações:**

```tsx
// Hook para notificações
const useNotification = () => {
  const showSuccess = (message: string) => {
    // Implementar notificação de sucesso
    console.log('Success:', message);
  };
  
  const showError = (message: string) => {
    // Implementar notificação de erro
    console.error('Error:', message);
  };
  
  return { showSuccess, showError };
};

// Usar nos handlers
const { showSuccess, showError } = useNotification();

const handleSaveUser = async (userData: CreateUserData | UpdateUserData) => {
  try {
    // ... lógica de save
    showSuccess('Usuário salvo com sucesso!');
  } catch (error) {
    showError('Erro ao salvar usuário');
  }
};
```

---

## 📚 Resumo de Integração

### Checklist de Implementação

- [ ] Substituir dados mock por chamadas de API
- [ ] Implementar sistema de autenticação com tokens
- [ ] Configurar permissões do usuário logado
- [ ] Conectar handlers com endpoints do backend
- [ ] Implementar validação de formulários
- [ ] Adicionar tratamento de erros
- [ ] Configurar carregamento de roles e functions
- [ ] Implementar sistema de notificações
- [ ] Testar todas as funcionalidades
- [ ] Adicionar loading states apropriados

### Endpoints Necessários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/users` | Listar usuários |
| POST | `/api/users` | Criar usuário |
| PUT | `/api/users/:id` | Editar usuário |
| DELETE | `/api/users/:id` | Excluir usuário |
| GET | `/api/users/me/permissions` | Permissões do usuário logado |
| GET | `/api/users/:id/permissions` | Permissões de um usuário específico |
| GET | `/api/roles` | Listar cargos disponíveis |
| GET | `/api/functions` | Listar funções disponíveis |
| GET | `/api/permissions` | Listar permissões disponíveis |

---
