import { useSelector } from "react-redux";

import VendorDashboard from "../components/home/VendorDashboard";
import UserHome from "../components/home/UserHome";
import { selectIsAuthenticatedUser, selectIsUser, selectIsVendor } from "../features/auth/authSelectors";

function Home() {
  const isUserAuthenticated = useSelector(selectIsAuthenticatedUser);
  const isUser = useSelector(selectIsUser);
  const isVendor = useSelector(selectIsVendor);

  return (
    <>
      {isVendor && (
        <>
          <VendorDashboard></VendorDashboard>
        </>
      )}
      {(isUser || !isUserAuthenticated) && (
        <>
          <UserHome></UserHome>
        </>
      )}
    </>
  );
}
export default Home;
