import { useState, useEffect } from "react";
import {
  ref,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import StartStore from "../../fireStoreConfig";

const GetImageA = () => {
  const [imageUrls, setImageUrls] = useState();
  const storage = StartStore();

  const imagesListRef = ref(storage, "");

  useEffect(() => {
    setInterval(() => {
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
              getDownloadURL(item).then((url) => {
                setImageUrls(url);
              });
            });
          });
    }
    , 300);
  })

  return (
    <>
        <img style={{width:"500px", height:"350px"}} src={imageUrls} />
    </>
  );
}

export default GetImageA;
