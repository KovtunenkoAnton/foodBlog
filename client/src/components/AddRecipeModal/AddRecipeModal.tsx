import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAllign: "center"
  };

const AddRecipeModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formValues, setFormValues] = React.useState({
        title: '',
        ingredients: [],
        recipeText: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
      };

    return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>Добавить рецепт</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Добавьте Ваш рецепт
            </Typography>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField 
                    value={formValues.title}
                    name="title"
                    id="outlined-basic" 
                    label="Название" 
                    variant="outlined" />
                    onChange={handleInputChange}
                <TextField 
                    value={formValues.ingredients}
                    name="ingredients"
                    id="outlined-basic" 
                    label="Ингредиенты" 
                    variant="outlined" />
                <TextField 
                    value={formValues.recipeText}
                    name="recipeText"
                    id="outlined-basic" 
                    label="Текст рецепта" 
                    variant="outlined" />
            </Box>
        </Box>
      </Modal>
    </div>
    )
}

export default AddRecipeModal;