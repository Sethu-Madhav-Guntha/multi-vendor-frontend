function Login() {
  const loginUrl = `${import.meta.env.VITE_BACKEND_BASE_URI}/auth/login`;

  const onLoginSubmit = () => {
    event?.preventDefault();
    const loginForm = new FormData(event.target);
    const loginFormValues = Object.fromEntries(loginForm.entries());
    fetch(loginUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginFormValues),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((err) => console.log(`Error while Fetching User Details:\n`, err));
  };

  return (
    <div>
      <h1>Login Component</h1>
      <form onSubmit={onLoginSubmit}>
        <label htmlFor="emailId">
          Provide Email:
          <input
            type="email"
            name="email"
            id="emailId"
            placeholder="Enter Email"
          />
        </label>
        <br />
        <label htmlFor="passwordId">
          Provide Password:
          <input
            type="password"
            name="password"
            id="passwordId"
            placeholder="Enter Password"
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default Login;
