function ProductForm({ editProduct, onSubmit, refs }) {
  return (
    <div className="card shadow-sm p-4 mb-4">
      <h4 className="mb-3">{editProduct ? "Update" : "Create"} Product</h4>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="productNameId" className="form-label">Product Name</label>
          <input type="text" name="productName" id="productNameId" className="form-control" ref={refs.productNameRef} />
        </div>

        <div className="mb-3">
          <label htmlFor="productDescriptionId" className="form-label">Description</label>
          <textarea name="description" id="productDescriptionId" className="form-control" ref={refs.descriptionRef}></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="priceId" className="form-label">Price</label>
          <input type="number" name="price" id="priceId" className="form-control" ref={refs.priceRef} />
        </div>

        <div className="mb-3">
          <label htmlFor="quantityId" className="form-label">Quantity</label>
          <input type="number" name="quantity" id="quantityId" className="form-control" ref={refs.quantityRef} />
        </div>

        <div className="mb-3">
          <label htmlFor="imageUrlId" className="form-label">Image URL</label>
          <input type="text" name="productImageUrl" id="imageUrlId" className="form-control" ref={refs.productImageUrlRef} />
        </div>

        <div className="mb-3">
          <label htmlFor="productDiscountId" className="form-label">Discount (%)</label>
          <input type="number" name="productDiscount" id="productDiscountId" className="form-control" defaultValue={0} ref={refs.productDiscountRef} />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {editProduct ? <i className="bi bi-pencil-square"></i> : <i className="bi bi-plus-circle"></i>} {editProduct ? "Update" : "Create"} Product
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
