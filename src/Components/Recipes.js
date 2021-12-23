import * as React from "react";
import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import useStyles from "./Style";
import { createTheme } from "@mui/material/styles";
import { blueGrey, blue, red } from "@mui/material/colors";
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
  // Modal,
  // TextField,
  // Box,
  Stack,
} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import ModalAdd from "./ModalAdd";

export default function Recipes() {
  const classes = useStyles();
  const [cards, setCards] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [recipe, setRecipe] = useState({
    tittle: "",
    content: "",
    image: "",
  });
  const [modalAdd, setModalAdd] = useState(false);
  const handleOpenAdd = () => setModalAdd(true);
  // const handleCloseAdd = () => setModalAdd(false);

  //deps = [] -- dijalankan hanya sekali
  useEffect(() => {
    console.log("useEffect");
    axios.get("http://localhost:1234/recipes").then((res) => {
      setCards(res.data);
    });
  }, [refresh]);

  const doRefresh = () => {
    console.log("doRefresh");
    setRefresh(!refresh);
  };

  console.log(cards);
  console.log(recipe);

  const handleAdd = async (tittle, content, image) => {
    try {
      const response = await axios.post(`http://localhost:1234/recipes/`, {
        tittle: tittle,
        content: content,
        image: image,
      });

      if (response.status === 201) {
        console.log(response.status);
        setRecipe({
          tittle: "",
          content: "",
          image: "",
        });
        setRefresh(!refresh);
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
    setModalAdd(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    bgcolor: "background.paper",
    borderRadius: "0.5rem",
    boxShadow: 24,
    p: 4,
  };

  const btnColor = createTheme({
    palette: {
      cancel: {
        main: blueGrey[500],
        contrastText: "#fff",
      },
      ok: {
        main: blue[500],
        contrastText: "#fff",
      },
      delete: {
        main: red[500],
        contrastText: "#fff",
      },
    },
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Recipes
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Aneka macam ide resep masakan dan makanan yang simpel tersaji
              disini untuk memberi panduan dan mempermudah dalam menentukan
              hidangan lezat untuk keluarga anda
            </Typography>
            <div className={classes.heroButtons}></div>
            <Stack direction="row" justifyContent="center" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<CachedIcon />}
                elevation={3}
                onClick={doRefresh}
              >
                Refresh
              </Button>
              <Button
                variant="contained"
                startIcon={<AddCircleIcon />}
                elevation={3}
                onClick={() => handleOpenAdd()}
              >
                Add Recipe
              </Button>
            </Stack>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <RecipeCard
                key={card.id}
                card={card}
                setRecipe={setRecipe}
                doRefresh={doRefresh}
                buttonColor={btnColor}
                styleModal={style}
                recipe={recipe}
              />
            ))}
          </Grid>
        </Container>
        <ModalAdd
          handleOpenAdd={modalAdd}
          handleClose={handleClose}
          refresh={doRefresh}
          buttonColor={btnColor}
          styleModal={style}
          handleAdd={handleAdd}
          data={recipe}
          setRecipe={setRecipe}
        />
        {/* <Modal
          open={modalAdd}
          onClose={handleCloseAdd}
          aria-labelledby="modal-modal-tittle"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-tittle"
              sx={{ mb: 2 }}
              variant="h6"
              component="h2"
            >
              Add New Recipe
            </Typography>
            <div>
              <TextField
                label="tittle"
                name="tittle"
                variant="standard"
                fullWidth
              />
            </div>
            <div>
              <TextField
                label="Description"
                name="content"
                variant="standard"
                fullWidth
              />
            </div>
            <div>
              <TextField
                label="Image"
                name="image"
                variant="standard"
                fullWidth
              />
            </div>
            <ThemeProvider theme={btnColor}>
              <Stack
                direction="row"
                justifyContent="flex-end"
                sx={{ mt: 3 }}
                spacing={2}
              >
                <Button variant="outlined" color="cancel">
                  Cancel
                </Button>
                <Button variant="contained" color="ok">
                  Add
                </Button>
              </Stack>
            </ThemeProvider>
          </Box>
        </Modal> */}
      </main>
    </React.Fragment>
  );
}
