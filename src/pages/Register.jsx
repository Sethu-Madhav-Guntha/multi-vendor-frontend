import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../features/auth/authService";
import { setUserInfo } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Register() {
  const [registerUserFn] = useRegisterMutation();
  const dispatchFn = useDispatch();
  const navigateFn = useNavigate();
  const onRegisterFormSubmit = () => {
    event.preventDefault();
    const registerForm = new FormData(event.target);
    const registerFormData = Object.fromEntries(registerForm.entries());

    registerUserFn(registerFormData)
      .then((res) => {
        console.log(res.data.message);
        dispatchFn(setUserInfo({ token: res.data.token, user: res.data.user }));
        navigateFn(res.data.redirect);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={onRegisterFormSubmit}>
        <label htmlFor="usernameId">Enter Username:</label>
        <input
          type="text"
          name="username"
          id="usernameId"
          placeholder="Provide Username Here"
          autoFocus
        />
        <br />
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
        <span>Role:</span>
        <input type="radio" name="role" value="Admin" id="adminId" />
        <label htmlFor="adminId">Admin</label>
        <input type="radio" name="role" value="Vendor" id="vendorId" />
        <label htmlFor="vendorId">Vendor</label>
        <input
          type="radio"
          name="role"
          id="userId"
          value="User"
          defaultChecked
        />
        <label htmlFor="userId">User</label>
        <br />
        <span>Gender:</span>
        <input type="radio" name="gender" value="Male" id="maleId" />
        <label htmlFor="maleId">Male</label>
        <input type="radio" name="gender" value="Female" id="femaleId" />
        <label htmlFor="femaleId">Female</label>
        <br />
        <label htmlFor="profileImgId">Profile Image URL:</label>
        <input type="text" name="profileImg" id="profileImgId" />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
export default Register;
