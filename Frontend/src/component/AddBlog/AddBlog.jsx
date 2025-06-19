import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UseUser from "../UserContext/UserContext";
import "./AddBlog.css";

export default function AddBlog() {
  const { CurrentUser, setAllBlogs } = UseUser();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const navigate = useNavigate();

  // ✅ Redirect to signin if not logged in
  useEffect(() => {
    if (!CurrentUser) {
      toast.error("You must be logged in to create a blog.");
      navigate("/signin");
    }
  }, [CurrentUser, navigate]);

  const handleBlogSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("coverImage", coverImage);
    formData.append("userId", CurrentUser.id);

    try {
      const res = await axios.post("http://localhost:3000/blog/addNewBlog", formData, {
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
      navigate("/home");
    } catch (error) {
      toast.error("Failed to create blog.");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="create-blog-container">
      <form onSubmit={handleBlogSubmit} encType="multipart/form-data">
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
