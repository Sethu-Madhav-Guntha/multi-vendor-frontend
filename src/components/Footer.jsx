function Footer() {
  return (
    <footer className="bg-dark text-light mt-auto py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>MultiVendor</h5>
            <p className="small">
              Your trusted marketplace for multiple vendors and seamless shopping.
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <h6>Stay Connected</h6>
          </div>
        </div>

        <div className="text-center mt-3 border-top pt-3 small">
          © {new Date().getFullYear()} MultiVendor. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
