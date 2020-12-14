import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  AppBar,
  Box,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import SearchBar from "./SearchBar";

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(15, 20, 20, 20),
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const SearchProperty = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple search tab"
        >
          <Tab label="Sell" {...a11yProps(0)} />
          <Tab label="Rent" {...a11yProps(1)} />
          <Tab label="PG" {...a11yProps(2)} />
          <Tab label="Share" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <SearchBar postedFor={"Sell"} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SearchBar postedFor={"Rent"} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SearchBar postedFor={"PG"} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SearchBar postedFor={"Share"} />
      </TabPanel>
    </div>
  );
};

SearchProperty.propTypes = {
  prop: PropTypes,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(SearchProperty);
