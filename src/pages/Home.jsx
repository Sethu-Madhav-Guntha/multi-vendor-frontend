import { useSelector } from "react-redux";

import VendorDashboard from "../components/home/VendorDashboard";
import UserHome from "../components/home/UserHome";

function Home() {
  const userInfo = useSelector((state) => state?.authReducer);

  return (
    <>
      {userInfo?.user?.role === "Vendor" && (
        <>
        <VendorDashboard></VendorDashboard>
        </>
      )}
      {(!userInfo || !(userInfo?.user?.role === "Vendor")) && (
        <>
        <UserHome></UserHome>
        </>
      )}
    </>
  );
}
export default Home;
