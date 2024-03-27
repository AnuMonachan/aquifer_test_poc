import React from "react";
import axios from "axios";

export default function Images() {
  const [imageData, setImageData] = React.useState();
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    const getImageData = async () => {
      const response = await axios.get(
        "/resources/search?resourceType=Images&languageCode=eng&bookCode=GEN&limit=100",
        {
          headers: {
            "api-key": "cb28f77b0a974656bc066e5d19e370c0",
          },
        }
      );
      setImageData(response.data.items[0].id);
    };
    getImageData();
  }, []);

  React.useEffect(() => {
    const imageSet = async () => {
      const res = await axios.get(`/resources/${imageData}`, {
        headers: {
          "api-key": "cb28f77b0a974656bc066e5d19e370c0",
        },
      });
      setImages(res.data);
    };

    imageData && imageSet();
  }, [imageData]);

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
