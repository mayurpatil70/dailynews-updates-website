import React from "react";

const NewsItem =(props)=> {

    let { title, description, urlToImage, newsUrl, author, date, source } = props;
    return (
      <>
        <div className="card">
        <div>
        <span
              className=" badge bg-danger" style={{
                display:'flex',
                justifyContent:'flex-end',
                position:'absolute',
                right:'0'
              }}
            >
              {source}
            </span>
        </div>
          <img
            src={urlToImage}
            className="card-img-top"
            alt="..."
            style={{ height: "250px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                {author ? author : "Unknown"} {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsUrl} className="btn btn-sm btn-dark" target="blank">
              Read More
            </a>
          </div>
        </div>
      </>
    );
}

export default NewsItem;
