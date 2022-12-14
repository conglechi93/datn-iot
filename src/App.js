import './App.css';
import { Button, Input, Switch } from 'antd';
// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore, 
//   ///collection, getDocs 
// } from 'firebase/firestore/lite';
import SoundWaveImg from './image/soundwave.webp'
import {ref, set, get, update, remove, child} from 'firebase/database'
import { useEffect, useState } from "react";
import FanOnIcon from './image/fan_on.png';
import FanOffIcon from './image/fan_off.png';
import MistOnIcon from './image/mist_on.png';
import MistOffIcon from './image/mist_off.png';
import PinOnIcon from './image/pin_on.png';
import PinOffIcon from './image/pin_off.png';
import { Crud } from './components/crud';
import StartFirebase from './firebaseConfig';
import GetImageA from './components/getImage';




function App() {
  const db = StartFirebase();
  const [srcFan, setSrcFan] = useState();
  const [checkFan, setCheckFan] = useState(true);

  const [srcMist, setSrcMist] = useState();
  const [checkMist, setCheckMist] = useState(true);
  
  const [srcPin1, setSrcPin1] = useState();
  const [checkPin1, setCheckPin1] = useState(true);

  const [srcPin2, setSrcPin2] = useState();
  const [checkPin2, setCheckPin2] = useState(true);

  const [humidity, setHumidity] = useState(0);
  const [temperature, setTemperature] = useState(0);

  const [inputValue, setInputValue] = useState(() => {
    const dbRef = ref(db);
    get(child(dbRef,'DAIOT/threshold/')).then((snapshot) => {
      if(snapshot.exists()) {
        return snapshot.val().toString();
      }
    })
  }
    
  );


  const getData = () => {
    const dbRef = ref(db);
    get(child(dbRef,'DAIOT/humidity')).then((snapshot) => {
      if(snapshot.exists()) {
        setHumidity(snapshot.val());
      }
    })

    get(child(dbRef,'DAIOT/temperature')).then((snapshot) => {
      if(snapshot.exists()) {
        setTemperature(snapshot.val());
      }
    })
    get(child(dbRef,'DAIOT/modepin1')).then((snapshot) => {
      if(snapshot.exists()) {
        console.log(snapshot.val())
        if(snapshot.val() == true) {
          setSrcPin1(PinOnIcon)
          setCheckPin1(true);
        }
        else {
          
          setSrcPin1(PinOffIcon);
          setCheckPin1(false)
        }
      }
    })

    get(child(dbRef,'DAIOT/modepin2')).then((snapshot) => {
      if(snapshot.exists()) {
          if(snapshot.val() == true) {
            setSrcPin2(PinOnIcon)
            setCheckPin2(true);
          }
          else {
            setSrcPin2(PinOffIcon)
            setCheckPin2(false);
          }
      }
    })

    get(child(dbRef,'DAIOT/modefan')).then((snapshot) => {
      if(snapshot.exists()) {
        if(snapshot.val() == true) {
          setSrcFan(FanOnIcon)
          setCheckFan(true);
        }
        else {
          setSrcFan(FanOffIcon)
          setCheckFan(false);
        }
      }
    })

    get(child(dbRef,'DAIOT/modemist')).then((snapshot) => {
      if(snapshot.exists()) {
        if(snapshot.val() == true) {
          setSrcMist(MistOnIcon)
          setCheckMist(true);
        }
        else {
          setSrcMist(MistOffIcon)
          setCheckMist(false);
        }
      }
    })

  }

  useEffect(() => {
    setInterval(() => {
      getData();
    }
    , 300);
  })

  

  const updateData = ({device, mode}) => {
    console.log(mode, inputValue)
    const value = inputValue ? inputValue : '25'
    if(device == 'modefan') {
      update(ref(db,'DAIOT/'),
      {
        modefan: mode,
        modemist: checkMist,
        modepin1: checkPin1,
        modepin2: checkPin2,
        modeauto: autoCheck,
        threshold: value,
        temperature: temperature,
        humidity: humidity,

      }).then(
          () => {
              console.log('Update data success');
          } 
      )
      .catch((error) => alert("Err: " + error));
    }

    if(device == 'modepin1') {
      update(ref(db,'DAIOT/'),
      {
        modefan: checkFan,
        modemist: checkMist,
        modepin1: mode,
        modepin2: checkPin2,
        modeauto: autoCheck,
        threshold: value,
        temperature: temperature,
        humidity: humidity,
      }).then(
          () => {
              console.log('Update data success');
          } 
      )
      .catch((error) => alert("Err: " + error));
    }

    if(device == 'modepin2') {
      update(ref(db,'DAIOT/'),
      {
        modefan: checkFan,
        modemist: checkMist,
        modepin1: checkPin1,
        modepin2: mode,
        modeauto: autoCheck,
        threshold: value,
        temperature: temperature,
        humidity: humidity,
      }).then(
          () => {
              console.log('Update data success');
          } 
      )
      .catch((error) => alert("Err: " + error));
    }

    if(device == 'modemist') {
      update(ref(db,'DAIOT/'),
      {
        modefan: checkFan,
        modemist: mode,
        modepin1: checkPin1,
        modepin2: checkPin2,
        modeauto: autoCheck,
        threshold: value,
        temperature: temperature,
        humidity: humidity,
      }).then(
          () => {
              console.log('Update data success');
          } 
      )
      .catch((error) => alert("Err: " + error));
    }
    
    
}

  const onChangeFan = (e) => {
    console.log(e)
    const device = 'modefan';
    let mode;
    if(e) {
      mode = true;
      setSrcFan(FanOnIcon)
      setCheckFan(true)
      updateData({device, mode})
    }
    else {
      mode = false;
      setSrcFan(FanOffIcon)
      setCheckFan(false)
      updateData({device, mode})
    }
  }

  const onChangeMist = (e) => {
    console.log(e)
    const device = 'modemist';
    let mode;
    if(e) {
      mode = true;
      
      setSrcMist(MistOnIcon)
      setCheckMist(true)
      updateData({device, mode})

    }
    else {
      mode = false;
      setSrcMist(MistOffIcon);
      setCheckMist(false)
      updateData({device, mode})
    }
  }

  
  // Initialize Firebase
  const onChangePin1 = (e) => {
    console.log(e);
    const device = 'modepin1';
    let mode;
    if(e) {
      mode = true;
      
      setSrcPin1(PinOnIcon);
      setCheckPin1(true);
      updateData({device, mode})
    }
    else {
      mode = false;
      
      setSrcPin1(PinOffIcon);
      setCheckPin1(false);
      updateData({device, mode})
    }    
  };

  const onChangePin2 = (e) => {
    const device = 'modepin2';
    let mode;
    if(e) {
      mode = true;
      updateData({device, mode})
      setSrcPin2(PinOnIcon)
      setCheckPin2(true);
    }
    else {
      mode = false;
      updateData({device, mode})
      setSrcPin2(PinOffIcon);
      setCheckPin2(false);
    }    
    
  };

  useEffect(() => {
    setSrcFan(FanOnIcon);
    setSrcPin1(PinOnIcon);
    setSrcPin2(PinOnIcon);
    setSrcMist(MistOnIcon);
  }, [])

  const [autoCheck, setAutoCheck] = useState(true);

  const handleAutocheck = () => {
    setAutoCheck(!autoCheck);
    update(ref(db,'DAIOT/'),
    {
      modeauto: !autoCheck
    }).then(
      () => {
          console.log('Update data success');
      } 
    )
    .catch((error) => alert("Err: " + error));
  }

  const ChangeInputVale = () => {
    set(ref(db,'DAIOT/'),
    {
      threshold: inputValue
    }).then(
      () => {
          console.log('Update data success');
      } 
    )
    .catch((error) => alert("Err: " + error));
  }


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
              <Switch defaultChecked style={{margin:"auto"}} checked={autoCheck} onClick={handleAutocheck}/>
            </div>
            <div style={{marginBottom:"20px"}}>Chọn giá trị</div>
            <div style={{display:"flex", justifyContent:"space-between",textAlign:"center"}}>
              <Input className='input-type' value={inputValue} onChange={e => setInputValue(e.target.value)}/>
              <Button className='button-type' onClick={ChangeInputVale}>Thiết lập</Button>
            </div>   
          </div>
          <div className='column-2'>
            <div className='footer'>
              <div className='footer-child'>
                <p>ĐÈN 1-2</p>
                <Switch defaultChecked onChange={onChangePin1} checked={checkPin1}/>
                <div className='form-img'>
                  <img className='img-ico' src={srcPin1}></img>
                </div>
                
              </div>
              <div className='footer-child'>
                <p>ĐÈN 3-4</p>
                <Switch defaultChecked onChange={onChangePin2} checked={checkPin2}/>
                <div className='form-img'>
                  <img className='img-ico' src={srcPin2}></img>
                </div>
              </div>
              <div className='footer-child'>
                <p>QUẠT</p>
                <Switch defaultChecked onChange={onChangeFan} checked={checkFan}/>
                <div className='form-img'>
                  <img className='img-ico' src={srcFan}></img>
                </div>
              </div>
              <div className='footer-child'>
                <p>PHUN SƯƠNG</p>
                <Switch defaultChecked onChange={onChangeMist} checked={checkMist}/>
                <div className='form-img'>
                  <img className='img-ico' src={srcMist}></img>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div style={{textAlign:"center"}}>
          <div style={{textAlign:"center"}}>SOUND WAVE</div>
          <img src={SoundWaveImg}></img>
          <div>
          <button>Chọn file</button>
          </div>
          
        </div>


        <div className="form-header">
          <div className='form-column'>
            <div className='content-title'>
              Sensor
            </div>
            <div className='content-form'>
              <div className='content-left'>
                <p>Humidity</p>
                <p>{humidity.toFixed(1)} %</p>
              </div>
              <div className='content-right'>
                <div className='rule'></div>
              </div>
            </div>
            <div className='content-form'>
              <div className='content-left'>
                <p>Temperature</p>
                <p>{temperature.toFixed(1)} C</p>
              </div>
              <div className='content-right'>
                <div className='rule2'></div>
              </div>
            </div>
          </div>
          <div className='form-column camera-image'>
            <div style={{margin:"10px 0"}}>Camera</div>
            <GetImageA></GetImageA>
          </div>
        </div>

      
      </header>
    </div>
  );
}

export default App;
