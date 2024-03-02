const EmailPasswordForm = () => {
  return (
    <>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" />
      <button>Sign Up</button>
    </>
  );
};

export default EmailPasswordForm;
