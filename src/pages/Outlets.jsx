import { useRef, useState, useEffect } from "react";

import { useNotifier } from "../hooks/useNotifier";
import {
  useCreateOutletMutation,
  useLazyFetchOutletByIdQuery,
  useFetchOutletsQuery,
  useLazyFetchOutletsQuery,
  useRemoveOutletMutation,
  useUpdateOutletMutation,
} from "../features/outlet/outletService";
import OutletForm from "../components/outlets/OutletForm";
import OutletCard from "../components/outlets/OutletCard";

function Outlets() {
  const [editFlag, setEditFlag] = useState(false);
  const [outletDetails, setOutletDetails] = useState(null);

  const refs = {
    storeNameRef: useRef(),
    descriptionRef: useRef(),
    storeImgRef: useRef(),
    storeDiscountRef: useRef(),
  };

  const { notificationMsg } = useNotifier();

  const [createOutletFn] = useCreateOutletMutation();
  const [updateOutletFn] = useUpdateOutletMutation();
  const [removeOutletFn] = useRemoveOutletMutation();
  const [fetchOutletsFn] = useLazyFetchOutletsQuery();
  const [fetchOutletByIdFn] = useLazyFetchOutletByIdQuery();
  const { data: vendorOutletsData } = useFetchOutletsQuery();

  useEffect(() => {
    notificationMsg("info", vendorOutletsData?.message);
  }, [vendorOutletsData]);

  const onUpdateOutletClick = (outlet) => {
    refs.storeNameRef.current.value = outlet.storeName;
    refs.descriptionRef.current.value = outlet.description;
    refs.storeImgRef.current.value = outlet.storeImg;
    refs.storeDiscountRef.current.value = outlet.storeDiscount;
    setOutletDetails(outlet);
    setEditFlag(true);
    notificationMsg("warning", `Updating ${outlet.storeName} details`);
  };

  const onRemoveOutletClick = async (outlet) => {
    try {
      await removeOutletFn({ id: outlet._id });
      notificationMsg(
        "default",
        `${outlet.storeName} & its Products were Removed`,
      );
      await fetchOutletsFn();
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  const onOutletDetailsSubmit = async (event) => {
    event.preventDefault();
    const outletForm = new FormData(event.target);
    const outletFormData = Object.fromEntries(outletForm.entries());
    event.target.reset();

    if (editFlag) {
      const updateOutletData = await updateOutletFn({
        outletInfo: { _id: outletDetails._id, ...outletFormData },
      });
      setEditFlag(false);
      notificationMsg("success", updateOutletData.data.message);
    } else {
      const createdOutletData = await createOutletFn({
        outletInfo: outletFormData,
      });
      notificationMsg("success", createdOutletData.data.message);
    }
    await fetchOutletsFn();
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">🏬 Outlets</h1>

      <OutletForm
        editFlag={editFlag}
        onSubmit={onOutletDetailsSubmit}
        refs={refs}
      />

      <h2 className="mb-3">Outlet List</h2>
      <div className="row">
        {vendorOutletsData?.storesList?.length > 0 ? (
          vendorOutletsData.storesList.map((outlet) => (
            <OutletCard
              key={outlet._id}
              outlet={outlet}
              onUpdate={onUpdateOutletClick}
              onRemove={onRemoveOutletClick}
            />
          ))
        ) : (
          <div className="alert alert-info text-center">
            No outlets available
          </div>
        )}
      </div>
    </div>
  );
}

export default Outlets;
