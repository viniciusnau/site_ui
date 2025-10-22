import React, { useState } from 'react';
import Input from '../../Components/Forms/Input';
import Button from '../../Components/Forms/Button';
import Snackbar from '../../Components/Snackbar/Snackbar';
import styles from './ChangePasswordForms.module.css';
import img from '../../Assets/Defensoria_logo.png';

interface ChangePasswordFormProps {
  onSubmit?: (email: string) => void;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSubmit = () => {
    if (!email) {
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 3000);
      return;
    }

    if (onSubmit) {
      onSubmit(email);
    }
  };

  return (
    <>
      {showSnackbar && <Snackbar type="resetError" />}
      <div className={styles.container}>
        <div className={styles.containerForms}>
          <img src={img} className={styles.img} alt='Logo Defensoria'/>
          <h2 className={styles.title}>
            Utilize seu e-mail institucional para redefinir sua senha!
          </h2>
          <div className={styles.forms}>
            <Input
              max={254}
              type="mail"
              className={styles.input}
              placeholder="E-mail"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
            <Button className={styles.button} onClick={handleSubmit}>
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordForm;
