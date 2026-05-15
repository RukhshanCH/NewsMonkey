import noImg from "../assets/no_img.jpg";

export default function NewsItem(props) {
    let { title, desc, imageurl, newsurl, author, date, source, category } = props;

    const categoryColors = {
        business: "#198754",
        domestic: "#212529",
        education: "#0d6efd",
        entertainment: "#dc3545",
        environment: "#20c997",
        food: "#fd7e14",
        health: "#e83e8c",
        lifestyle: "#6f42c1",
        politics: "#6610f2",
        science: "#0dcaf0",
        sports: "#ffc107",
        technology: "#343a40",
        tourism: "#198754",
        world: "#6c757d"
    };

    const badgeColor = categoryColors[category];

    return (
        <div className="card news-card">

            <div className="source-badge bg-secondary">
                <span className="badge" style={{ backgroundColor: badgeColor }}>
                    {source}
                </span>
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