import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Loader from "../components/Loader";

function BlogDetail() {

  const { id } = useParams();

  const [blog, setBlog] = useState(null);

  useEffect(() => {

    fetchBlog();

  }, []);

  const fetchBlog = async () => {

    const res = await API.get(`/blogs/${id}`);

    setBlog(res.data.blog);

  };

  if (!blog) return <Loader />;

  return (

    <div className="card shadow p-4">

      <h1>{blog.title}</h1>

      <hr />

      <h5 className="text-primary">
        {blog.category}
      </h5>

      <p className="mt-3">
        {blog.content}
      </p>

    </div>

  );
}

export default BlogDetail;