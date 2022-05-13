import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import { Button, Collapse, ListItemButton } from '@mui/material';
import { useRecipesContext } from '../context/recipesContext';
import AddRecipeModal, { mealTimeList, RecipeType } from '../AddRecipeModal/AddRecipeModal';
import DrawerBox from '../DrawerBox/DrawerBox';

const drawerWidth = 240;

function Layout(props) {
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [curRecipe, setCurRecipe] = React.useState<RecipeType | undefined>(undefined);
  const {recipes} = useRecipesContext();
  
  if(typeof curRecipe === undefined && recipes.length) setCurRecipe(recipes[0]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{backgroundColor: "#19d263", display: "flex", justifyContent: "center"}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }}}
          >
            <MenuIcon />
          </IconButton>
            <Typography variant="h6" noWrap component="div">
                FOOOOOOOOD BLOOOOOOOG
            </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {/* <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer> */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <DrawerBox recipesList={recipes} setCurRecipe={setCurRecipe} />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {
          curRecipe && 
            <>
          <Typography sx={{ fontWeight: "bold", left: "50%", position: "absolute" }} paragraph>
              {curRecipe.title}
          </Typography>
          <Typography paragraph>
            <ul>
              {curRecipe.ingredients.map(ingredient => <li key={ingredient.name}>{ingredient.name} - {ingredient.number} {ingredient.units}</li>)}
            </ul>
          </Typography>
          <Typography paragraph>
            {curRecipe?.recipeText.split('\n').map(el => <Typography key={el}>{el}</Typography>)}
          </Typography>
          </>
        }

      </Box>
    </Box>
  );
}

Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Layout;