import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  useCreateOutletMutation,
  useLazyFetchOutletByIdQuery,
  useFetchOutletsQuery,
  useLazyFetchOutletsQuery,
  useRemoveOutletMutation,
  useUpdateOutletMutation,
} from "../features/outlet/outletService";
import { useNotifier } from "../hooks/useNotifier";

function Outlets() {
  const [editFlag, setEditFlag] = useState(false);
  const [outletDetails, setOutletDetails] = useState(null);

  const storeNameRef = useRef();
  const descriptionRef = useRef();
  const storeImgRef = useRef();
  const storeDiscountRef = useRef();

  const token = useSelector((state) => state?.authReducer?.token);
  const { notificationMsg } = useNotifier();

  const [createOutletFn] = useCreateOutletMutation();
  const [updateOutletFn] = useUpdateOutletMutation();
  const [removeOutletFn] = useRemoveOutletMutation();
  const [fetchOutletsFn] = useLazyFetchOutletsQuery();
  const [fetchOutletByIdFn] = useLazyFetchOutletByIdQuery();
  const { data: vendorOutletsData } = useFetchOutletsQuery(token);

  useEffect(() => {
    notificationMsg("info", vendorOutletsData?.message);
  }, [vendorOutletsData]);

  const onUpdateOutletClick = (outlet) => {
    try {
      storeNameRef.current.value = outlet.storeName;
      descriptionRef.current.value = outlet.description;
      storeImgRef.current.value = outlet.storeImg;
      storeDiscountRef.current.value = outlet.storeDiscount;
      setOutletDetails(outlet);
      setEditFlag(true);
      notificationMsg("warning", `updating ${outlet.storeName} details`);
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  const onRemoveOutletClick = async (outletId) => {
    try {
      const outletDetailsData = await fetchOutletByIdFn({ outletId, token });
      await removeOutletFn({ id: outletId, token });
      notificationMsg(
        "default",
        `${outletDetailsData.data.store.storeName} & it's Products were Removed`,
      );
      await fetchOutletsFn(token);
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  const onOutletDetailsSubmit = async () => {
    event.preventDefault();
    const outletForm = new FormData(event.target);
    const outletFormData = Object.fromEntries(outletForm.entries());
    event.target.reset();
    if (editFlag) {
      const updateOutletData = await updateOutletFn({
        outletInfo: {
          _id: outletDetails._id,
          ...outletFormData,
        },
        token,
      });
      setEditFlag(false);
      notificationMsg("success", updateOutletData.data.message);
    } else {
      const createdOutletData = await createOutletFn({
        outletInfo: outletFormData,
        token,
      });
      notificationMsg("success", createdOutletData.data.message);
    }
    await fetchOutletsFn(token);
  };

  return (
    <>
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
        <input
          type="text"
          name="storeImg"
          id="outletImgId"
          placeholder="Provide Store Image URL Here"
          ref={storeImgRef}
        />
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
        {vendorOutletsData &&
          vendorOutletsData?.storesList?.map((outlet) => (
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
    </>
  );
}
export default Outlets;
