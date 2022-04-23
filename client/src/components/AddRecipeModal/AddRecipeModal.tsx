import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Icon, IconButton, List, ListItem, ListItemText, MenuItem, Select, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const unitsList = ['шт', 'кг', 'гр', 'л', 'мл'];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAllign: "center"
  };

  export type IngredientType = {
    name: string;
    number: number;
    units: string;
  }

const AddRecipeModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formValues, setFormValues] = React.useState<{title: string, ingredients: IngredientType[], recipeText: ''}>({
      title: '',
      ingredients: [],
      recipeText: ''
  });

  const [ingredient, setIngredient] = React.useState<IngredientType>({
    name: '', 
    number: 1, 
    units: unitsList[0]
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleInputIngredientChange = (e) => {
    const { name, value } = e.target;
    setIngredient({
      ... ingredient,
      [name]: value
    });
  };
  
  const addIngredient = () => {
    if (ingredient.name) {
      const selectedIngredient = formValues.ingredients.find(el => el.name === ingredient.name);
      if(!selectedIngredient) {
        setFormValues({
          ...formValues,
          ingredients: [...formValues.ingredients, ingredient],
        });
      } 
      // else {
      //   editIngredient({name: ingredient.name, value: name}, ingredient.name)
      // }
      setIngredient({
        name: '', 
        number: 1, 
        units: unitsList[0]
      });
    }
  };

  const editIngredient = (ev, nameOfIngredient) => {
    const { name, value } = ev.target;
    const selectedIngredient = formValues.ingredients.find(el => el.name === nameOfIngredient);
    if (selectedIngredient) {
      const indx = formValues.ingredients.indexOf(selectedIngredient);
      selectedIngredient[name] = value;
      formValues.ingredients.splice(indx, 1, selectedIngredient);
      setFormValues({
        ...formValues,
        ingredients: formValues.ingredients
      });
    };
  };

  const deleteIngredient = (nameOfIngredient) => {
    const indx = formValues.ingredients.findIndex(el => el.name === nameOfIngredient);
    formValues.ingredients.splice(indx, 1);
    setFormValues({
      ...formValues,
      ingredients: formValues.ingredients
    })
  }
  
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
              '& > :not(style)': { m: 1 },
              display: 'flex',
              flexDirection: 'column'
          }}
          noValidate
          autoComplete="off"
        >
          <TextField 
            value={formValues.title}
            name="title"
            id="outlined-basic" 
            label="Название" 
            variant="outlined" 
            onChange={handleInputChange}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex' }}>
              <TextField 
                value={ingredient.name}
                name="name"
                id="outlined-basic" 
                label="Ингредиенты" 
                variant="outlined"
                onChange={handleInputIngredientChange}
              />
              <IconButton sx={{ maxHeight: '35px', marginTop: '10px' }} onClick={addIngredient} edge="end" aria-label="add">
                <AddIcon />
              </IconButton>
            </Box>
            {formValues.ingredients.length ? 
              <List>
                {
                  formValues.ingredients.map(el => 
                    <Box key={el.name} sx={{ display: 'flex', alignItems: 'baseline' }}>
                      <ListItem>{el.name}</ListItem>
                      <Box sx={{ display: 'flex' }}>
                        <TextField 
                          value={el.number}
                          name="number"
                          id="outlined-basic" 
                          label="Кол-во" 
                          variant="standard"
                          size="small"
                          onChange={ev => editIngredient(ev, el.name)}
                          sx={{ margin: '0px 10px', width: '50px'}}
                        />
                        <Select
                          name="units"
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={el.units}
                          label="Units"
                          onChange={ev => editIngredient(ev, el.name)}
                          variant="standard"
                          sx={{ width: '50px' }}
                        >
                          {unitsList.map(el => <MenuItem value={el}>{el}</MenuItem>)}
                        </Select>
                      </Box>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon onClick={() => deleteIngredient(el.name)} />
                        </IconButton>
                    </Box>
                  )
                }
                
              </List>
              :
              null
            }
          </Box>
          <TextField 
            // sx={{ height: "200px"}}
            value={formValues.recipeText}
            name="recipeText"
            id="outlined-basic" 
            label="Текст рецепта" 
            variant="outlined"
            onChange={handleInputChange}

          />
          <Button>Загрузить рецепт</Button>
        </Box>
      </Box>
    </Modal>
  </div>
  )
}

export default AddRecipeModal;