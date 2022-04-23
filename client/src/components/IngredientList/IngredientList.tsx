import React from 'react';
import { Box, IconButton, List, ListItem, MenuItem, Select, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormValuesType, IngredientType } from "../AddRecipeModal/AddRecipeModal";

const unitsList = ['шт', 'кг', 'гр', 'л', 'мл'];

type IngredientListProps = {
    formValues: FormValuesType;
    updateFormsValues: (updateFormsValues: IngredientType[]) => void;
};

const IngredientList = ({formValues, updateFormsValues} : IngredientListProps): JSX.Element => {

    const editIngredient = (ev, nameOfIngredient) => {
        const { name, value } = ev.target;
        const selectedIngredient = formValues.ingredients.find(el => el.name === nameOfIngredient);
        if (selectedIngredient) {
          const indx = formValues.ingredients.indexOf(selectedIngredient);
          selectedIngredient[name] = value;
          formValues.ingredients.splice(indx, 1, selectedIngredient);
          updateFormsValues(formValues.ingredients)
        };
      };
    
      const deleteIngredient = (nameOfIngredient) => {
        const indx = formValues.ingredients.findIndex(el => el.name === nameOfIngredient);
        formValues.ingredients.splice(indx, 1);
        updateFormsValues(formValues.ingredients)
      }

    return(
        <>
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
        </>
    )};
export default IngredientList;