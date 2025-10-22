import React, { useState } from "react";
import { UserPen, RotateCcwKey } from "lucide-react";
import Input from "../../../../../Components/Forms/Input";
import Modal from "../../../../../Components/Modal/Modal";
import style from "./MeuPerfil.module.css";

function MeuPerfil() {
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openEmailModal, setOpenEmailModal] = useState<boolean>(false);

  const cancel = () => {
    setUserEmail("");
    setName("");
    setOpenModal(false);
  };

  const saveChanges = () => {
    if (!name.trim() || !userEmail.trim()) {
      alert("Preencha todos os campos.");
      return;
    }
    // - atualizar um estado global (ex: Redux, Context)
    // - chamar uma API para atualizar o perfil
    // - exibir feedback ao usuário
    setOpenModal(false);
  };

  const handleEditClick = () => {
    setName(user.name);
    setUserEmail("exemplo@email.com");
    setOpenModal(true);
  };

  const profile = (letter: string) => {
    let a = letter[0];
    return a.toUpperCase();
  };

  const user = {
    name: "Alexandre",
    email: "alexandreexemplo@exemplo.com",
    role: "Estagiário ASCOM",
    date: "28/06/2025",
  };
  return (
    <>
      {openEmailModal && (
        <Modal
          isOpen={openEmailModal}
          onClose={() => setOpenEmailModal(false)}
          customStyles={style}
        >
          <div className={style.containerModal}>
            <p className={style.textModal}>
              Você recebeu o link para redefinir sua senha em seu email!
            </p>
            <button
              className={style.button}
              onClick={() => setOpenEmailModal(false)}
            >
              Ok
            </button>
          </div>
        </Modal>
      )}
      {openModal && (
        <Modal
          isOpen={openModal}
          withBackground={true}
          onClose={() => setOpenModal(false)}
          customStyles={style}
        >
          <div className={style.containerModal}>
            <div className={style.titleContainerModal}>
              <p className={style.titleModal}>Editar meu perfil</p>
            </div>
            <div className={style.profileModal}>
              <div className={style.imageContainer}>
                <p className={style.profileImage}>{profile(user.name)}</p>
              </div>
            </div>
            <div className={style.inputsModal}>
              <input
                max={254}
                type="text"
                className={style.input}
                placeholder="Nome"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
              <Input
                max={254}
                type="mail"
                className={style.input}
                placeholder="E-mail"
                value={userEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserEmail(e.target.value)
                }
              />
            </div>
            <div className={style.buttonsModal}>
              <button className={style.button} onClick={saveChanges}>
                Salvar
              </button>
              <button
                className={`${style.button} ${style.cancel}`}
                onClick={() => {
                  cancel();
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </Modal>
      )}
      <div className={style.containerMyProfile}>
        <div className={style.userInformations}>
          <div className={style.imageContainer}>
            <p className={style.profileImage}>{profile(user.name)}</p>
          </div>
          <div className={style.detailsContainer}>
            <div className={style.nameContainer}>
              <h3 className={style.name}>{user.name}</h3>
            </div>
            <div className={style.roleContainer}>
              <p className={style.role}>{user.role}</p>
            </div>
            <div className={style.dateContainer}>
              <p className={style.date}>{user.date}</p>
            </div>
          </div>
        </div>
        <div className={style.buttons}>
          <div className={style.buttonContainer}>
            <button className={style.button} onClick={handleEditClick}>
              <UserPen /> Editar
            </button>
          </div>
          <div className={style.buttonContainer}>
            <button
              className={style.button}
              onClick={() => setOpenEmailModal(true)}
            >
              <RotateCcwKey />
              Redefinir senha
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MeuPerfil;
