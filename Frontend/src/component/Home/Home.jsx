import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UseUser from "../UserContext/UserContext";
import { Link } from 'react-router-dom';
import "./Home.css";
import axiosInstance from "../API/axiosInstance"
const baseURL = axiosInstance.defaults.baseURL;
export default function Home() {
  const navigate = useNavigate();
  const { CurrentUser: user, AllBlogs: blogs } = UseUser();

  useEffect(() => {
    if (!user) {
      console.log("User not found in context, redirecting to signin");
      navigate("/signin");
    }
  }, [user, navigate]);
  return (
    <div className="blog-container">
      {/* <h1 className="blog-header">Welcome {user?.name}</h1>
      <h2 className="blog-subheader">All Blogs</h2> */}

      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <div className="blog-grid">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="blog-card"
              style={{ width: "100%", maxWidth: "300px" }}
            >
              <div style={{ width: "100%", height: "200px", overflow: "hidden" }}>
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/default.jpg";
                  }}
                />
              </div>
              <div className="blog-card-body">
                <h5 className="blog-card-title">{blog.title}</h5>
                <button style={{ backgroundColor: "transparent", border: "none" }}>
                  <Link to={`/blog/${blog._id}`} className="blog-view-link">
                    View
                  </Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
