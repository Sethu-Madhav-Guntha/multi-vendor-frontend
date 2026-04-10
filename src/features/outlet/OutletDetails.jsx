import { Link, useParams } from "react-router-dom";
import { useFetchOutletByIdQuery } from "./outletService";
import { useSelector } from "react-redux";

function OutletDetails() {
  const { outletId } = useParams();
  const token = useSelector((state) => state?.authReducer?.token);
  const { data } = useFetchOutletByIdQuery({outletId, token});

  return (
    <div>
      <Link to="/outlets">Outlet List</Link>
      <h1>Outlet Details</h1>
      <h2>Outlet: {data?.store?.storeName}</h2>
      <h3>Description: {data?.store?.description}</h3>
      <h2>Product List:</h2>
      <ul>
        {data?.store?.products?.map((product) => (
          <li>{product.productName}</li>
        ))}
      </ul>
    </div>
  );
}
export default OutletDetails;
