import { Container, Grid } from "@material-ui/core";
import React from "react";
import ImageBlock from "./ImageBlock";
const WhoAreYou = () => {
  return (
    <Container maxWidth="sm">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <ImageBlock user={"Owner"} />
        </Grid>
        <Grid item xs={6}>
          <ImageBlock user={"Builder"} />
        </Grid>
        <Grid item xs={6}>
          <ImageBlock user={"Dealer"} />
        </Grid>
        <Grid item xs={6}>
          <ImageBlock user={"Roommate"} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default WhoAreYou;
