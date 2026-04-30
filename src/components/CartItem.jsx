function CartItem({ item, onDecrement, onIncrement, onRemove }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm text-center">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "220px" }}
        >
          <img
            src={item.product?.productImageUrl}
            alt={item.product?.productName}
            className="img-fluid"
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain", // ensures full image fits without cropping
            }}
          />
        </div>

        <div className="card-body d-flex flex-column justify-content-center">
          <h5 className="card-title fw-bold mb-3">
            {item.product?.productName}
          </h5>

          <div className="mb-3">
            <span className="text-muted text-decoration-line-through me-2 fs-6">
              ₹{item.product?.price}
            </span>
            <span className="fw-bold text-success fs-4">
              ₹{item.product?.sellingPrice}
            </span>
          </div>

          <div className="mb-3">
            <p className="mb-1">
              Quantity: <strong>{item.quantity}</strong>
            </p>
            <p className="mb-1">
              Discount: <strong>{item.product?.productDiscount}%</strong>
            </p>
          </div>

          <div className="d-flex justify-content-center align-items-center mb-3">
            <img
              src={item.product.store.storeImg}
              alt={item.product.store.storeName}
              className="rounded-circle me-2"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
            <span className="fw-semibold">{item.product.store.storeName}</span>
          </div>

          <div className="d-flex justify-content-center align-items-center mb-3">
            <img
              src={item.product?.store.owner.profileImg}
              alt={item.product?.store.owner.username}
              className="rounded-circle me-2"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover", // avatar cropped neatly
              }}
            />
            <span className="fw-semibold">
              {item.product?.store.owner.username}
            </span>
          </div>

          <div className="btn-group w-100">
            <button
              className="btn btn-outline-danger"
              onClick={() => onDecrement(item)}
            >
              <i className="bi bi-dash-circle"></i> 1
            </button>
            <button
              className="btn btn-outline-success"
              onClick={() => onIncrement(item)}
            >
              <i className="bi bi-plus-circle"></i> 1
            </button>
            <button
              className="btn btn-outline-dark"
              onClick={() => onRemove(item)}
            >
              <i className="bi bi-x-circle"></i> Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
