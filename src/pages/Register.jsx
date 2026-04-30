import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useRegisterMutation } from "../features/auth/authService";
import { setUserInfo } from "../features/auth/authSlice";
import { useNotifier } from "../hooks/useNotifier";
import RegisterForm from "../components/RegisterForm";

function Register() {
  const [registerUserFn, { isLoading, isError, error }] = useRegisterMutation();
  const dispatchFn = useDispatch();
  const navigateFn = useNavigate();
  const { notificationMsg } = useNotifier();

  const onRegisterFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const registerForm = new FormData(event.target);
      const registerFormData = Object.fromEntries(registerForm.entries());

      const res = await registerUserFn(registerFormData);
      notificationMsg("success", res.data.message);
      dispatchFn(setUserInfo({ token: res.data.token, user: res.data.user }));
      navigateFn(res.data.redirect);
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  return (
    <div className="container py-5">
      <RegisterForm
        onSubmit={onRegisterFormSubmit}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </div>
  );
}

export default Register;
