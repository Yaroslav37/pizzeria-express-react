import React from 'react';

const LoginForm = () => {
  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:3001/auth/facebook';
  };

  return (
    <div>
      <h1>Моя страница авторизации</h1>
      <button onClick={handleFacebookLogin}>Войти через Facebook</button>
    </div>
  );
};

export default LoginForm;
