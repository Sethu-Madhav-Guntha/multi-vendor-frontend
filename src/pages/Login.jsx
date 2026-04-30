import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "../features/auth/authService";
import { setUserInfo } from "../features/auth/authSlice";
import { useNotifier } from "../hooks/useNotifier";
import LoginForm from "../components/LoginForm";

function Login() {
  const navigateFn = useNavigate();
  const dispatchFn = useDispatch();
  const [loginFn, { isLoading, isError, error }] = useLoginMutation();
  const { notificationMsg } = useNotifier();

  const onLoginFormSubmit = async (event) => {
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
        })
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
    <div className="container py-5">
      <LoginForm
        onSubmit={onLoginFormSubmit}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </div>
  );
}

export default Login;
