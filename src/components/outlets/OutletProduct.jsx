function OutletProduct({ product, onUpdate, onDelete }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm text-center">
        <img
          src={product.productImageUrl}
          alt={product.productName}
          className="card-img-top"
          style={{ height: "200px", objectFit: "contain" }}
        />
        <div className="card-body">
          <h5 className="card-title fw-bold">{product.productName}</h5>
          <p className="card-text">
            <span className="text-muted text-decoration-line-through me-2">
              ₹{product.price}
            </span>
            <span className="fw-bold text-success fs-5">
              ₹{product.sellingPrice}
            </span>
          </p>
          <p className="small">Quantity: {product.quantity}</p>
          <p className="small">Product Discount: {product.productDiscount}%</p>
          <p className="small">Store: {product.store.storeName}</p>
          <div className="btn-group w-100 mt-2">
            <button
              className="btn btn-outline-warning"
              onClick={() => onUpdate(product)}
            >
              <i className="bi bi-pencil"></i> Update
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => onDelete(product)}
            >
              <i className="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutletProduct;
