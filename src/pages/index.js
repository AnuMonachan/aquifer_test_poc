import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Images from "../components/Images";
import axios from "axios";
import TyndaleNotes from "../components/TyndaleNotes";
import UWNotes from "../components/uWNotes";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [bookData, setBookData] = React.useState("");

  // React.useEffect(() => {
  //   const getBook = async () => {
  //     const res = await axios.get("/bible-books", {
  //       headers: {
  //         "api-key": process.env.REACT_APP_API_KEY,
  //       },
  //     });
  //     setBookData(res?.data);
  //   };
  //   getBook();
  // }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="uW Images" {...a11yProps(1)} />
          <Tab label="Tyndale Study Notes" {...a11yProps(2)} />
          <Tab label="uW Key Notes" {...a11yProps(3)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={1}>
        <Images bookData={bookData} data_key={process.env.REACT_APP_API_KEY} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <TyndaleNotes
          bookData={bookData}
          data_key={process.env.REACT_APP_API_KEY}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <UWNotes bookData={bookData} data_key={process.env.REACT_APP_API_KEY} />
      </CustomTabPanel>
    </Box>
  );
}
