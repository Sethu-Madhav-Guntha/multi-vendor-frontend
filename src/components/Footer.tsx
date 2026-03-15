function Footer() {
  const appVersion = import.meta.env.VITE_APP_VERSION;
  console.log(appVersion);

  return (
      <ul className="footer-list">
        <li>V: {appVersion}</li>
      </ul>
  );
}

export default Footer;