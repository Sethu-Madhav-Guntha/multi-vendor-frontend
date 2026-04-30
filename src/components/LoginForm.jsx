function LoginForm({ onSubmit, isLoading, isError, error }) {
  return (
    <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-3">🔐 Login</h3>

      {isLoading && <div className="alert alert-info">Logging in...</div>}
      {isError && <div className="alert alert-danger">Error: {error?.data?.message}</div>}

      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="emailId" className="form-label">Email</label>
          <input
            type="email"
            name="email"
            id="emailId"
            className="form-control"
            placeholder="Enter your email"
            autoFocus
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="passwordId" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            id="passwordId"
            className="form-control"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          <i className="bi bi-box-arrow-in-right"></i> Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
