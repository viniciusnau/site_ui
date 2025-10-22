import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Modal from '../../../Components/Modal/Modal';
import Input from '../../../Components/Forms/Input';
import Button from '../../../Components/Button/Button';
import MultiSelect from '../../../Components/MultiSelect/MultiSelect';
import PermissionsModal from './PermissionsModal';
import { User, CreateUserData, UpdateUserData, UserPermission } from '../../../types/userTypes';
import style from './UserModal.module.css';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: CreateUserData | UpdateUserData) => void;
  user?: User | null;
  mode: 'create' | 'edit';
  userPermissions?: UserPermission[];
  isTransitioning?: boolean;
  availablePermissions?: any[];
  rolePermissionConfigs?: any;
  functionPermissionConfigs?: any;
}

const roleOptions = ['Admin', 'User', 'Moderator'];
const functionOptions = ['Desenvolvedor', 'Designer', 'Analista', 'Gerente', 'Coordenador'];

const UserModal: React.FC<UserModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  user, 
  mode,
  userPermissions = [],
  isTransitioning = false,
  availablePermissions = [],
  rolePermissionConfigs = {},
  functionPermissionConfigs = {}
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '' as string,
    function: [] as string[],
    status: 'inactive' as 'active' | 'inactive',
    lastLogin: '',
    createdAt: new Date().toISOString().split('T')[0]
  });

  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (user && mode === 'edit') {
        setFormData({
          name: user.name,
          email: user.email,
          password: '',
          role: Array.isArray(user.role) ? user.role[0] || '' : user.role,
          function: Array.isArray(user.function) ? user.function : [user.function || ''],
          status: user.status,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt
        });
      } else if (mode === 'create') {
        setFormData({
          name: '',
          email: '',
          password: '',
          role: '',
          function: [],
          status: 'active',
          lastLogin: '',
          createdAt: new Date().toISOString().split('T')[0]
        });
      }
    }
  }, [user, mode, isOpen]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (mode === 'edit' && user) {
      const updateData: UpdateUserData = {
        id: user.id,
        name: formData.name,
        email: formData.email,
        role: [formData.role],
        function: formData.function.join(', '),
        status: formData.status,
        createdAt: formData.createdAt,
        password: formData.password || undefined
      };
      onSave(updateData);
    } else {
      const createData: CreateUserData = {
        name: formData.name,
        email: formData.email,
        role: [formData.role],
        function: formData.function.join(', '),
        status: formData.status,
        createdAt: formData.createdAt,
        password: formData.password
      };
      onSave(createData);
    }
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handlePermissionsSave = (permissions: any[]) => {
  };

  const SkeletonLoader = () => (
    <div className={style.modalBody}>
      <div className={style.formGroup}>
        <div className={`${style.skeleton} ${style.skeletonLabel}`}></div>
        <div className={`${style.skeleton} ${style.skeletonInput}`}></div>
      </div>

      <div className={style.formGroup}>
        <div className={`${style.skeleton} ${style.skeletonLabel}`}></div>
        <div className={`${style.skeleton} ${style.skeletonInput}`}></div>
      </div>

      <div className={style.formRow}>
        <div className={style.formGroup}>
          <div className={`${style.skeleton} ${style.skeletonLabel}`}></div>
          <div className={`${style.skeleton} ${style.skeletonInput}`}></div>
        </div>

        <div className={style.formGroup}>
          <div className={`${style.skeleton} ${style.skeletonLabel}`}></div>
          <div className={`${style.skeleton} ${style.skeletonInput}`}></div>
        </div>
      </div>

      <div className={style.statusGroup}>
        <div className={style.statusContainer}>
          <div className={`${style.skeleton} ${style.skeletonLabel}`}></div>
          <div className={`${style.skeleton} ${style.skeletonToggle}`}></div>
        </div>
        <div className={`${style.skeleton} ${style.skeletonButton}`}></div>
      </div>
    </div>
  );

  const showSkeleton = isTransitioning;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} customStyles={style}
      title={mode === 'create' ? 'Criar Usuário' : 'Editar Usuário'}>
      <div className={style.modalContent}>
        {showSkeleton ? (
          <SkeletonLoader />
        ) : (
          <div className={style.modalBody}>
            <div className={style.formGroup}>
              <label className={style.label}>Nome:</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
                className={style.input}
                placeholder="Digite o nome"
              />
            </div>

            <div className={style.formGroup}>
              <label className={style.label}>Email:</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
                className={style.input}
                placeholder="Digite o email"
              />
            </div>

            {mode === 'create' && (
              <div className={style.formGroup}>
                <label className={style.label}>Senha:</label>
                <div className={style.passwordInputContainer}>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('password', e.target.value)}
                    className={style.passwordInput}
                    placeholder="Digite a senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={style.passwordToggle}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}

            <div className={style.formRow}>
              <div className={style.formGroup}>
                <MultiSelect
                  label="Cargo:"
                  options={roleOptions}
                  value={formData.role}
                  onChange={(value) => handleInputChange('role', value)}
                  placeholder="Selecione o cargo"
                  multiple={false}
                  searchable={true}
                />
              </div>

              <div className={style.formGroup}>
                <MultiSelect
                  label="Função:"
                  options={functionOptions}
                  value={formData.function}
                  onChange={(value) => handleInputChange('function', value)}
                  placeholder="Selecione as funções"
                  multiple={true}
                  searchable={true}
                />
              </div>
            </div>

            <div className={style.statusGroup}>
              <div className={style.statusContainer}>
                <label className={style.label}>Status:</label>
                <div className={style.toggleContainer}>
                  <div className={style.switch}>
                    <input
                      type="checkbox"
                      id="status-toggle"
                      checked={formData.status === 'active'}
                      onChange={(e) => handleInputChange('status', e.target.checked ? 'active' : 'inactive')}
                      className={style.switchInput}
                    />
                    <label htmlFor="status-toggle" className={style.switchLabel}>
                      <span className={style.switchSlider}></span>
                    </label>
                  </div>
                  <span className={style.statusText}>
                    {formData.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              </div>
              <Button className={style.permissionsButton} onClick={() => setIsPermissionsModalOpen(true)}>
                Editar permissões
              </Button>
            </div>
          </div>
        )}

        {!showSkeleton && (
          <div className={style.modalFooter}>
            <Button onClick={handleSave} className={style.saveButton}>
              {mode === 'create' ? 'Cadastrar' : 'Salvar'}
            </Button>
            <Button onClick={handleCancel} className={style.cancelButton}>
              Cancelar
            </Button>
          </div>
        )}
      </div>
    </Modal>

    <PermissionsModal
      isOpen={isPermissionsModalOpen}
      onClose={() => setIsPermissionsModalOpen(false)}
      onSave={handlePermissionsSave}
      initialPermissions={userPermissions}
      userRole={[formData.role]}
      userFunction={formData.function.join(', ')}
      availablePermissions={availablePermissions}
      rolePermissionConfigs={rolePermissionConfigs}
      functionPermissionConfigs={functionPermissionConfigs}
    />
    </>
  );
};

export default UserModal;