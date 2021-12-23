import * as React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  Stack,
} from "@mui/material/";
import { ThemeProvider } from "@mui/material/styles";

export default function ModalAdd({
  styleModal,
  buttonColor,
  handleClose,
  refresh,
  handleOpenAdd,
  handleAdd,
  data,
  setRecipe,
}) {
  console.log(data);

  const handleChange = (e) => {
    setRecipe({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Modal open={handleOpenAdd} onClose={handleClose}>
        <Box sx={styleModal}>
          <Typography
            id="modal-modal-title"
            sx={{ mb: 2 }}
            variant="h6"
            component="h2"
          >
            Add New Recipe
          </Typography>
          <div>
            <TextField
              label="Title"
              name="tittle"
              variant="standard"
              value={data.tittle}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div>
            <TextField
              label="Description"
              name="content"
              variant="standard"
              value={data.content}
              onChange={handleChange}
              fullWidth
            />
          </div>
          <div>
            <TextField
              label="Image"
              name="image"
              variant="standard"
              value={data.image}
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
                onClick={() => handleAdd(data.tittle, data.content, data.image)}
              >
                Add
              </Button>
            </Stack>
          </ThemeProvider>
        </Box>
      </Modal>
    </div>
  );
}
