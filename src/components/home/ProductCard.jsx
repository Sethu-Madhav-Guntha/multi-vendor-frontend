function ProductCard({ product, isUser, onCartClick, onBuyClick }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm text-center">
        <img
          src={product.productImageUrl}
          alt={product.productName}
          className="card-img-top"
          style={{ height: "220px", objectFit: "contain" }}
        />

        <div className="card-body d-flex flex-column justify-content-center">
          <h5 className="card-title fw-bold mb-2">{product.productName}</h5>

          <div className="mb-2">
            <span className="text-muted text-decoration-line-through me-2 fs-6">
              ₹{product.price}
            </span>
            <span className="fw-bold text-success fs-4">
              ₹{product.sellingPrice}
            </span>
          </div>

          <ul className="list-unstyled small mb-3">
            <li>
              Quantity: <strong>{product.quantity}</strong>
            </li>
            <li>
              Product Discount: <strong>{product.productDiscount}%</strong>
            </li>
            <li>
              Store Discount: <strong>{product.store.storeDiscount}%</strong>
            </li>
          </ul>

          <div className="d-flex justify-content-center align-items-center mb-3">
            <img
              src={product.store.storeImg}
              alt={product.store.storeName}
              className="rounded-circle me-2"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
            <span className="fw-semibold">{product.store.storeName}</span>
          </div>

          <div className="d-flex justify-content-center align-items-center mb-3">
            <img
              src={product.store.owner.profileImg}
              alt={product.store.owner.username}
              className="rounded-circle me-2"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
            <span className="fw-semibold">{product.store.owner.username}</span>
          </div>

          {isUser && (
            <div className="btn-group w-100">
              <button
                className="btn btn-outline-primary"
                onClick={() => onCartClick(product._id, product.sellingPrice)}
              >
                <i className="bi bi-cart-plus"></i> Add to Cart
              </button>
              <button
                className="btn btn-outline-success"
                onClick={() => onBuyClick(product, product.sellingPrice)}
              >
                <i className="bi bi-bag-check"></i> Buy Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
