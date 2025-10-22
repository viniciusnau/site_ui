import React from 'react';
import ChangePasswordForm from '../../Components/ChangePasswordForms/ChangePasswordForms';

const ChangePassword = () => {

  const handleEmailSubmit = (email: string) => {
    console.log('Email enviado:', email);
  };

  return <ChangePasswordForm onSubmit={handleEmailSubmit} />;
};

export default ChangePassword;