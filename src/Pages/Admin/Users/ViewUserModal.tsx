import React from 'react';
import Modal from '../../../Components/Modal/Modal';
import Button from '../../../Components/Button/Button';
import { Edit2, User, Mail, Calendar, Clock, Shield } from 'lucide-react';
import { User as UserType, UserPermission } from '../../../types/userTypes';
import style from './ViewUserModal.module.css';

interface ViewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (user: UserType) => void;
  user: UserType | null;
  userPermissions?: UserPermission[];
}

const ViewUserModal: React.FC<ViewUserModalProps> = ({
  isOpen,
  onClose,
  onEdit,
  user,
  userPermissions = []
}) => {
  if (!user) return null;

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const getAvatarColor = (name: string): string => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getPermissionsByAction = () => {
    const actions = {
      create: userPermissions.filter(p => p.create),
      edit: userPermissions.filter(p => p.edit),
      exclude: userPermissions.filter(p => p.exclude),
      view: userPermissions.filter(p => p.view)
    };
    return actions;
  };

  const permissionsByAction = getPermissionsByAction();

  const handleEdit = () => {
    onEdit(user);
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      customStyles={style}
      title=""
    >
      <div className={style.modalContent}>
        <div className={style.header}>
          <div 
            className={style.avatar}
            style={{ backgroundColor: getAvatarColor(user.name) }}
          >
            {getInitials(user.name)}
          </div>
          <div className={style.userInfo}>
            <h2 className={style.userName}>{user.name}</h2>
            <div className={style.userRole}>
              {user.role.join(', ')}
              {user.function && <span className={style.userFunction}> • {user.function}</span>}
            </div>
            <div className={`${style.status} ${style[user.status]}`}>
              {user.status === 'active' ? 'Ativo' : 'Inativo'}
            </div>
          </div>
          <Button onClick={handleEdit} className={style.editButton}>
            <Edit2 size={16} />
            Editar
          </Button>
        </div>

        <div className={style.infoSection}>
          <h3 className={style.sectionTitle}>Informações Pessoais</h3>
          <div className={style.infoGrid}>
            <div className={style.infoItem}>
              <Mail className={style.infoIcon} />
              <div>
                <span className={style.infoLabel}>Email</span>
                <span className={style.infoValue}>{user.email}</span>
              </div>
            </div>
            
            <div className={style.infoItem}>
              <Calendar className={style.infoIcon} />
              <div>
                <span className={style.infoLabel}>Data de Criação</span>
                <span className={style.infoValue}>{formatDate(user.createdAt)}</span>
              </div>
            </div>
            
            <div className={style.infoItem}>
              <Clock className={style.infoIcon} />
              <div>
                <span className={style.infoLabel}>Último Login</span>
                <span className={style.infoValue}>{formatDate(user.lastLogin)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={style.permissionsSection}>
          <h3 className={style.sectionTitle}>
            <Shield className={style.sectionIcon} />
            Permissões
          </h3>
          
          {userPermissions.length > 0 ? (
            <div className={style.permissionsGrid}>
              {permissionsByAction.create.length > 0 && (
                <div className={style.permissionGroup}>
                  <h4 className={style.permissionGroupTitle}>Criar e Publicar</h4>
                  <div className={style.permissionList}>
                    {permissionsByAction.create.map(permission => (
                      <span key={permission.id} className={style.permissionTag}>
                        {permission.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {permissionsByAction.edit.length > 0 && (
                <div className={style.permissionGroup}>
                  <h4 className={style.permissionGroupTitle}>Despublicar/Ocultar</h4>
                  <div className={style.permissionList}>
                    {permissionsByAction.edit.map(permission => (
                      <span key={permission.id} className={style.permissionTag}>
                        {permission.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {permissionsByAction.exclude.length > 0 && (
                <div className={style.permissionGroup}>
                  <h4 className={style.permissionGroupTitle}>Excluir</h4>
                  <div className={style.permissionList}>
                    {permissionsByAction.exclude.map(permission => (
                      <span key={permission.id} className={style.permissionTag}>
                        {permission.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {permissionsByAction.view.length > 0 && (
                <div className={style.permissionGroup}>
                  <h4 className={style.permissionGroupTitle}>Editar</h4>
                  <div className={style.permissionList}>
                    {permissionsByAction.view.map(permission => (
                      <span key={permission.id} className={style.permissionTag}>
                        {permission.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={style.noPermissions}>
              <Shield className={style.noPermissionsIcon} />
              <span>Nenhuma permissão configurada</span>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ViewUserModal;