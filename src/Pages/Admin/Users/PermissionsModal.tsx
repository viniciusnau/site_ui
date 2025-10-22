import React, { useState, useEffect } from 'react';
import Modal from '../../../Components/Modal/Modal';
import Button from '../../../Components/Button/Button';
import style from './PermissionsModal.module.css';

interface Permission {
  id: string;
  label: string;
  create: boolean;
  edit: boolean;
  exclude: boolean;
  view: boolean;
}

interface PermissionGroup {
  title: string;
  permissions: Permission[];
}

interface RolePermissionConfig {
  [roleId: string]: {
    [permissionId: string]: Partial<Permission>;
  };
}

interface FunctionPermissionConfig {
  [functionId: string]: {
    [permissionId: string]: Partial<Permission>;
  };
}

interface PermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (permissions: Permission[]) => void;
  initialPermissions?: Permission[];
  userRole?: string[];
  userFunction?: string;
  availablePermissions?: Permission[];
  rolePermissionConfigs?: RolePermissionConfig;
  functionPermissionConfigs?: FunctionPermissionConfig;
}

const PermissionsModal: React.FC<PermissionsModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialPermissions = [],
  userRole = [],
  userFunction = '',
  availablePermissions = [],
  rolePermissionConfigs = {},
  functionPermissionConfigs = {}
}) => {
  const getPreConfiguredPermissions = (): Permission[] => {
    const basePermissions: Permission[] = availablePermissions.length > 0 
      ? availablePermissions.map(perm => ({ ...perm }))
      : [
          { id: 'noticias', label: 'Notícias', create: false, edit: false, exclude: false, view: false },
          { id: 'cartilhas', label: 'Cartilhas', create: false, edit: false, exclude: false, view: false },
          { id: 'faq', label: 'FAQ', create: false, edit: false, exclude: false, view: false },
          { id: 'blog', label: 'Blog', create: false, edit: false, exclude: false, view: false },
          { id: 'enquetes', label: 'Enquetes', create: false, edit: false, exclude: false, view: false },
          { id: 'popup-aviso', label: 'Pop-Up/Aviso', create: false, edit: false, exclude: false, view: false },
          { id: 'menu-website', label: 'Menu do Website', create: false, edit: false, exclude: false, view: false },
          { id: 'pagina-inicial', label: 'Página Inicial', create: false, edit: false, exclude: false, view: false },
          { id: 'botao-atendimento', label: 'Botão de Atendimento', create: false, edit: false, exclude: false, view: false },
          { id: 'paginas', label: 'Páginas', create: false, edit: false, exclude: false, view: false },
          { id: 'historico-emails', label: 'Histórico de E-mails', create: false, edit: false, exclude: false, view: false },
          { id: 'backup', label: 'Backup', create: false, edit: false, exclude: false, view: false },
          { id: 'areas-atuacao', label: 'Áreas de Atuação', create: false, edit: false, exclude: false, view: false },
          { id: 'nucleos-unidades', label: 'Núcleos e Unidades', create: false, edit: false, exclude: false, view: false },
          { id: 'nucleos-especializados', label: 'Núcleos Especializados', create: false, edit: false, exclude: false, view: false },
          { id: 'agenda-eventos', label: 'Agenda de Eventos', create: false, edit: false, exclude: false, view: false },
          { id: 'estagios', label: 'Estágios', create: false, edit: false, exclude: false, view: false },
          { id: 'calendario-sessoes', label: 'Calendário das Sessões', create: false, edit: false, exclude: false, view: false },
          { id: 'modulos', label: 'Módulos', create: false, edit: false, exclude: false, view: false },
          { id: 'relatorios', label: 'Relatórios', create: false, edit: false, exclude: false, view: false },
          { id: 'outros-usuarios', label: 'Outros Usuários', create: false, edit: false, exclude: false, view: false },
        ];

    if (initialPermissions.length > 0) {
      return initialPermissions;
    }

    userRole.forEach(role => {
      const roleConfig = rolePermissionConfigs[role];
      if (roleConfig) {
        basePermissions.forEach(permission => {
          const rolePermission = roleConfig[permission.id];
          if (rolePermission) {
            Object.assign(permission, rolePermission);
          }
        });
      }
    });

    if (userFunction && functionPermissionConfigs[userFunction]) {
      const functionConfig = functionPermissionConfigs[userFunction];
      basePermissions.forEach(permission => {
        const funcPermission = functionConfig[permission.id];
        if (funcPermission) {
          Object.assign(permission, funcPermission);
        }
      });
    }

    return basePermissions;
  };

  const [permissions, setPermissions] = useState<Permission[]>(getPreConfiguredPermissions());

  useEffect(() => {
    setPermissions(getPreConfiguredPermissions());
  }, [userRole, userFunction, initialPermissions, availablePermissions, rolePermissionConfigs, functionPermissionConfigs]);

  const permissionGroups: PermissionGroup[] = [
    {
      title: 'CONTEÚDO',
      permissions: permissions.slice(0, 6)
    },
    {
      title: 'ESTRUTURA DO SITE',
      permissions: permissions.slice(6, 12)
    },
    {
      title: 'INSTITUCIONAL/SESSÕES',
      permissions: permissions.slice(12)
    }
  ];

  const handlePermissionChange = (permissionId: string, action: keyof Omit<Permission, 'id' | 'label'>, value: boolean) => {
    setPermissions(prev => prev.map(perm => 
      perm.id === permissionId 
        ? { ...perm, [action]: value }
        : perm
    ));
  };

  const handleSelectAll = (groupIndex: number, action: keyof Omit<Permission, 'id' | 'label'>) => {
    const group = permissionGroups[groupIndex];
    const allSelected = group.permissions.every(perm => perm[action]);
    
    group.permissions.forEach(perm => {
      handlePermissionChange(perm.id, action, !allSelected);
    });
  };

  const handleSelectAllPermissions = () => {
    const allSelected = permissions.every(perm => perm.create && perm.edit && perm.exclude && perm.view);
    
    setPermissions(prev => prev.map(perm => ({
      ...perm,
      create: !allSelected,
      edit: !allSelected,
      exclude: !allSelected,
      view: !allSelected
    })));
  };

  const handleSelectAllByAction = (action: keyof Omit<Permission, 'id' | 'label'>) => {
    const allSelected = permissions.every(perm => perm[action]);
    
    setPermissions(prev => prev.map(perm => ({
      ...perm,
      [action]: !allSelected
    })));
  };

  const isAllPermissionsSelected = () => {
    return permissions.every(perm => perm.create && perm.edit && perm.exclude && perm.view);
  };

  const isAllActionSelected = (action: keyof Omit<Permission, 'id' | 'label'>) => {
    return permissions.every(perm => perm[action]);
  };

  const isGroupActionSelected = (groupIndex: number, action: keyof Omit<Permission, 'id' | 'label'>) => {
    const group = permissionGroups[groupIndex];
    return group.permissions.every(perm => perm[action]);
  };

  const handleSave = () => {
    onSave(permissions);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      customStyles={style}
      title="Editar Permissões"
    >
      <div className={style.modalContent}>
        <div className={style.permissionsContainer}>
          <div className={style.headerRow}>
            <div className={style.permissionLabel}>
              <input 
                type="checkbox" 
                id="select-all-permissions"
                checked={isAllPermissionsSelected()}
                onChange={handleSelectAllPermissions}
              />
              <label htmlFor="select-all-permissions">
                Marcar/Desmarcar todas as permissões
              </label>
            </div>
          </div>

          {permissionGroups.map((group, groupIndex) => (
            <div key={group.title} className={style.permissionGroup}>
              <div className={style.groupTitle}>{group.title}</div>
              
              <div className={style.permissionsGrid}>
                <div className={style.headerRow}>
                  <div className={style.permissionName}></div>
                  <div className={style.actionHeader}>
                    <span>Criar e publicar</span>
                    <input 
                      type="checkbox" 
                      className={style.actionHeaderInput}
                      checked={isGroupActionSelected(groupIndex, 'create')}
                      onChange={() => handleSelectAll(groupIndex, 'create')}
                    />
                  </div>
                  <div className={style.actionHeader}>
                    <span>Despublicar/ocultar</span>
                    <input 
                      type="checkbox" 
                      className={style.actionHeaderInput}
                      checked={isGroupActionSelected(groupIndex, 'edit')}
                      onChange={() => handleSelectAll(groupIndex, 'edit')}
                    />
                  </div>
                  <div className={style.actionHeader}>
                    <span>Excluir</span>
                    <input 
                      type="checkbox" 
                      className={style.actionHeaderInput}
                      checked={isGroupActionSelected(groupIndex, 'exclude')}
                      onChange={() => handleSelectAll(groupIndex, 'exclude')}
                    />
                  </div>
                  <div className={style.actionHeader}>
                    <span>Editar</span>
                    <input 
                      type="checkbox" 
                      className={style.actionHeaderInput}
                      checked={isGroupActionSelected(groupIndex, 'view')}
                      onChange={() => handleSelectAll(groupIndex, 'view')}
                    />
                  </div>
                </div>

                {group.permissions.map((permission) => (
                  <div key={permission.id} className={style.permissionRow}>
                    <div className={style.permissionName}>{permission.label}</div>
                    <div className={style.actionCell}>
                      <input 
                        type="checkbox" 
                        className={style.actionCellInput}
                        checked={permission.create}
                        onChange={(e) => handlePermissionChange(permission.id, 'create', e.target.checked)}
                      />
                    </div>
                    <div className={style.actionCell}>
                      <input 
                        type="checkbox" 
                        className={style.actionCellInput}
                        checked={permission.edit}
                        onChange={(e) => handlePermissionChange(permission.id, 'edit', e.target.checked)}
                      />
                    </div>
                    <div className={style.actionCell}>
                      <input 
                        type="checkbox" 
                        checked={permission.exclude}
                        className={style.actionCellInput}
                        onChange={(e) => handlePermissionChange(permission.id, 'exclude', e.target.checked)}
                      />
                    </div>
                    <div className={style.actionCell}>
                      <input 
                        type="checkbox" 
                        checked={permission.view}
                        className={style.actionCellInput}
                        onChange={(e) => handlePermissionChange(permission.id, 'view', e.target.checked)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={style.modalFooter}>
          <Button onClick={handleSave} className={style.saveButton}>
            Salvar
          </Button>
          <Button onClick={handleCancel} className={style.cancelButton}>
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PermissionsModal;
