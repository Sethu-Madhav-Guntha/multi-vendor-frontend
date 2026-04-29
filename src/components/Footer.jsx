function Footer() {
  return (
    <footer className="bg-dark text-light mt-auto py-4">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-4 mb-3">
            <h5>MultiVendor</h5>
            <p className="small">
              Your trusted marketplace for multiple vendors and seamless shopping.
            </p>
          </div>

          {/* Company Section (static text only) */}
          <div className="col-md-4 mb-3">
            <h6>Company</h6>
            <ul className="list-unstyled small">
              <li>About Us</li>
              <li>Blog</li>
            </ul>
          </div>

          {/* Social & Newsletter (static placeholders) */}
          <div className="col-md-4 mb-3">
            <h6>Stay Connected</h6>
            <div className="d-flex gap-3 mb-2">
              <span className="small">Facebook</span>
              <span className="small">Twitter</span>
              <span className="small">Instagram</span>
              <span className="small">LinkedIn</span>
            </div>
            <div className="small">Subscribe to our newsletter</div>
            <input
              type="text"
              placeholder="Enter email"
              className="form-control form-control-sm mt-2"
              disabled
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center mt-3 border-top pt-3 small">
          © {new Date().getFullYear()} MultiVendor. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
