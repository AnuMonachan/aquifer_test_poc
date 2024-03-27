import React from "react";
import axios from "axios";
export default function UWNotes({ bookData, data_key }) {
  const [notesData, setNotesData] = React.useState();
  const [notes, setNotes] = React.useState([]);
  const bookCode = bookData?.[0]?.code;
  React.useEffect(() => {
    const getNotesData = async () => {
      const response = await axios.get(
        `/resources/search?languageCode=eng&bookCode=${bookCode}&resourceCollectionCode=UWTranslationWords&limit=100`,
        {
          headers: {
            "api-key": data_key,
          },
        }
      );
      setNotesData(response.data.items[0].id);
    };
    bookCode && data_key && getNotesData();
  }, [bookCode,data_key]);

  React.useEffect(() => {
    const notesSet = async () => {
      const res = await axios.get(`/resources/${notesData}`, {
        headers: {
          "api-key": data_key,
        },
      });
      setNotes(res.data);
    };

    notesData && data_key &&  notesSet();
  }, [notesData, data_key]);

  return (
    <div>
      <h1>{notes.name}</h1>
      <h2>{notes.localizedName}</h2>
      {notes.content?.[0].tiptap.content.map((i) => {
        if (i.type === "heading") {
          return <h3>{i.text}</h3>;
        }
        if (i.type === "paragraph") {
          return i.content.map((e) => {
            return e.text;
          });
        }
        if (i.type === "bulletList") {
          return i.content.map((r) => {
            return <li>{r.content?.[0]?.content?.[0]?.text}</li>;
          });
        }
      })}
    </div>
  );
}
