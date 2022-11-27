import './App.css';
import { Switch } from 'antd';
// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore, 
//   ///collection, getDocs 
// } from 'firebase/firestore/lite';
import { useEffect, useState } from "react";
import db from './firebaseConfig.js'




function App() {
  // const firebaseConfig = {
  //   apiKey: "AIzaSyBJAQ9KqYJQgqfWGMRAmXEdBFovGpbqGrg",
  //   authDomain: "datn-pyrebase.firebaseapp.com",
  //   projectId: "datn-pyrebase",
  //   storageBucket: "datn-pyrebase.appspot.com",
  //   messagingSenderId: "258914601635",
  //   appId: "1:258914601635:web:5cb1b3da7718815c408d16",
  //   measurementId: "G-4GC4RKJL6T"
  // };


  
  // Initialize Firebase
  const onChange = (e) => {
    console.log(e);
  };

  const [blogs,setBlogs]=useState([])
  const fetchBlogs=async()=>{
    const response= db.collection('blog');
    const data=await response.get();
    data.docs.forEach(item=>{
     setBlogs([...blogs,item.data()])
    })
  }
  useEffect(() => {
    fetchBlogs();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div className="form-header">
          <div className='form-column'>
            <div className='content-title'>
              Sensor
            </div>
            <div className='content-form'>
              <div className='content-left'>
                <p>Humidity</p>
                <p>66.2 %</p>
              </div>
              <div className='content-right'>
                <div className='rule'></div>
              </div>
            </div>
            <div className='content-form'>
              <div className='content-left'>
                <p>Temperature</p>
                <p>66.2 C</p>
              </div>
              <div className='content-right'>
                <div className='rule2'></div>
              </div>
            </div>
          </div>
          <div className='form-column'>AV</div>
        </div>

      <div className='footer'>
        <div className='footer-child'>
          <p>RELAY 1</p>
          <p>{"(ĐẤU CHUNG ĐÈN 2 ĐÈN 1 RELAY)"}</p>
          <Switch defaultChecked onChange={onChange} />
        </div>
        <div className='footer-child'>
          <p>RELAY 2</p>
          <p>{"(ĐẤU CHUNG ĐÈN 2 ĐÈN 1 RELAY)"}</p>
          <Switch defaultChecked onChange={onChange} />
        </div>
        <div className='footer-child'>
          <p>RELAY 3</p>
          <p>{"(ĐẤU CHUNG ĐÈN 2 QUẠT 1 RELAY)"}</p>
          <Switch defaultChecked onChange={onChange} />
        </div>
        <div className='footer-child'>
          <p>RELAY 4</p>
          <p>{"(ĐẤU CHUNG MOTOR PHUN SƯƠNG)"}</p>
          <Switch defaultChecked onChange={onChange} />
          {
            blogs && blogs.map(blog=>{
              return(
                <div className="blog-container">
                  <h4>{blog.title}</h4>
                  <p>{blog.body}</p>
                </div>
              )
            })
          }
        </div>
      </div>
      </header>
    </div>
  );
}

export default App;
