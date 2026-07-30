import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow">

        {blog.image && (
          <img
            src={blog.image}
            className="card-img-top"
            alt={blog.title}
            style={{ height: "220px", objectFit: "cover" }}
          />
        )}

        <div className="card-body">

          <h4>{blog.title}</h4>

          <p>
            {blog.content.substring(0, 120)}...
          </p>

          <span className="badge bg-primary mb-3">
            {blog.category}
          </span>

          <br />

          <Link
            to={`/blog/${blog._id}`}
            className="btn btn-dark"
          >
            Read More
          </Link>

        </div>
      </div>
    </div>
  );
}

export default BlogCard;