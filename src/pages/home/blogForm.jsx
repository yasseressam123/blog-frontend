import React, { useState } from 'react';
import './home.css';

const BlogForm = (props) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [bodyError , setBodyError] = useState(false);
    const handleTitle = (event)=>{
        setTitle(event.target.value);
    }
    const handleBody = (event)=>{
        setBody(event.target.value);
        if(event.target.value.length > 1000){
            setBodyError(true);
        }else{
            setBodyError(false);
        }
    }
    const handleSubmit = (event)=>{
        event.preventDefault();
        props.getNewData({title,body})
        console.log("jg");
        setTitle("");
        setBody("");
    }
  return (
    <div>
      <form className="mt-5" onSubmit={handleSubmit}>
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
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Message
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            required
            onChange={handleBody}
          ></textarea>
          <p className={bodyError? "bodyError" : "d-none"}>Please message should not exceed 1000 characters</p>
        </div>
        <div className="mb-3 d-flex justify-content-end">
            <button disabled={bodyError} className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default BlogForm;
