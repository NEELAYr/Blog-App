import React, { useState, useRef, useEffect, useReducer } from "react";

function blogsReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.blog, ...state];
    case "REMOVE":
      return state.filter((_, index) => index !== action.index);
    default:
      return [];
  }
}

export default function Blog() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [blogs, dispatch] = useReducer(blogsReducer, []);
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  useEffect(() => {
    document.title = blogs.length && blogs[0].title
      ? blogs[0].title
      : "No Blogs Added!";
  }, [blogs]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: "ADD",
      blog: { title: formData.title, content: formData.content },
    });
    setFormData({ title: "", content: "" });
    titleRef.current.focus();
  }

  function removeBlog(i) {
    dispatch({ type: "REMOVE", index: i });
  }

  return (
    <div className="blog-container">
      <h1>Write a Blog!</h1>
      <div className="section">
        <form onSubmit={handleSubmit}>
          <Row label="Title">
            <input
              ref={titleRef}
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="input"
              placeholder="Enter the Title of the Blog here..."
              required
            />
          </Row>
          <Row label="Content">
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="input content"
              placeholder="Content of the Blog goes here..."
              required
            />
          </Row>
          <button className="btn" type="submit">
            ADD
          </button>
        </form>
      </div>
      <hr />
      <h2>Blogs</h2>
      <div className="blog-list">
        {blogs.map((blog, i) => (
          <div className="blog" key={i}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <div className="blog-btn">
              <button onClick={() => removeBlog(i)} className="btn remove">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div className="form-row">
      <label>{label}</label>
      {children}
    </div>
  );
}