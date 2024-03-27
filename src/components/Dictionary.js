import React from "react";
import axios from "axios";
export default function Dictionary({ bookData }) {
  const [dictData, setDictData] = React.useState();
  const [dict, setDict] = React.useState([]);
  const bookCode = bookData?.[0]?.code;
  React.useEffect(() => {
    const getDictData = async () => {
      const response = await axios.get(
        `/resources/search?resourceType=Dictionary&languageCode=eng&bookCode=${bookCode}&limit=100`,
        {
          headers: {
            "api-key": "cb28f77b0a974656bc066e5d19e370c0",
          },
        }
      );
      setDictData(response.data.items[0].id);
    };
    bookCode && getDictData();
  }, [bookCode]);

  React.useEffect(() => {
    const dictSet = async () => {
      const res = await axios.get(`/resources/${dictData}`, {
        headers: {
          "api-key": "cb28f77b0a974656bc066e5d19e370c0",
        },
      });
      setDict(res.data);
    };

    dictData && dictSet();
  }, [dictData]);
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
            return <p>{e.text}</p>;
          });
        }
      })}
    </div>
  );
}
