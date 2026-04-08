import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "../features/auth/authService";
import { setUserInfo } from "../features/auth/authSlice";

function Login() {
  const navigateFn = useNavigate();
  const dispatchFn = useDispatch();
  const [loginFn, { isLoading, isError, error }] = useLoginMutation();

  const onLoginFormSubmit = async () => {
    event.preventDefault();
    const loginForm = new FormData(event.target);
    const loginFormData = Object.fromEntries(loginForm.entries());
    event.target.reset();

    const loginResult = await loginFn(loginFormData);
    console.log(loginResult?.data?.message);
    dispatchFn(
      setUserInfo({
        token: loginResult?.data?.token,
        user: loginResult?.data?.user,
      }),
    );

    if (loginResult?.data?.success) {
      navigateFn(loginResult?.data?.redirect);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      {isLoading && <span>API Call Loading</span>}
      {isError && <span>Error: {error?.data?.message}</span>}
      {error && console.log(error)}
      <form onSubmit={onLoginFormSubmit}>
        <label htmlFor="emailId">Enter Email:</label>
        <input
          type="email"
          name="email"
          id="emailId"
          placeholder="Provide Email Here"
        />
        <br />
        <label htmlFor="passwordId">Enter Password:</label>
        <input
          type="password"
          name="password"
          id="passwordId"
          placeholder="Provide Password Here"
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default Login;
