import { Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import React from 'react';
import AddRecipeModal, { RecipeType, mealTimeList } from '../AddRecipeModal/AddRecipeModal';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';

interface IDrawerBox {
    recipesList: RecipeType[];
    setCurRecipe: (recipe: RecipeType) => void;
    mealTime?: string;
}

const MealTimeList = ({recipesList, setCurRecipe, mealTime}: IDrawerBox) => {
  const [open, setOpen] = React.useState(true);
  return(
    <div key={mealTime}>
      <Divider />
      <List>
        <ListItem onClick={() => setOpen(!open)} sx={{ marginBottom: "10px" }} button key={mealTime}>
          <ListItemIcon>
            {<EmojiFoodBeverageIcon />}
          </ListItemIcon>
          <ListItemText>
            <Typography sx={{ fontWeight: "bold" }}>
              {mealTime}
            </Typography>
          </ListItemText>
        </ListItem>

        <Collapse in={open}>
          {
            recipesList.length ?
              recipesList.map((recipe: RecipeType) => recipe.timeOfMeal === mealTime ?
              <ListItemButton 
                onClick={() => setCurRecipe(recipe)} 
                key={recipe.title}
              >
                <span style={{ marginLeft: "55px" }}>{recipe.title}</span>
              </ListItemButton>
              : null)
              :
              <span style={{ marginLeft: '16px', color: 'grey' }}>{'Рецептов еще нет'}</span>
          }
        </Collapse>
      </List>
    </div>
  )
}


const DrawerBox = (props: IDrawerBox) => {

    return(
      <>
      <Toolbar />
      {
        mealTimeList.map(mealTime => 
          <MealTimeList 
            recipesList={props.recipesList} 
            setCurRecipe={props.setCurRecipe} 
            mealTime={mealTime} 
          />)
      }
      <List sx={{ textAlign: "center" }}>
          <AddRecipeModal/>
      </List>
      </>
    )
}

export default DrawerBox;