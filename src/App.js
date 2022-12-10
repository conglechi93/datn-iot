import './App.css';
import { Button, Input, Switch } from 'antd';
// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore, 
//   ///collection, getDocs 
// } from 'firebase/firestore/lite';
import { useEffect, useState } from "react";
import db from './firebaseConfig.js'
import FanOnIcon from './image/fan_on.png';
import FanOffIcon from './image/fan_off.png';
import MistOnIcon from './image/mist_on.png';
import MistOffIcon from './image/mist_off.png';
import PinOnIcon from './image/pin_on.png';
import PinOffIcon from './image/pin_off.png';



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
  const [srcFan, setSrcFan] = useState();
  const [srcMist, setSrcMist] = useState();
  const [srcPin1, setSrcPin1] = useState();
  const [srcPin2, setSrcPin2] = useState();
  // const [srcFan, setSrcFan] = useState();
  // const [srcFan, setSrcFan] = useState()

  const onChangeFan = (e) => {
    console.log(e)
    if(e) setSrcFan(FanOnIcon)
    else setSrcFan(FanOffIcon)
  }

  const onChangeMist = (e) => {
    console.log(e)
    if(e) setSrcMist(MistOnIcon)
    else setSrcMist(MistOffIcon);
  }


  
  // Initialize Firebase
  const onChangePin1 = (e) => {
    console.log(e);
    if(e) setSrcPin1(PinOnIcon)
    else setSrcPin1(PinOnIcon);
    
  };

  const onChangePin2 = (e) => {
    if(e) setSrcPin2(PinOnIcon)
    else setSrcPin2(PinOffIcon);
    
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
    setSrcFan(FanOnIcon)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div className='form-tilte'>
          <div> Điều khiển nhiệt độ, độ ẩm giám sát chuồng trại chăn nuôi heo</div>
          <div> Luận văn tốt nghiệp 2022 </div>
        </div>

        <div className='form-header'>
          <div className='column-1'>
            <div>Chọn chế độ</div>
            <div style={{display:"flex", justifyContent:"space-between", margin:'auto', textAlign:"center"}}>
              <p>AUTO</p>
              <Switch defaultChecked style={{margin:"auto"}}/>
            </div>
            <div style={{marginBottom:"20px"}}>Chọn giá trị</div>
            <div style={{display:"flex", justifyContent:"space-between",textAlign:"center"}}>
              <Input className='input-type'/>
              <Button className='button-type'>Thiết lập</Button>
            </div>   
          </div>
          <div className='column-2'>
            <div className='footer'>
              <div className='footer-child'>
                <p>ĐÈN 1-2</p>
                <Switch defaultChecked onChange={onChangePin1} />
                <div className='form-img'>
                  <img className='img-ico' src={srcPin1}></img>
                </div>
                
              </div>
              <div className='footer-child'>
                <p>ĐÈN 3-4</p>
                <Switch defaultChecked onChange={onChangePin2} />
                <div className='form-img'>
                  <img className='img-ico' src={srcPin2}></img>
                </div>
              </div>
              <div className='footer-child'>
                <p>QUẠT</p>
                <Switch defaultChecked onChange={onChangeFan} />
                <div className='form-img'>
                  <img className='img-ico' src={srcFan}></img>
                </div>
              </div>
              <div className='footer-child'>
                <p>PHUN SƯƠNG</p>
                <Switch defaultChecked onChange={onChangeMist} />
                <div className='form-img'>
                  <img className='img-ico' src={srcMist}></img>
                </div>
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
          </div>
        </div>


        <div className='form-header'>
          <div>SOUND WAVE</div>
        </div>


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

      
      </header>
    </div>
  );
}

export default App;
