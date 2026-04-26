import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "../features/auth/authService";
import { setUserInfo } from "../features/auth/authSlice";
import { useNotifier } from "../hooks/useNotifier";

function Login() {
  const navigateFn = useNavigate();
  const dispatchFn = useDispatch();
  const [loginFn, { isLoading, isError, error }] = useLoginMutation();
  const { notificationMsg } = useNotifier();

  const onLoginFormSubmit = async () => {
    try {
      event.preventDefault();
      const loginForm = new FormData(event.target);
      const loginFormData = Object.fromEntries(loginForm.entries());
      event.target.reset();

      const loginResult = await loginFn(loginFormData);
      dispatchFn(
        setUserInfo({
          token: loginResult?.data?.token,
          user: loginResult?.data?.user,
        }),
      );
      if (loginResult?.data?.success) {
        notificationMsg("success", loginResult.data.message);
        navigateFn(loginResult?.data?.redirect);
      }
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  return (
    <>
      <h1>Login User:</h1>
      {isLoading && <span>API Call Loading</span>}
      {isError && <span>Error: {error?.error}</span>}
      <form onSubmit={onLoginFormSubmit}>
        <label htmlFor="emailId">Enter Email:</label>
        <input
          type="email"
          name="email"
          id="emailId"
          placeholder="Provide Email Here"
          autoFocus
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
    </>
  );
}
export default Login;
