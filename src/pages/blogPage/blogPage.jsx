import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from 'react-router-dom';


const BlogPage = (props) => {
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3100/api/${id}`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log("res", res.data.blog);
        setBlog({...res.data.blog})
      });
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
            <div className="d-flex">
                <Link to='/'>Back</Link>
            </div>
        </div>
        <div className="col-12">
          <div className="card-body">
            <h5 className="card-title">
              {blog.title}
            </h5>
            <p className="card-text">{blog.body}</p>
            <div className="d-flex">
              <p>
                Published At <span>{blog.publishDate}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
