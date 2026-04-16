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
import { useEffect, useState } from "react";
import { useFetchOutletsQuery } from "../features/outlet/outletService";
import { skipToken } from "@reduxjs/toolkit/query";

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

  useEffect(() => {
    getCustomerOrdersFn({ token });
  }, []);

  const onCancelOrderClick = async (orderId) => {
    await cancelOrderFn({ orderId, token });
    getCustomerOrdersFn({ token });
  };

  const onOrderDetailsClick = async (orderId) => {
    setSelectedOrder(orderId);
    await getOrderDetailsFn({ orderId, token });
  };

  const onStoreSelectionChange = () => {
    setSelectedStore({
      storeId: event.target.value,
      storeName: event.target.options[event.target.selectedIndex].text,
    });
  };

  const onStatusChange = async (orderId, newStatus) => {
    await updateOrderStatusFn({ orderId, status: newStatus, token });
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
  };

  let ordersData = selectedStore.storeId === "All" ? vendorOrders : storeOrders;

  return (
    <div>
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
                      <h5>{item?.product?.productName}</h5>
                      <h6>Quantity: {item?.quantity}</h6>
                    </li>
                  ))}
                  {selectedOrder === order._id && (
                    <>
                      <h5>Store Name: {order?.store?.storeName}</h5>
                      <h5>Total: {order?.totalAmount}</h5>
                      <h5>Status: {order?.status}</h5>
                    </>
                  )}
                </ul>
                <button
                  onClick={() => onCancelOrderClick(order._id)}
                  disabled={order?.status !== "Pending"}
                >
                  Cancel Order
                </button>
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
            value={selectedStore}
            onChange={onStoreSelectionChange}
          >
            <option value="All" selected>
              All Stores
            </option>
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
          {console.log(ordersData)}
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
                    <label htmlFor="updateStatusId">Update Status</label>
                    <select
                      id="updateStatusId"
                      value={order.status}
                      onChange={(e) =>
                        onStatusChange(order._id, e.target.value)
                      }
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
    </div>
  );
}
export default Orders;
