import { useEffect, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";

import {
  useCancelOrderMutation,
  useGetCustomerOrdersQuery,
  useLazyGetCustomerOrdersQuery,
  useLazyGetOrderByIdQuery,
  useLazyListStoreOrdersQuery,
  useLazyVendorOrdersQuery,
  useListStoreOrdersQuery,
  useUpdateOrderMutation,
  useVendorOrdersQuery,
} from "../features/order/orderService";
import { useFetchOutletsQuery } from "../features/outlet/outletService";
import { useNotifier } from "../hooks/useNotifier";
import OrderItem from "../components/OrderItem";
import { selectIsUser, selectIsVendor } from "../features/auth/authSelectors";

function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStore, setSelectedStore] = useState({
    storeId: "All",
    storeName: "All Stores",
  });
  const isVendor = useSelector(selectIsVendor);
  const isUser = useSelector(selectIsUser);

  const { data: customerOrders } = useGetCustomerOrdersQuery();
  const [getCustomerOrdersFn] = useLazyGetCustomerOrdersQuery();
  const [cancelOrderFn] = useCancelOrderMutation();
  const [getOrderDetailsFn] = useLazyGetOrderByIdQuery();

  const { data: storeOrders } = useListStoreOrdersQuery(
    selectedStore.storeId !== "All"
      ? { storeId: selectedStore.storeId }
      : skipToken,
  );
  const [listStoreOrdersFn] = useLazyListStoreOrdersQuery();

  const { data: vendorOrders } = useVendorOrdersQuery(
    selectedStore.storeId === "All" ? "" : skipToken,
  );
  const [listVendorOrdersFn] = useLazyVendorOrdersQuery();

  const { data: vendorOutlets } = useFetchOutletsQuery();
  const [updateOrderStatusFn] = useUpdateOrderMutation();

  const { notificationMsg } = useNotifier();

  useEffect(() => {
    getCustomerOrdersFn();
    notificationMsg("info", "Orders Fetched.");
  }, []);

  const onCancelOrderClick = async (order) => {
    try {
      await cancelOrderFn({ orderId: order._id });
      notificationMsg(
        "warning",
        `${order.items[0].product.productName} canceled.`,
      );
      getCustomerOrdersFn();
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  const onOrderDetailsClick = async (orderId) => {
    try {
      setSelectedOrder(orderId);
      await getOrderDetailsFn({ orderId });
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  const onStoreSelectionChange = (event) => {
    setSelectedStore({
      storeId: event.target.value,
      storeName: event.target.options[event.target.selectedIndex].text,
    });
    notificationMsg(
      "info",
      `${event.target.options[event.target.selectedIndex].text} Orders Fetched.`,
    );
  };

  const onStatusChange = async (order, newStatus) => {
    try {
      await updateOrderStatusFn({ orderId: order._id, status: newStatus });
      selectedStore.storeId === "All"
        ? listVendorOrdersFn("")
        : listStoreOrdersFn({ storeId: selectedStore.storeId });
      setSelectedOrder("");
      notificationMsg(
        "info",
        `${order.items[0].product.productName} status updated.`,
      );
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  const ordersData =
    selectedStore.storeId === "All" ? vendorOrders : storeOrders;

  return (
    <div className="container py-4">
      <h1 className="mb-4">📦 Orders</h1>

      {isUser && (
        <>
          {customerOrders?.orders?.length <= 0 ? (
            <div className="alert alert-info text-center">
              No orders to display
            </div>
          ) : (
            customerOrders?.orders?.map((order) => (
              <OrderItem
                key={order._id}
                order={order}
                selectedOrder={selectedOrder}
                onCancel={onCancelOrderClick}
                onDetails={onOrderDetailsClick}
              />
            ))
          )}
        </>
      )}

      {isVendor && (
        <>
          <div className="mb-3">
            <label htmlFor="outletId" className="form-label">
              Choose Outlet Orders
            </label>
            <select
              id="outletId"
              className="form-select"
              value={selectedStore.storeId}
              onChange={onStoreSelectionChange}
            >
              <option value="All">All Stores</option>
              {vendorOutlets?.storesList?.map((store) => (
                <option key={store._id} value={store._id}>
                  {store.storeName}
                </option>
              ))}
            </select>
          </div>

          <h2 className="mb-4">
            Orders at{" "}
            {selectedStore.storeId === "All"
              ? "All Stores"
              : selectedStore.storeName}
          </h2>

          {ordersData?.orders?.length <= 0 ? (
            <div className="alert alert-info text-center">
              No orders found for {selectedStore.storeName}
            </div>
          ) : (
            ordersData?.orders?.map((order) => (
              <OrderItem
                key={order._id}
                order={order}
                selectedOrder={selectedOrder}
                onDetails={onOrderDetailsClick}
                onStatusChange={onStatusChange}
              />
            ))
          )}
        </>
      )}
    </div>
  );
}

export default Orders;
