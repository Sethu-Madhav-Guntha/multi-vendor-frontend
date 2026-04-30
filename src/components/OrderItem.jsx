import React from "react";
import { useSelector } from "react-redux";

import { selectIsUser, selectIsVendor } from "../features/auth/authSelectors";

function OrderItem({
  order,
  selectedOrder,
  onCancel,
  onDetails,
  onStatusChange,
}) {
  const isVendor = useSelector(selectIsVendor);
  const isUser = useSelector(selectIsUser);

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Order #{order._id}</h5>
        <p className="card-text">
          <strong>Status:</strong> {order.status} <br />
          <strong>Total:</strong> ₹{order.totalAmount}
        </p>

        <div className="row">
          {order.items.map((item) => (
            <div className="col-md-4 mb-3" key={item._id}>
              <div className="card h-100 text-center">
                <img
                  src={item.product?.productImageUrl}
                  alt={item.product?.productName}
                  className="card-img-top"
                  style={{ height: "150px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h6 className="fw-bold">{item.product?.productName}</h6>
                  <p className="mb-1">Qty: {item.quantity}</p>
                  {selectedOrder === order._id && (
                    <>
                      <p className="small text-muted">
                        Store: {item.product?.store?.storeName}
                      </p>
                      <p className="small text-muted">
                        Store Discount: {item.product?.store?.storeDiscount}%
                      </p>
                      <p className="small text-muted">
                        Product Discount: {item.product?.productDiscount}%
                      </p>
                      <p className="card-text">
                        <span className="text-muted text-decoration-line-through me-2">
                          ₹{item.product?.price}
                        </span>
                        <span className="fw-bold text-success fs-5">
                          ₹{item.product?.sellingPrice}
                        </span>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-between mt-3">
          {isUser && order.status === "Pending" && (
            <button
              className="btn btn-outline-danger"
              onClick={() => onCancel(order)}
            >
              <i className="bi bi-x-circle"></i> Cancel Order
            </button>
          )}
          <button
            className="btn btn-outline-info"
            onClick={() => onDetails(order._id)}
          >
            <i className="bi bi-info-circle"></i> Order Details
          </button>
        </div>

        {isVendor && selectedOrder === order._id && (
          <div className="mt-3">
            <label className="form-label">Update Status</label>
            <select
              className="form-select"
              value={order.status}
              onChange={(e) => onStatusChange(order, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderItem;
