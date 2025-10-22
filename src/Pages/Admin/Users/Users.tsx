import { User as UserIcon, Mail, Briefcase, CirclePlus } from 'lucide-react';
import Table from '../../../Components/Table/Table';
import { useState, useEffect } from 'react';
import { TableColumn, BooleanColumnConfig, DateColumnConfig, ActionsColumnConfig, GenericFilterConfig, CreateButtonConfig, TableCustomStyles } from '../../../types/tableTypes';
import Button from '../../../Components/Button/Button';
import UserModal from './UserModal';
import ViewUserModal from './ViewUserModal';
import { User, CreateUserData, UpdateUserData } from '../../../types/userTypes';
import style from './Users.module.css';

const mockUsers: User[] = [
  {
    id: 1,
    name: "Ana Silva",
    email: "ana.silva@email.com",
    status: "active",
    createdAt: "2024-01-15",
    lastLogin: "2024-08-05",
    role:["Admin"],
  },
  {
    id: 2,
    name: "Carlos Santos",
    email: "carlos.santos@email.com",
    status: "active",
    createdAt: "2024-02-20",
    lastLogin: "2024-08-06",
    role: ["User"],
  },
  {
    id: 3,
    name: "Mariana Oliveira",
    email: "mariana.oliveira@email.com",
    status: "inactive",
    createdAt: "2024-03-05",
    lastLogin: "2024-07-20",
    role: ["User"],
  },
  {
    id: 4,
    name: "João Pereira",
    email: "joao.pereira@email.com",
    status: "active",
    createdAt: "2024-03-18",
    lastLogin: "2024-08-04",
    role: ["Moderator"],
  },
  {
    id: 5,
    name: "Fernanda Costa",
    email: "fernanda.costa@email.com",
    status: "active",
    createdAt: "2024-04-02",
    lastLogin: "2024-08-06",
    role: ["Admin"],
  },
  {
    id: 6,
    name: "Bruno Almeida",
    email: "bruno.almeida@email.com",
    status: "inactive",
    createdAt: "2024-04-15",
    lastLogin: "2024-06-30",
    role: ["User"],
  },
  {
    id: 7,
    name: "Patrícia Lima",
    email: "patricia.lima@email.com",
    status: "active",
    createdAt: "2024-05-01",
    lastLogin: "2024-08-05",
    role: ["User"],
  },
  {
    id: 8,
    name: "Ricardo Martins",
    email: "ricardo.martins@email.com",
    status: "active",
    createdAt: "2024-05-10",
    lastLogin: "2024-08-06",
    role: ["Admin"],
  },  {
    id: 9,
    name: "Ricardo Moreira",
    email: "ricardo.moreira@email.com",
    status: "inactive",
    createdAt: "2024-05-10",
    lastLogin: "2024-07-15",
    role: ["User"],
  },  {
    id: 10,
    name: "João Martins",
    email: "joao.martins@email.com",
    status: "active",
    createdAt: "2024-05-10",
    lastLogin: "2024-08-05",
    role: ["Admin"],
  }
];

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUsers(mockUsers);
    setLoading(false);
  }, []);

  return { users, loading };
}

function Users() {
  const { users, loading } = useUsers();
  const [userList, setUserList] = useState(users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Mock permissions para demonstração
  const mockUserPermissions = [
    { id: 'noticias', label: 'Notícias', create: true, edit: true, exclude: false, view: true },
    { id: 'blog', label: 'Blog', create: true, edit: false, exclude: false, view: true },
    { id: 'relatorios', label: 'Relatórios', create: false, edit: false, exclude: false, view: true },
    { id: 'areas-atuacao', label: 'Áreas de Atuação', create: false, edit: true, exclude: false, view: true },
  ];

  useEffect(() => {
    setUserList(users);
  }, [users]);

  const handleDeleteUser = (id: number | string) => {
    const confirmDelete = window.confirm("Tem certeza que deseja deletar este usuário?");
    if (confirmDelete) {
      setUserList(prev => prev.filter(user => user.id !== id));
    }
  };


  const handleAdd = (newUser: Omit<User, 'id'>) => {
    const newId = Math.max(0, ...userList.map(u => u.id)) + 1;
    setUserList(prev => [...prev, { ...newUser, id: newId }]);
  };

  const handleCreateUser = () => {
    setModalMode('create');
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setModalMode('edit');
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleEditFromView = (user: User) => {
    setIsTransitioning(true);
    setModalMode('edit');
    setSelectedUser(user);
    setIsViewModalOpen(false);
    
    // Pequeno delay apenas para a transição visual suave
    setTimeout(() => {
      setIsModalOpen(true);
      setIsTransitioning(false);
    }, 100);
  };

  const handleSaveUser = (userData: CreateUserData | UpdateUserData) => {
    if (modalMode === 'create') {
      const newId = Math.max(0, ...userList.map(u => u.id)) + 1;
      const newUser: User = {
        ...(userData as CreateUserData),
        id: newId,
        lastLogin: new Date().toISOString().split('T')[0]
      };
      setUserList(prev => [...prev, newUser]);
    } else {
      const updatedUser = userData as UpdateUserData;
      const userWithLastLogin: User = {
        ...updatedUser,
        lastLogin: userList.find(u => u.id === updatedUser.id)?.lastLogin || new Date().toISOString().split('T')[0]
      };
      setUserList(prev => prev.map(u => u.id === updatedUser.id ? userWithLastLogin : u));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedUser(null);
  };

  const actionsColumn: ActionsColumnConfig<User> = {
    enabled: true,
    header: 'Ações',
    width: '150px',
    permissions: {
      canView: true,
      canEdit: true,
      canDelete: true
    },
    view: {
      enabled: true,
      onClick: handleViewUser
    },
    edit: {
      enabled: true,
      onClick: handleEditUser
    },
    delete: {
      enabled: true,
      confirmMessage: 'Tem certeza que deseja excluir este usuário?'
    }
  };

  const multipleBooleanColumns: BooleanColumnConfig<User>[] = [
    {
      enabled: true,
      header: 'Status',
      field: 'status',
      checkValue: 'active',
      xValue: 'inactive',
      width: '80px',
      sortable: true
    },
  ];  

  const genericFilters: GenericFilterConfig<User>[] = [
    {
      enabled: true,
      label: 'Cargo',
      column: 'role',
      options: ['Admin', 'User', 'Moderator'],
      multiple: true,
      width: '200px'
    }
  ];  

  const userColumns: TableColumn<User>[] = [
    {
      key: 'name',
      header: 'Nome',
      render: (user: User) => (
        <div className={style.nameContainer}>
          <div className={style.iconContainer}>
            <UserIcon className={style.icon} />
          </div>
          <div>
            <div className={style.name}>{user.name}</div>
          </div>
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
          <span className={style.role}>{user.role}</span>
        </div>
      ),
      width: '100px'
        },
        {
      key: 'email',
      header: 'Email',
      render: (user: User) => (
        <div className={style.mailContainer}>
          <Mail className={style.icon} />
          <span className={style.mail}>{user.email}</span>
        </div>
      )
    }
  ];

  const customStyles: TableCustomStyles = {
    tableContainer: {
      height:'32rem'
    }
  };

  return (
    <div className={style.container}>
      <div className={style.headerContainer}>
        <Button 
          onClick={handleCreateUser}
          className={style.createButton}
        >
          <CirclePlus size={20} />
          Criar novo usuário
        </Button>
      </div>
      
      <Table
        data={users}
        onDelete={handleDeleteUser}
        columns={userColumns}
        loading={loading}
        searchable={true}
        sortable={true}
        pagination={true}
        itemsPerPage={6}
        onAdd={handleAdd}
        booleanColumns={multipleBooleanColumns}
        actionsColumn={actionsColumn}
        genericFilters={genericFilters}
        customStyles={customStyles}
      />

      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
        user={selectedUser}
        mode={modalMode}
        isTransitioning={isTransitioning}
      />

      <ViewUserModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        onEdit={handleEditFromView}
        user={selectedUser}
        userPermissions={mockUserPermissions}
      />
    </div>
  );
}

export default Users;