import React from "react";

export default function NewsItemSkeleton() {
  return (
    <div className="card" aria-hidden="true">
      <div className="placeholder-glow">
        <div className="placeholder col-12" style={{ height: "200px" }}></div>
        <div className="card-body">
          <p className="placeholder col-6"></p>
          <p className="placeholder col-8"></p>
          <p className="placeholder col-4"></p>
        </div>
      </div>
    </div>
  );
}