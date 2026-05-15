import React, { Component } from 'react';
import noImg from "../assets/no_img.jpg";

export default class NewsItem extends Component {
  render() {
    let { title, desc, imageurl, newsurl, author, date, source } = this.props;

    return (
      <div className="card news-card">
        
        <div className="source-badge">
          <span className="badge bg-danger">{source}</span>
        </div>

        <img
          src={imageurl || noImg}
          className="card-img-top news-img"
          alt="news"
          onError={(e) => (e.target.src = noImg)}
        />

        <div className="card-body">
          <h5 className="card-title">
            {title ? title.slice(0, 60) : "No Title"}...
          </h5>

          <p className="card-text">
            {desc ? desc.slice(0, 100) : "No description available"}...
          </p>

          <p className="card-text">
            <small className="text-muted">
              By {author || "Unknown"} on{" "}
              {date ? new Date(date).toGMTString() : "Unknown date"}
            </small>
          </p>

          <a
            href={newsurl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-dark btn-sm"
          >
            Read more
          </a>
        </div>
      </div>
    );
  }
}