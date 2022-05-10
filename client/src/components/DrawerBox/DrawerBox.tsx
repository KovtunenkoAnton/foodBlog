import { Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import React from 'react';
import AddRecipeModal, { RecipeType, mealTimeList } from '../AddRecipeModal/AddRecipeModal';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';

interface IDrawerBox {
    recipesList: RecipeType[];
    setCurRecipe: (recipe: RecipeType) => void;
}

const DrawerBox = (props: IDrawerBox) => {
    const [open, setOpen] = React.useState(true);
    const {recipesList, setCurRecipe} = props;

    return(
        <>
        <Toolbar />
        {
            mealTimeList.map(mealTime => 
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
                    recipesList.length &&
                      recipesList.map((recipe: RecipeType) => recipe.timeOfMeal === mealTime ?
                      <ListItemButton 
                        onClick={() => setCurRecipe(recipe)} 
                        key={recipe.title}
                      >
                        <span style={{ marginLeft: "55px" }}>{recipe.title}</span>
                      </ListItemButton>
                      : null)
                  }
                </Collapse>
              </List>
            </div>
            )
        }
        <List sx={{ textAlign: "center" }}>
            <AddRecipeModal/>
        </List>
        </>
    )
}

export default DrawerBox;