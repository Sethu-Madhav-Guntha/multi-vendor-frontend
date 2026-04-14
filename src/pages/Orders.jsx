import { useSelector } from "react-redux";
import {
  useCancelOrderMutation,
  useGetCustomerOrdersQuery,
  useLazyGetCustomerOrdersQuery,
  useLazyGetOrderByIdQuery,
} from "../features/order/orderService";
import { useState } from "react";

function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const token = useSelector((state) => state?.authReducer?.token);

  const { data: customerOrders } = useGetCustomerOrdersQuery({ token });
  const [getCustomerOrdersFn] = useLazyGetCustomerOrdersQuery();
  const [cancelOrderFn] = useCancelOrderMutation();
  const [getOrderDetailsFn] = useLazyGetOrderByIdQuery();

  const onCancelOrderClick = async (orderId) => {
    await cancelOrderFn({ orderId, token });
    getCustomerOrdersFn({ token });
  };

  const onOrderDetailsClick = async (orderId) => {
    setSelectedOrder(orderId);
    await getOrderDetailsFn({ orderId, token });
  };

  return (
    <div>
      <h1>Orders Page</h1>
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
    </div>
  );
}
export default Orders;
