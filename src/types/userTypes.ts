export interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin: string;
  role: string[];
  function?: string;
}

export interface UserPermission {
  id: string;
  label: string;
  create: boolean;
  edit: boolean;
  exclude: boolean;
  view: boolean;
}

export interface CreateUserData extends Omit<User, 'id' | 'lastLogin'> {
  password: string;
}

export interface UpdateUserData extends Omit<User, 'lastLogin'> {
  password?: string;
}
