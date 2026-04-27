import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";

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

function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStore, setSelectedStore] = useState({
    storeId: "All",
    storeName: "All Stores",
  });

  const token = useSelector((state) => state?.authReducer?.token);
  const userRole = useSelector((state) => state?.authReducer?.user?.role);

  const { data: customerOrders } = useGetCustomerOrdersQuery({ token });
  const [getCustomerOrdersFn] = useLazyGetCustomerOrdersQuery();
  const [cancelOrderFn] = useCancelOrderMutation();
  const [getOrderDetailsFn] = useLazyGetOrderByIdQuery();

  const { data: storeOrders } = useListStoreOrdersQuery(
    selectedStore.storeId !== "All"
      ? {
          storeId: selectedStore.storeId,
          token,
        }
      : skipToken,
  );
  const [listStoreOrdersFn] = useLazyListStoreOrdersQuery();
  const { data: vendorOrders } = useVendorOrdersQuery(
    selectedStore.storeId === "All" ? { token } : skipToken,
  );
  const [listVendorOrdersFn] = useLazyVendorOrdersQuery();
  const { data: vendorOutlets } = useFetchOutletsQuery(token);
  const [updateOrderStatusFn] = useUpdateOrderMutation();

  const { notificationMsg } = useNotifier();

  useEffect(() => {
    getCustomerOrdersFn({ token });
    notificationMsg("info", "Orders Fetched.");
  }, []);

  const onCancelOrderClick = async (order) => {
    try {
      await cancelOrderFn({ orderId: order._id, token });
      notificationMsg(
        "warning",
        `${order.items[0].product.productName} has been canceled.`,
      );
      getCustomerOrdersFn({ token });
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  const onOrderDetailsClick = async (orderId) => {
    try {
      setSelectedOrder(orderId);
      await getOrderDetailsFn({ orderId, token });
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  const onStoreSelectionChange = () => {
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
      await updateOrderStatusFn({
        orderId: order._id,
        status: newStatus,
        token,
      });
      if (selectedStore.storeId === "All") {
        listVendorOrdersFn(
          selectedStore.storeId === "All" ? { token } : skipToken,
        );
      } else {
        listStoreOrdersFn(
          selectedStore.storeId !== "All"
            ? {
                storeId: selectedStore.storeId,
                token,
              }
            : skipToken,
        );
      }
      notificationMsg(
        "info",
        `${order.items[0].product.productName} Order Updated.`,
      );
    } catch (err) {
      notificationMsg("error", err.message);
    }
  };

  let ordersData = selectedStore.storeId === "All" ? vendorOrders : storeOrders;

  return (
    <>
      <h1>Orders Page</h1>
      {userRole === "User" && (
        <>
          {customerOrders?.orders.length <= 0 && (
            <>
              <h2>There are no Orders to Display</h2>
            </>
          )}
          <ul>
            {customerOrders?.orders?.map((order) => (
              <li key={order._id}>
                <ul>
                  {order?.items?.map((item) => (
                    <li key={item._id}>
                      <img
                        src={item.product.productImageUrl}
                        alt={item.product.productName}
                      />
                      <h5>{item?.product?.productName}</h5>
                      <h6>Quantity: {item?.quantity}</h6>
                      <h5>Total: {order?.totalAmount}</h5>
                      <h5>Status: {order?.status}</h5>
                      {selectedOrder === order._id && (
                        <>
                          <h6>
                            Product Discount: {item?.product?.productDiscount}
                          </h6>
                          <h6>
                            Store Discount:{" "}
                            {item?.product?.store?.storeDiscount}
                          </h6>
                          <h6>Store Name: {item?.product?.store?.storeName}</h6>
                          <h6>Owner: {item?.product?.store?.owner.username}</h6>
                          <img
                            src={item?.product?.store?.owner.profileImg}
                            alt={item?.product?.store?.owner.username}
                            style={{ width: "100px", height: "100px" }}
                          />
                        </>
                      )}
                    </li>
                  ))}
                </ul>
                {order?.status === "Pending" && (
                  <>
                    <button
                      onClick={() => onCancelOrderClick(order)}
                      disabled={order?.status !== "Pending"}
                    >
                      Cancel Order
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    onOrderDetailsClick(order._id);
                  }}
                >
                  Order Details
                </button>
                <hr />
              </li>
            ))}
          </ul>
        </>
      )}
      {userRole === "Vendor" && (
        <>
          <label htmlFor="outletId">Choose Outlet Orders</label>
          <select
            name="outlet"
            id="outletId"
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
          <h1>
            Orders at &nbsp;
            {selectedStore.storeId === "All"
              ? "All Stores"
              : selectedStore.storeName}
          </h1>
          <ul>
            {ordersData?.orders?.map((order) => (
              <li key={order._id}>
                <ul>
                  {order?.items?.map((item) => (
                    <li key={item._id}>
                      <h4>Item: {item.product.productName}</h4>
                      <h5>Quantity: {item.quantity}</h5>
                      <h6></h6>
                    </li>
                  ))}
                </ul>
                {selectedOrder === order._id && (
                  <>
                    <h6>Store: {order.store.storeName}</h6>
                    <span>Current Status: {order.status}</span>
                    <h5>Ordered By: {order.user.username}</h5>
                    <img
                      src={order.user.profileImg}
                      alt={order.user.username}
                      style={{ width: "100px", height: "100px" }}
                    />
                    <br />
                    <label htmlFor="updateStatusId">Update Status</label>
                    <select
                      id="updateStatusId"
                      value={order.status}
                      onChange={(e) => onStatusChange(order, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  </>
                )}
                <button
                  onClick={() => {
                    onOrderDetailsClick(order._id);
                  }}
                >
                  Order Details
                </button>
                <hr />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
export default Orders;
