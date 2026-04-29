import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1 container-fluid py-3">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
