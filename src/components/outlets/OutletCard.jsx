import React from "react";
import { Link } from "react-router-dom";

function OutletCard({ outlet, onUpdate, onRemove }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm text-center">
        <img
          src={outlet.storeImg}
          alt={outlet.storeName}
          className="card-img-top"
          style={{ height: "200px", objectFit: "contain" }}
        />
        <div className="card-body">
          <h5 className="card-title fw-bold">{outlet.storeName}</h5>
          <p className="card-text">{outlet.description}</p>
          <p className="small text-muted">Discount: {outlet.storeDiscount}%</p>
          <Link
            to={`/outlets/${outlet._id}`}
            className="btn btn-outline-info mb-2 w-100"
          >
            <i className="bi bi-info-circle"></i> View Details
          </Link>
          <div className="btn-group w-100">
            <button
              className="btn btn-outline-warning"
              onClick={() => onUpdate(outlet)}
            >
              <i className="bi bi-pencil"></i> Update
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => onRemove(outlet)}
            >
              <i className="bi bi-trash"></i> Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutletCard;
