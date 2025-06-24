import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UseUser from "../UserContext/UserContext";
import "./AddBlog.css";
import axiosInstance from "../API/axiosInstance";

export default function AddBlog() {
  const { CurrentUser, setCurrentUser, setAllBlogs } = UseUser();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/home");
        setCurrentUser(res.data.user);
        const blogs = res.data.blogs || [];
        setAllBlogs(blogs);
      } catch (error) {
        navigate("/signin");
        console.error("Error fetching home data:", error);
      }
    };
    fetchData();
  }, []);


  const handleBlogSubmit = async (e) => {
    e.preventDefault();

    console.log("from handleblog",CurrentUser)

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("coverImage", coverImage);
    formData.append("userId", CurrentUser._id);

    try {
      const res = await axiosInstance.post("/blog/addNewBlog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ Add new blog to AllBlogs if it's not already present
      setAllBlogs((prevBlogs) => {
        const alreadyExists = prevBlogs.some(
          (b) => b._id === res.data.blog._id
        );
        return alreadyExists ? prevBlogs : [...prevBlogs, res.data.blog];
      });

      toast.success("Blog created successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to create blog.");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="create-blog-container">
      <form onSubmit={handleBlogSubmit} className="form-containe" encType="multipart/form-data">
        <div className="form-group">
          <label className="cover-label">Cover Image</label>
          <input
            type="file"
            name="coverImage"
            onChange={(e) => setCoverImage(e.target.files[0])}
            required
          />
        </div>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            required
          />
        </div>

        <div className="form-group">
          <label>Body</label>
          <textarea
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your blog content here..."
            rows={5}
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}
