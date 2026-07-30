import { useEffect, useState } from "react";
import API from "../services/api";
import BlogCard from "../components/BlogCard";
import Loader from "../components/Loader";

function Home() {

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {

      const res = await API.get("/blogs");

      setBlogs(res.data.blogs);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) return <Loader />;

  return (

    <div>

      <h2 className="mb-4">
        Latest Blogs
      </h2>

      <div className="row">

        {blogs.length === 0 ? (
          <h4>No Blogs Available</h4>
        ) : (
          blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
            />
          ))
        )}

      </div>

    </div>

  );
}

export default Home;