import React from "react";

function OutletForm({ editFlag, onSubmit, refs }) {
  return (
    <div className="card shadow-sm p-4 mb-4">
      <h4 className="mb-3">{editFlag ? "Update" : "Create"} Outlet</h4>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="storeNameId" className="form-label">
            Store Name
          </label>
          <input
            type="text"
            name="storeName"
            id="storeNameId"
            className="form-control"
            ref={refs.storeNameRef}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="descriptionId" className="form-label">
            Description
          </label>
          <textarea
            name="description"
            id="descriptionId"
            className="form-control"
            ref={refs.descriptionRef}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="outletImgId" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            name="storeImg"
            id="outletImgId"
            className="form-control"
            ref={refs.storeImgRef}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="storeDiscountId" className="form-label">
            Store Discount (%)
          </label>
          <input
            type="number"
            name="storeDiscount"
            id="storeDiscountId"
            className="form-control"
            defaultValue={0}
            ref={refs.storeDiscountRef}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {editFlag ? (
            <i className="bi bi-pencil-square"></i>
          ) : (
            <i className="bi bi-plus-circle"></i>
          )}{" "}
          {editFlag ? "Update" : "Create"} Outlet
        </button>
      </form>
    </div>
  );
}

export default OutletForm;
