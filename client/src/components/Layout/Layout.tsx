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
import AddRecipeModal from '../AddRecipeModal/AddRecipeModal';

const drawerWidth = 240;

function Layout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(true);

  const {recipes, addRecipe} = useRecipesContext();
  

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Завтрак'].map((text, index) => (
          <ListItem sx={{marginBottom: "10px"}} button key={text}>
            <ListItemIcon>
              {<EmojiFoodBeverageIcon/>}
            </ListItemIcon>
            <ListItemText>
                <Typography sx={{fontWeight: "bold"}}>
                    {text}
                </Typography>
            </ListItemText>
          </ListItem>
        ))}
          <Collapse in={open}>
            {recipes.map(recipe => 
            <ListItemButton key={recipe.title}><span style={{marginLeft: "55px"}}>{recipe.title}</span></ListItemButton>)}
          </Collapse>
      </List>
      <Divider />
      <List>
        {['Обед'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {<DinnerDiningIcon/>}
            </ListItemIcon>
            <ListItemText>
                <Typography sx={{fontWeight: "bold"}}>
                    {text}
                </Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Ужин'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {<BrunchDiningIcon/>}
            </ListItemIcon>
            <ListItemText>
                <Typography sx={{fontWeight: "bold"}}>
                    {text}
                </Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <List sx={{ textAlign: "center" }}>
      <AddRecipeModal/>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

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
        <Drawer
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
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography sx={{fontWeight: "bold", left: "50%", position: "absolute"}} paragraph>
            {recipes[0]?.title}
        </Typography>
        <Typography paragraph>
            <ul>
            {recipes[0]?.ingredients.map(ingredient => 
                <li key={ingredient.index}>{ingredient}</li>
                )}
            </ul>
        </Typography>
        <Typography paragraph>
            {recipes[0]?.recipeText}
        </Typography>
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