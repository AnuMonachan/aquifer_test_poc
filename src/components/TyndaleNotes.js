import React from "react";
import axios from "axios";
export default function TyndaleNotes({ bookData }) {
  const [notesData, setNotesData] = React.useState();
  const [notes, setNotes] = React.useState([]);
  const bookCode = bookData?.[0]?.code;
  React.useEffect(() => {
    const getNotesData = async () => {
      const response = await axios.get(
        `/resources/search?languageCode=eng&bookCode=${bookCode}&resourceCollectionCode=TyndaleStudyNotes&limit=100`,
        {
          headers: {
            "api-key": "cb28f77b0a974656bc066e5d19e370c0",
          },
        }
      );
      setNotesData(response.data.items[0].id);
    };
    bookCode && getNotesData();
  }, [bookCode]);

  React.useEffect(() => {
    const notesSet = async () => {
      const res = await axios.get(`/resources/${notesData}`, {
        headers: {
          "api-key": "cb28f77b0a974656bc066e5d19e370c0",
        },
      });
      setNotes(res.data);
    };

    notesData && notesSet();
  }, [notesData]);

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
      })}
    </div>
  );
}
