import * as React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  Stack,
} from "@mui/material/";
import axios from "axios";
import { ThemeProvider } from "@mui/material/styles";

export default function ModalEdit({
  styleModal,
  buttonColor,
  handleClose,
  doRefresh,
  handleOpenEdit,
  data,
  setRecipe,
  recipe,
}) {
  console.log(recipe);
  console.log(data);

  // if (data.tittle || data.content || data.image) {
  //   setRecipe({
  //     tittle: data.tittle,
  //     content: data.content,
  //     image: data.image,
  //   });

  //   console.log(data);
  //   console.log(recipe);
  //   console.log(setRecipe);
  // }

  const handleEdit = async (id) => {
    try {
      const response = await axios.put(`http://localhost:1234/recipes/${id}`, {
        tittle: recipe.tittle,
        content: recipe.content,
        image: recipe.image,
      });
      if (response.status === 200) {
        console.log(response.status);
        doRefresh();
        setRecipe({
          tittle: "",
          content: "",
          image: "",
        });
      }
    } catch (e) {
      console.log("There was an error");
    }
  };

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Modal open={handleOpenEdit} onClose={handleClose}>
        <Box sx={styleModal}>
          <Typography
            id="modal-modal-title"
            sx={{ mb: 2 }}
            variant="h6"
            component="h2"
          >
            Edit Data
          </Typography>
          <div>
            <TextField
              label="Title"
              name="tittle"
              variant="standard"
              value={recipe.tittle}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div>
            <TextField
              label="Description"
              name="content"
              variant="standard"
              value={recipe.content}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div>
            <TextField
              label="Image"
              name="image"
              variant="standard"
              value={recipe.image}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <ThemeProvider theme={buttonColor}>
            <Stack
              direction="row"
              justifyContent="flex-end"
              sx={{ mt: 3 }}
              spacing={2}
            >
              <Button
                variant="outlined"
                color="cancel"
                onClick={() => handleClose()}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="ok"
                onClick={() => handleEdit(data.id)}
              >
                Save
              </Button>
            </Stack>
          </ThemeProvider>
        </Box>
      </Modal>
    </div>
  );
}
