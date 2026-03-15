import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const signUpUrl = `${import.meta.env.VITE_BACKEND_BASE_URI}/auth/signup`;
  const navigateFn = useNavigate();
  const handleSignUpSubmit = () => {
    event?.preventDefault();
    const signUpForm = new FormData(event.target);
    const signUpFormValues = Object.fromEntries(signUpForm.entries());
    axios
      .post(signUpUrl, signUpFormValues)
      .then((res) => console.log(res.data))
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          const { redirect, prefillData, message } = err.response.data;
          console.log(message);
          navigateFn(redirect, { state: { email: prefillData.email } });
        } else {
          console.log(`Error while Registering User:\n`, err);
        }
      });
  };

  return (
    <div>
      <h1>Signup Component</h1>
      <form onSubmit={handleSignUpSubmit}>
        <label htmlFor="usernameId">Username:</label>
        <input
          type="text"
          name="username"
          id="usernameId"
          placeholder="Enter Username"
          required
        />
        <br />
        <label htmlFor="emailId">Email:</label>
        <input
          type="email"
          name="email"
          id="emailId"
          placeholder="Enter Email"
          required
        />
        <br />
        <label htmlFor="passwordId">Password:</label>
        <input
          type="password"
          name="password"
          id="passwordId"
          placeholder="Enter Password"
          required
        />
        <br />
        <span>Choose Role: </span>
        <input type="radio" name="role" id="buyerId" value="Buyer" required />
        <label htmlFor="buyerId">Buyer</label>
        <input type="radio" name="role" id="vendorId" value="Vendor" required />
        <label htmlFor="vendorId">Vendor</label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
export default Signup;
