import React from "react";
import axios from "axios";

export default function Images({bookData, data_key}) {
  const [imageData, setImageData] = React.useState();
  const [images, setImages] = React.useState([]);
  const bookCode = bookData?.[0]?.code;
  
  React.useEffect(() => {
    const getImageData = async () => {
      const response = await axios.get(
        `/resources/search?resourceType=Images&languageCode=eng&bookCode=${bookCode}&limit=100`,
        {
          headers: {
            "api-key": data_key,
          },
        }
      );
      setImageData(response.data.items[0].id);
    };
   bookCode && data_key && getImageData();
  }, [bookCode,data_key]);

  React.useEffect(() => {
    const imageSet = async () => {
      const res = await axios.get(`/resources/${imageData}`, {
        headers: {
          "api-key": data_key,
        },
      });
      setImages(res.data);
    };

    imageData && data_key && imageSet();
  }, [data_key,imageData]);

  return (
    <div>
      <h1>{images?.name}</h1>
      <img
        src={images?.content?.url}
        alt={images?.name}
        width="640px"
        height="480px"
      ></img>
    </div>
  );
}
