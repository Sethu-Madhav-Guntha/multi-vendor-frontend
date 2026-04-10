import { useRef, useState } from "react";
import {
  useCreateOutletMutation,
  useFetchOutletsQuery,
  useLazyFetchOutletsQuery,
  useRemoveOutletMutation,
  useUpdateOutletMutation,
} from "../features/outlet/outletService";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Outlets() {
  const [editFlag, setEditFlag] = useState(false);
  const [outletDetails, setOutletDetails] = useState(null);

  const storeNameRef = useRef();
  const descriptionRef = useRef();

  const navigateFn = useNavigate();
  const dispatchFn = useDispatch();
  const token = useSelector((state) => state?.authReducer?.token);

  const [createOutletFn] = useCreateOutletMutation();
  const [fetchOutletsFn] = useLazyFetchOutletsQuery();
  const [updateOutletFn] = useUpdateOutletMutation();
  const [removeOutletFn] = useRemoveOutletMutation();
  const { data } = useFetchOutletsQuery(token);

  const onUpdateOutletClick = async (outlet) => {
    storeNameRef.current.value = outlet.storeName;
    descriptionRef.current.value = outlet.description;
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
    let outletInfo;
    if (editFlag) {
      outletInfo = await updateOutletFn({
        outletInfo: {
          _id: outletDetails._id,
          ...outletFormData,
        },
        token,
      });
      setEditFlag(false);
    } else {
      outletInfo = await createOutletFn({ outletInfo: outletFormData, token });
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
        <button type="submit">{editFlag ? "Update" : "Create"} Outlet</button>
      </form>

      <h2>Outlet List:</h2>

      <ul>
        {data &&
          data?.storesList?.map((outlet) => (
            <li key={outlet._id}>
              <Link to={`/outlets/${outlet._id}`}>{outlet.storeName}</Link>
              <div>{outlet.description}</div>
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
