import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Icon, IconButton, List, ListItem, ListItemText, MenuItem, Select, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import IngridientList from '../IngredientList/IngredientList';
import { useRecipesContext } from '../context/recipesContext';

const unitsList = ['шт', 'кг', 'гр', 'л', 'мл'];

export const mealTimeList = ['Завтрак', 'Обед', 'Ужин'];

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

  export type RecipeType = {
    title: string, 
    timeOfMeal: string,
    ingredients: IngredientType[], 
    recipeText: string,
    id?: string
  }

const AddRecipeModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {addRecipe} = useRecipesContext();

  const [formValues, setFormValues] = React.useState<RecipeType>({
    title: '',
    timeOfMeal: mealTimeList[0],
    ingredients: [],
    recipeText: ''
  });

  const [ingredient, setIngredient] = React.useState<IngredientType>({
    name: '', 
    number: 1, 
    units: unitsList[0]
  });

  const [mealTime, setMealTime] = React.useState<string>(mealTimeList[0]);

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
      setIngredient({
        name: '',
        number: 1,
        units: unitsList[0]
      });
    }
  };

  const handleSelectMealTime = (e) => {
    setMealTime(e.target.value);
    handleInputChange(e);
  };

  const updateFormsValues = (ingredientsArr: IngredientType[]) => {
    setFormValues({
      ...formValues,
      ingredients: ingredientsArr
    });
  };

  const uploadRecipe = () => {
    addRecipe(formValues);
    setFormValues({
      title: '',
      timeOfMeal: mealTimeList[0],
      ingredients: [],
      recipeText: ''
    });
    setMealTime(mealTimeList[0]);
    handleClose();
  };
  
  return (
    <>
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
            <Box sx={{ display: "flex", justifyContent: "space-between"}}>
              <TextField 
                value={formValues.title}
                name="title"
                id="outlined-basic" 
                label="Название" 
                variant="outlined" 
                onChange={handleInputChange}
                sx={{ width: "80%", marginRight: "10px"}}
              />
              <Select
                name="timeOfMeal"
                labelId="demo-select-small"
                id="demo-select-small"
                value={mealTime}
                label="Units"
                onChange={ev => handleSelectMealTime(ev)}
                variant="outlined"
              >
                {mealTimeList.map(el => <MenuItem key={el} value={el}>{el}</MenuItem>)}
              </Select>
              </Box>
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
                  <IngridientList formValues={formValues} updateFormsValues={updateFormsValues} />
                </List>
                :
                null
              }
            </Box>
            <TextField 
              value={formValues.recipeText}
              name="recipeText"
              id="outlined-basic" 
              label="Текст рецепта" 
              variant="outlined"
              onChange={handleInputChange}
              multiline
              rows={12}

            />
            <Button onClick={uploadRecipe}>Загрузить рецепт</Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default AddRecipeModal;
