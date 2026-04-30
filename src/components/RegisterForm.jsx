function RegisterForm({ onSubmit, isLoading, isError, error }) {
  return (
    <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "500px" }}>
      <h3 className="text-center mb-3">📝 Register</h3>

      {isLoading && <div className="alert alert-info">Registering user...</div>}
      {isError && (
        <div className="alert alert-danger">Error: {error?.data?.message}</div>
      )}

      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="usernameId" className="form-label">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="usernameId"
            className="form-control"
            placeholder="Enter username"
            autoFocus
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="emailId" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="emailId"
            className="form-control"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="passwordId" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="passwordId"
            className="form-control"
            placeholder="Enter password"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="role"
                value="Admin"
                id="adminId"
                className="form-check-input"
              />
              <label htmlFor="adminId" className="form-check-label">
                Admin
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="role"
                value="Vendor"
                id="vendorId"
                className="form-check-input"
              />
              <label htmlFor="vendorId" className="form-check-label">
                Vendor
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="role"
                value="User"
                id="userId"
                className="form-check-input"
                defaultChecked
              />
              <label htmlFor="userId" className="form-check-label">
                User
              </label>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Gender</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="gender"
                value="Male"
                id="maleId"
                className="form-check-input"
                defaultChecked
              />
              <label htmlFor="maleId" className="form-check-label">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="gender"
                value="Female"
                id="femaleId"
                className="form-check-input"
              />
              <label htmlFor="femaleId" className="form-check-label">
                Female
              </label>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="profileImgId" className="form-label">
            Profile Image URL
          </label>
          <input
            type="text"
            name="profileImg"
            id="profileImgId"
            className="form-control"
            placeholder="Paste image URL"
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          <i className="bi bi-person-plus"></i> Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
