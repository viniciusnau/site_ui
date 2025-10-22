import React, { useEffect, useState, useRef } from 'react';
import style from './Profile.module.css';
import Snackbar from '../../../Components/Snackbar/Snackbar';
import { Pencil, RotateCcwKey, User, Upload, Trash } from 'lucide-react';
import { useIsResponsive } from "../../../Components/Helper";
import { useNavigate } from 'react-router-dom';

interface AdminProfile {
  photo: any;
  name: string;
  cargo: string;
  created: string;
}

function Profile() {
  const [profile, setProfile] = useState<AdminProfile>({ photo: '', name: '', cargo: '', created: '' });
  const [editedProfile, setEditedProfile] = useState<AdminProfile>(profile);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState<boolean>(false);
  const isMobile = useIsResponsive(1100);
  const iconSize = isMobile ? 18 : 22;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate()

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile((prev) => ({
          ...prev,
          photo: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const mockData: AdminProfile = {
      photo: '',
      name: 'Alexandre André',
      cargo: 'Administrador Geral',
      created: '28/05/2025'
    };
      setProfile(mockData);
      setEditedProfile(mockData);
      setLoading(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProfile(editedProfile)
    setSnackbar(true);
    setIsEditing(false);
  };

  if(snackbar){
    setTimeout(()=>{
      setSnackbar(false);
    }, 3000)
  }

  if (loading) return (
    <div className={style.container}>
      <div className={style.card}>
        <p>Carregando perfil...</p>
      </div>
    </div>
  )

  const handleCancel =() =>{
    setEditedProfile(profile);
    setIsEditing(false);
  }

  const handleRemovePhoto = () => {
    setEditedProfile((prev) => ({
      ...prev,
      photo: '',
    }));
  };

  return (<>
    {snackbar && (<Snackbar type='saveProfile'/>)}
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.content}>
          <div className={style.photoContainer}>
            {(isEditing ? editedProfile.photo : profile.photo) ? (
              <img
                className={style.photo}
                src={isEditing ? editedProfile.photo : profile.photo}
                alt="Foto de perfil"
              />
            ) : (
              <div className={style.photo}>
                <User size={isMobile ? 100 : 150} strokeWidth={1.5} />
              </div>
            )}
            {isEditing && (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <div className={style.editButtonContainer}>
                  <button type="button" onClick={handleFileButtonClick} className={`${style.button} ${style.upload}`}>
                    <Upload size={iconSize}/>Escolher nova foto
                  </button>
                  <button type="button" onClick={handleRemovePhoto} className={`${style.button} ${style.upload}`}><Trash />Remover foto</button>
                </div>
              </>
            )}
          </div>
          <div className={style.createdContainer}>
            <p className={style.created}>{profile.created}</p>
          </div>
          <div className={style.nameContainer}>
            {isEditing ? (
              <input
              className={style.Input}
              type="text"
              name="name"
              value={editedProfile.name}
              onChange={handleInputChange}
              maxLength={55}
              />
            ) : (
                <p className={style.name}>{profile.name}</p>
              )}
          </div>
          <div className={style.adminCargoContainer}>
              <p className={style.adminCargo}>{profile.cargo}</p>
          </div>
          <div className={style.buttonContainer}>
            {isEditing ? (
              <div className={style.editButtonContainer}>
                <button onClick={handleSave} className={style.button}>Salvar</button>
                <button onClick={handleCancel} className={style.button}>Cancelar</button>
              </div>
            ) : (
              <button onClick={() => setIsEditing(true)} className={style.button}><Pencil size={iconSize}/>Editar Perfil</button>
            )}
              <button className={style.button} onClick={()=>navigate("/admin/alterar-senha")}><RotateCcwKey size={iconSize}/>Alterar senha</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Profile;
