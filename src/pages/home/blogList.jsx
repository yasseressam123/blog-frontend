import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogList = (props) => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editId, setEditId] = useState("");

  const handleClose = () => setShow(false);
  const handleEditClose = () => setShowEdit(false);

  const handleShow = (id) => {
    setShow(true);
    setDeleteId(id);
  };
  const handleShowEdit = (id) => {
    setShowEdit(true);
    setEditId(id);
  };
  const handleDelete = () => {
    setShow(false);
    props.deletePost(deleteId);
  };
  const handleEdit = (event) => {
    event.preventDefault();
    setShowEdit(false);
    props.editPost(editId,{title,body});
  };

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [bodyError, setBodyError] = useState(false);
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleBody = (event) => {
    setBody(event.target.value);
    if (event.target.value.length > 1000) {
      setBodyError(true);
    } else {
      setBodyError(false);
    }
  };

  return (
    <div>
      <div className="mt-5">
        {props.blogData.map((blog) => {
          return (
            <div key={blog.id} className="card w-100">
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/post/${blog.id}`}>{blog.title}</Link>
                </h5>
                {/* <p className="card-text">{blog.body}</p> */}
                {
                  blog.body.length > 400?
                    (
                      <>
                        <p className="card-text">{blog.body.slice(0,400)}</p>
                        <Link to={`/post/${blog.id}`}>see more</Link>
                      </>
                    )
                  : (<p className="card-text">{blog.body}</p>)
                }
                <div className="d-flex justify-content-between">
                  <p>
                    Published At <span>{blog.publishDate}</span>
                  </p>
                  <div className="d-flex">
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleShowEdit(blog.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleShow(blog.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEdit} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="mt-5">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                required
                onChange={handleTitle}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Message
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                required
                onChange={handleBody}
              ></textarea>
              <p className={bodyError ? "bodyError" : "d-none"}>
                Please message should not exceed 1000 characters
              </p>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            cancel
          </Button>
          <Button disabled={bodyError} variant="primary" onClick={handleEdit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BlogList;
