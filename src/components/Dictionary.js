import React from "react";
import axios from "axios";
export default function Dictionary({ bookData, data_key }) {
  const [dictData, setDictData] = React.useState();
  const [dict, setDict] = React.useState([]);
  const bookCode = bookData?.[0]?.code;
  React.useEffect(() => {
    const getDictData = async () => {
      const response = await axios.get(
        `/resources/search?resourceType=Dictionary&languageCode=eng&bookCode=${bookCode}&limit=100`,
        {
          headers: {
            "api-key": data_key,
          },
        }
      );
      setDictData(response.data.items[0].id);
    };
   bookCode && data_key && getDictData();
  }, [bookCode, data_key]);

  React.useEffect(() => {
    const dictSet = async () => {
      const res = await axios.get(`/resources/${dictData}`, {
        headers: {
          "api-key": data_key,
        },
      });
      setDict(res.data);
    };

    dictData && data_key && dictSet();
  }, [dictData, data_key]);
  return (
    <div>
      <h1>{dict.name}</h1>
      <h2>{dict.localizedName}</h2>
      {dict.content?.[0].tiptap.content.map((i) => {
        if (i.type === "heading") {
          return <h3>{i.content?.[0]?.text}</h3>;
        }
        if (i.type === "paragraph") {
          return i.content.map((e) => {
            return e.text
          });
        }
      })}
    </div>
  );
}
