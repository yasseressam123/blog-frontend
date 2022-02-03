import React, { useState , useEffect } from 'react';
import axios from 'axios';
import BlogForm from './blogForm';
import BlogList from './blogList';


const Home = ()=>{
    const [blogData, setBlogData] = useState([]);
    const getNewData = (data)=>{

        axios.post(`http://localhost:3100/api/`,
        {
            ...data
        })
        .then(res => {
            console.log("res",res.data);
            getData()
        })
    }
    const getData= ()=>{
        axios.get(`http://localhost:3100/api/`,{headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(res => {
            console.log("res",res.data);
            setBlogData([...res.data.reverse()]);
        })
    }
    const deletePost = (id)=>{
        console.log("id",id);
        axios.delete(`http://localhost:3100/api/${id}`,{headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(res => {
            console.log("res",res);
            getData()
        })
    }
    const editPost = (id,data)=>{
        console.log("id",id);
        axios.patch(`http://localhost:3100/api/${id}`,{
            ...data
        })
        .then(res => {
            console.log("res",res);
            getData()
        })
    }
    useEffect(()=>{
        getData();
    },[])

    return(
        <div className='container'>
            <div className="row">
                <div className="col-12">
                    <BlogForm getNewData = {getNewData}/>
                </div>
                <div className="col-12">
                    <BlogList blogData = {blogData} deletePost={deletePost} editPost={editPost}/>
                </div>
            </div>
        </div>
    )
}
export default Home;