import { useRef, useState } from "react";
import {
  useCreateOutletMutation,
  useFetchOutletsQuery,
  useLazyFetchOutletsQuery,
  useRemoveOutletMutation,
  useUpdateOutletMutation,
} from "../features/outlet/outletService";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Outlets() {
  const [editFlag, setEditFlag] = useState(false);
  const [outletDetails, setOutletDetails] = useState(null);

  const storeNameRef = useRef();
  const descriptionRef = useRef();
  const storeImgRef = useRef();
  const storeDiscountRef = useRef();

  const navigateFn = useNavigate();
  const token = useSelector((state) => state?.authReducer?.token);

  const [createOutletFn] = useCreateOutletMutation();
  const [updateOutletFn] = useUpdateOutletMutation();
  const [removeOutletFn] = useRemoveOutletMutation();
  const [fetchOutletsFn] = useLazyFetchOutletsQuery();
  const { data } = useFetchOutletsQuery(token);

  const onUpdateOutletClick = async (outlet) => {
    storeNameRef.current.value = outlet.storeName;
    descriptionRef.current.value = outlet.description;
    storeImgRef.current.value = outlet.storeImg;
    storeDiscountRef.current.value = outlet.storeDiscount;
    setOutletDetails(outlet);
    setEditFlag(true);
  };

  const onRemoveOutletClick = async (outletId) => {
    await removeOutletFn({ id: outletId, token });
    navigateFn("/outlets");
    fetchOutletsFn(token);
  };

  const onOutletDetailsSubmit = async () => {
    event.preventDefault();
    const outletForm = new FormData(event.target);
    const outletFormData = Object.fromEntries(outletForm.entries());
    event.target.reset();
    if (editFlag) {
      await updateOutletFn({
        outletInfo: {
          _id: outletDetails._id,
          ...outletFormData,
        },
        token,
      });
      setEditFlag(false);
    } else {
      await createOutletFn({ outletInfo: outletFormData, token });
    }
    fetchOutletsFn(token);
  };

  return (
    <div>
      <h1>Outlets Page</h1>
      <form onSubmit={onOutletDetailsSubmit}>
        <label htmlFor="storeNameId">Enter Store Name:</label>
        <input
          type="text"
          name="storeName"
          id="storeNameId"
          placeholder="Provide Store Name Here"
          ref={storeNameRef}
        />
        <br />
        <label htmlFor="descriptionId">Enter Store Description:</label>
        <textarea
          name="description"
          id="descriptionId"
          placeholder="Provide Store Description Here"
          ref={descriptionRef}
        />
        <br />
        <label htmlFor="outletImgId">Outlet Image URL:</label>
        <input type="text" name="storeImg" id="outletImgId" placeholder="Provide Store Image URL Here" ref={storeImgRef} />
        <br />
        <label htmlFor="storeDiscountId">Store Discount: </label>
        <input
          type="number"
          name="storeDiscount"
          id="storeDiscountId"
          defaultValue={0}
          ref={storeDiscountRef}
        />
        <br />
        <button type="submit">{editFlag ? "Update" : "Create"} Outlet</button>
      </form>

      <h2>Outlet List:</h2>

      <ul>
        {data &&
          data?.storesList?.map((outlet) => (
            <li key={outlet._id}>
              <Link to={`/outlets/${outlet._id}`}>{outlet.storeName}</Link>
              <img
                src={outlet.storeImg}
                alt={outlet.storeName}
                style={{ width: "100px", height: "100px" }}
              />
              <div>{outlet.description}</div>
              <div>Store Discount: {outlet.storeDiscount}%</div>
              <button
                onClick={() => {
                  onUpdateOutletClick(outlet);
                }}
              >
                Update
              </button>
              <button
                onClick={() => {
                  onRemoveOutletClick(outlet._id);
                }}
              >
                Remove
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
export default Outlets;
