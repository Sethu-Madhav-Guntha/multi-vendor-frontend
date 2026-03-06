import axios from "axios";

function Signup() {
  const signUpUrl = `${import.meta.env.VITE_BACKEND_BASE_URI}/signup`;

  const handleSignUpSubmit = () => {
    event?.preventDefault();
    const signUpForm = new FormData(event.target);
    const signUpFormValues = Object.fromEntries(signUpForm.entries());
    axios
      .post(signUpUrl, signUpFormValues)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(`Error while Registering User:\n`, err));
  };

  return (
    <div>
      <h1>Signup Component</h1>
      <form onSubmit={handleSignUpSubmit}>
        <label htmlFor="usernameId">Provide Username:</label>
        <input
          type="text"
          name="username"
          id="usernameId"
          placeholder="Enter Username"
        />
        <br />
        <label htmlFor="emailId">Proivde Email:</label>
        <input
          type="email"
          name="email"
          id="emailId"
          placeholder="Enter Email"
        />
        <br />
        <label htmlFor="passwordId">Provide Password:</label>
        <input
          type="password"
          name="password"
          id="passwordId"
          placeholder="Enter Password"
        />
        <br />
        <input type="radio" name="role" id="buyerId" />
        <label htmlFor="buyerId">Buyer</label>
        <input type="radio" name="role" id="vendorId" />
        <label htmlFor="vendorId">Vendor</label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
export default Signup;
