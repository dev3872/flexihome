import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postedUserModal } from "../../actions/modal";
import clsx from "clsx";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Checkbox,
  Collapse,
  colors,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { submitSearch } from "../../actions/search";
import { Redirect } from "react-router-dom";
import PostedUserDetails from "./PostedUserDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 175,
    opacity: 1.0,
    padding: 0,
    position: "absolute",
    marginTop: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  nestedElement: {
    padding: (theme.spacing(4), 0, 0, 0),
  },
  nestedText: {
    fontSize: 8,
  },
  buttonTitle: {
    fontSize: 10,
  },
  seacrhTextHeight: {
    lineHeight: 2.0,
    fontSize: 10,
    padding: 10,
    margin: theme.spacing(2, 2, 1, 1),
  },
  buttonSearch: {
    margin: theme.spacing(2, 0, 1, 3),
  },
  selectPadding: {
    padding: theme.spacing(0, 1, 0, 2),
  },
  formControl: {
    paddingBottom: theme.spacing(2),
    minWidth: theme.spacing(30),
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
  setZAxis: {
    zIndex: 100,
  },
  setBackgroundSelect: {
    backgroundColor: colors.grey,
  },
  gridBorder: {
    borderRadius: 1,
    border: 0,
    borderColor: "#000000",
    boxShadow: "0 1px 1px 1px rgba(0, 0, 0, 0.1)",
  },
  fontControl: {
    fontSize: 10,
  },
  paperSearch: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      width: theme.spacing(40),
      height: theme.spacing(16),
    },
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  userCard: {
    width: theme.spacing(19),
    height: theme.spacing(15),
  },
}));

const SearchBar = ({
  postedFor,
  submitSearch,
  searchResults,
  postedUserOpen,
  postedUserModal,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState({
    openResidential: false,
    openCommercial: false,
  });
  const [searchParam, setSearchParam] = useState({
    postedBy: "",
    postedFor: "",
    bedroom: "",
    constructionStatus: "",
    propertyType: [],
  });

  const node = useRef(false);

  const [openSearchParam, setOpenSearchParam] = useState(false);

  const [openMain, setOpenMain] = useState(false);

  const [userId, setUserId] = useState("");

  useEffect(() => {
    setSearchParam({ ...searchParam, postedFor: postedFor });
  }, []);

  const residential = [
    "Residential Apartment",
    "Farm House",
    "Serviced Apartment",
    "Independent Villa/House",
    "Independent Builder Floor",
    "Studio Apartment",
    "Residential Land",
  ];
  const commercial = [
    "Commercial Space/Office",
    "Commercial Showroom",
    "Industrial Warehouse",
    "Hotels/Resort",
    "Shop in Retail Mall",
    "Buisness Center",
    "Manufacturing Unit",
    "Commercial Shop",
    "Agricultural/ Farm Land",
    "Factory",
    "Office In IT Park",
    "Guest House/Banquet",
    "office in Buisness Park",
    "Cold Storage",
    "Time Share",
    "Co-Working",
  ];
  const handleUserModal = async (id) => {
    await setUserId(id);
    postedUserModal();
  };
  const handleCheckbox = (element) => {
    const propertyTypeList =
      searchParam.propertyType.indexOf(element) === -1
        ? [...searchParam.propertyType, element]
        : [
            ...searchParam.propertyType.filter(
              (property) => property !== element
            ),
          ];
    setSearchParam({ ...searchParam, propertyType: [...propertyTypeList] });
  };

  const handleClick = (name) => {
    setOpen({
      openCommercial: false,
      openResidential: false,
      [name]: !open[name],
    });
  };
  const handleClickMain = () => {
    setOpenMain(!openMain);
  };
  const handleChange = (e) => {
    setSearchParam({ ...searchParam, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    submitSearch(searchParam);
  };

  return (
    <>
      <Grid ref={node}>
        <Grid container xs={12} className={classes.gridBorder} border={1}>
          <Grid item xs={2}>
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              className={classes.root}
            >
              <ListItem disableGutters button onClick={handleClickMain}>
                <ListItemText primary="Property Type" />
                {openMain ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openMain} timeout="auto" unmountOnExit>
                <List
                  className={classes.setZAxis}
                  component="div"
                  disablePadding
                >
                  <ListItem
                    disableGutters
                    button
                    onClick={() => handleClick("openResidential")}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={false}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.nestedText}
                      primary="All Residential"
                    />
                    {open.openResidential ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse
                    in={open.openResidential}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {residential.map((element) => (
                        <ListItem button className={classes.nestedElement}>
                          <Checkbox
                            edge="start"
                            onChange={() => handleCheckbox(element)}
                            checked={
                              searchParam.propertyType.indexOf(element) !== -1
                            }
                            tabIndex={-1}
                            disableRipple
                          />
                          <ListItemText
                            primary={element}
                            onClick={() => handleCheckbox(element)}
                            className={classes.fontControl}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </List>
                <List
                  className={classes.setZAxis}
                  component="div"
                  disablePadding
                >
                  <ListItem
                    disableGutters
                    button
                    name="openCommercial"
                    onClick={() => handleClick("openCommercial")}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={false}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.nestedText}
                      primary="All Commercial"
                    />
                    {open.openCommercial ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse
                    in={open.openCommercial}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {commercial.map((element) => (
                        <ListItem
                          button
                          className={classes.nestedElement}
                          disableGutters
                        >
                          <Checkbox
                            edge="start"
                            onClick={() => handleCheckbox(element)}
                            checked={
                              searchParam.propertyType.indexOf(element) !== -1
                            }
                            tabIndex={-1}
                            disableRipple
                          />
                          <ListItemText
                            primary={element}
                            onClick={() => handleCheckbox(element)}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </List>
              </Collapse>
            </List>
          </Grid>
          <Grid item xs={8}>
            <TextField
              onClick={() => {
                setOpenSearchParam(!openSearchParam);
              }}
              className={classes.seacrhTextHeight}
              id="search-text"
              type="text"
              fullWidth
              placeholder="Type a location or project/Society or keyword"
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              size={"large"}
              className={classes.buttonSearch}
              onClick={handleSubmit}
            >
              Search
            </Button>
          </Grid>
        </Grid>
        <Grid
          className={classes.gridBorder}
          container
          xs={12}
          style={{ display: !openSearchParam ? "none" : "" }}
        >
          <Grid item xs={2} />
          <Grid item xs={3}>
            <FormControl className={classes.formControl}>
              <InputLabel id="simple-select-label">posted by</InputLabel>
              <Select
                fullWidth
                labelId="simple-select-label"
                id="simple-select"
                name="postedBy"
                value={searchParam.postedBy}
                onChange={handleChange}
              >
                <MenuItem value={"Owner"}>Owner</MenuItem>
                <MenuItem value={"Dealer"}>Dealer</MenuItem>
                <MenuItem value={"Builder"}>Builder</MenuItem>
                <MenuItem value={"Roommate"}>Roommate</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl className={classes.formControl}>
              <InputLabel id="simple-select-label">bedrooms</InputLabel>
              <Select
                fullWidth
                labelId="simple-select-label"
                id="simple-select"
                name="bedroom"
                value={searchParam.bedroom}
                onChange={handleChange}
              >
                <MenuItem value={1}>1 BHK</MenuItem>
                <MenuItem value={2}>2 BHK</MenuItem>
                <MenuItem value={3}>3 BHK</MenuItem>
                <MenuItem value={4}>4 BHK</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl className={classes.formControl}>
              <InputLabel id="simple-select-label">
                construction status
              </InputLabel>
              <Select
                fullWidth
                className={classes.selectPadding}
                labelId="simple-select-label"
                id="simple-select"
                name="constructionStatus"
                value={searchParam.constructionStatus}
                onChange={handleChange}
              >
                <MenuItem value={"Under Construction"}>
                  Under Construction
                </MenuItem>
                <MenuItem value={"Ready to move"}>Ready to move</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          {searchResults.map((result) => (
            <Paper
              variant="outlined"
              className={classes.paperSearch}
              elevation={3}
            >
              <Grid item xs={2}>
                <Avatar
                  variant="square"
                  className={classes.large}
                  alt="property image"
                  src={result.imageDetails[0]}
                />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">
                  {result.propertyType.propertySubType} in{" "}
                  {result.locationDetails.projectName}{" "}
                  {result.locationDetails.address}{" "}
                  {result.locationDetails.locality}{" "}
                  {result.locationDetails.defCity},{" "}
                  {result.locationDetails.defState}
                </Typography>
                <Typography variant="body1">
                  Posted by {result.postedBy} for{" "}
                  {result.listingPropertyFor.listingFor}
                  {"   "} in {result.propertyDetails.builtUpArea}{" "}
                  {result.propertyDetails.unit}
                  {", "} {result.propertyDetails.bedrooms}
                  {" BHK"}
                  {" with parking "}
                  {result.propertyDetails.reservedParking}
                </Typography>
                {result.furnishing.length > 0 ? (
                  <Typography variant="body1">
                    Furnishing:{" "}
                    {result.furnishing.map((item) => clsx(item, ", "))}
                  </Typography>
                ) : (
                  ""
                )}
                <Typography variant="body1">{"...more"}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Card className={classes.userCard}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      Interested ?
                    </Typography>
                    <Button
                      className={classes.buttonTitle}
                      onClick={() => handleUserModal(result.user._id)}
                      gutterBottom
                    >
                      Contact:{result.user.name} {" for a chat"}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Paper>
          ))}
        </Grid>
      </Grid>
      {postedUserOpen && <PostedUserDetails id={userId} />}
    </>
  );
};

SearchBar.propTypes = {
  postedFor: PropTypes.string.isRequired,
  submitSearch: PropTypes.func,
  searchResults: PropTypes.array.isRequired,
  postedUserModal: PropTypes.func.isRequired,
  postedUserOpen: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  searchResults: state.searchResults.results,
  postedUserOpen: state.modal.postedUserOpen,
});

export default connect(mapStateToProps, { submitSearch, postedUserModal })(
  SearchBar
);
