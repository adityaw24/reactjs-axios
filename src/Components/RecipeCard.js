import * as React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import ModalEdit from "./ModalEdit";
import { ThemeProvider } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const RecipeCard = ({
  card,
  setRecipe,
  doRefresh,
  buttonColor,
  styleModal,
  recipe,
}) => {
  const classes = useStyles();
  console.log(card);

  const [modalEdit, setModalEdit] = useState(false);
  const handleOpenEdit = () => {
    // try {
    //   const response = await axios.get(`http://localhost:1234/recipes/${id}`);
    //   if (response.status === 200) {
    //     console.log(response.status);
    //     doRefresh();
    //   }
    // } catch (e) {
    //   console.log("There was an error");
    // }

    setRecipe({
      tittle: card.tittle,
      content: card.content,
      image: card.image,
    });

    setModalEdit(true);
  };
  //   const handleCloseEdit = () => setModalEdit(false);

  const deleteHandle = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:1234/recipes/${id}`
      );
      if (response.status === 200) {
        console.log(response.status);
        doRefresh();
      }
    } catch (e) {
      console.log("There was an error");
    }
  };

  const handleClose = () => {
    setRecipe({
      tittle: "",
      content: "",
      image: "",
    });
    setModalEdit(false);
  };

  return (
    <>
      <Grid item key={card.id} xs={12} sm={6} md={4}>
        <Card className={classes.card} elevation={5}>
          <CardMedia
            className={classes.cardMedia}
            image={card.image}
            title={card.tittle}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {card.tittle}
            </Typography>
            <Typography>{card.content}</Typography>
          </CardContent>
          <CardActions>
            <ThemeProvider theme={buttonColor}>
              <Button
                size="small"
                color="ok"
                onClick={() => handleOpenEdit(card.id)}
                variant="contained"
              >
                <EditIcon />
              </Button>
              <Button
                size="small"
                color="delete"
                onClick={() => deleteHandle(card.id)}
                variant="contained"
              >
                <DeleteForeverIcon />
              </Button>
            </ThemeProvider>
          </CardActions>
        </Card>
        <ModalEdit
          handleOpenEdit={modalEdit}
          handleClose={handleClose}
          buttonColor={buttonColor}
          styleModal={styleModal}
          data={{
            id: card.id,
            tittle: card.tittle,
            content: card.content,
            image: card.image,
          }}
          setRecipe={setRecipe}
          doRefresh={doRefresh}
          recipe={recipe}
        />
      </Grid>
    </>
  );
};
export default RecipeCard;
