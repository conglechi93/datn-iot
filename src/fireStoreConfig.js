import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
function StartStore () {
  
    const firebaseConfig = {
      apiKey: "AIzaSyBJAQ9KqYJQgqfWGMRAmXEdBFovGpbqGrg",
      authDomain: "datn-pyrebase.firebaseapp.com",
      databaseURL: "https://datn-pyrebase-default-rtdb.firebaseio.com",
      projectId: "datn-pyrebase",
      storageBucket: "datn-pyrebase.appspot.com",
      messagingSenderId: "258914601635",
      appId: "1:258914601635:web:5cb1b3da7718815c408d16",
      measurementId: "G-4GC4RKJL6T"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    return getStorage(app);
  }
  export default StartStore;