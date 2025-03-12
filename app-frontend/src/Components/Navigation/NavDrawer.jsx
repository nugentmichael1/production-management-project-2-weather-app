import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, Toolbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CalculateIcon from '@mui/icons-material/Calculate';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';


const navItems = ['Home', 'Contact'];
const navItems2 = ['Account', 'Settings', 'Logout'];

export default function NavDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const [state, setState] = useState(false);
  // const navigateTrigger = useNavigate();

  return (<>

    <Toolbar sx={{
      justifyContent: 'space-between',
      backgroundColor: 'black',
      backgroundSize: 'cover',
      borderRadius: '25px',
      border: '1px solid black',
      boxShadow: '0px 0px 2px 2px white',
      Width: '100vw',
      height: '145px'
    }}
      variant='menu'
      position="static"
    >
      <IconButton
        edge="start"
        aria-label="menu"
        onClick={() => { setIsDrawerOpen(true) }
        } >

        <MenuIcon sx={{ color: 'white' }} />

      </IconButton>

      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        // PaperProps allows us to resize the menu
        PaperProps={{
          sx: { width: "15rem" }
        }}>

        <Typography sx={{ my: 2, textAlign: 'center' }}>
          Menu
        </Typography>

        <Divider sx={{
          borderColor: 'black',
          borderBottomWidth: '5px', margin: ' 5px'
        }} />


        {/* //THIS SECTION HANDLES MENU BUTTON NAVIGATION  */}
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>

            {/* //------------------------------------------------ */}

            {item === 'Home' ? <ListItemButton sx={{ textAlign: 'left' }}
              component={Link}
              to='/'
              onClick={() => {
                console.info("HOME BUTTON TEST");
                setIsDrawerOpen(false);
              }}>
              <HomeIcon sx={{ margin: '5px' }} />
              <ListItemText primary={item} />
            </ListItemButton> : ''}

            {/* //------------------------------------------------ */}

            {item === 'Contact' ? <ListItemButton sx={{
              borderTop: '1px solid black',
              textAlign: 'left'
            }}
              component={Link}
              to='/fitness/contact'
              onClick={() => {
                console.info("CONTACT US BUTTON TEST");
                setIsDrawerOpen(false);
              }}>
              <ContactSupportIcon sx={{ margin: '5px' }} />
              <ListItemText primary={item} />
            </ListItemButton> : ''}

            {/* //------------------------------------------------ */}

            {item === 'About' ? <ListItemButton sx={{
              borderTop: '1px solid black',
              textAlign: 'left'
            }}
              component={Link}
              to='/about'
              onClick={() => {
                console.info("ABOUT BUTTON TEST");
                setIsDrawerOpen(false);
              }}>
              <InfoIcon sx={{ margin: '5px' }} />
              <ListItemText primary={item} />
            </ListItemButton> : ''}

            {/* //------------------------------------------------ */}

          </ListItem>

        ))};

        {/* //------------------------------------------------ */}

        <Divider sx={{
          borderColor: 'black',
          borderBottomWidth: '5px'
        }} />

        {/* //------------------------------------------------ */}

        {navItems2.map((item) => (
          <ListItem key={item} disablePadding>

            {item === 'Account' ? <ListItemButton sx={{}}
              component={Link}
              to='/account'
              onClick={() => {
                console.info("ACCOUNT BUTTON TEST");
                setIsDrawerOpen(false);
              }}>
              <AccountCircleIcon sx={{ margin: '5px' }} />
              <ListItemText primary={item} />
            </ListItemButton> : ''}

            {/* //------------------------------------------------ */}

            {item === 'Settings' ? <ListItemButton sx={{ borderTop: '1px solid black' }}
              component={Link}
              to='/settings'
              onClick={() => {
                console.info("SETTINGS BUTTON TEST");
                setIsDrawerOpen(false);
              }}>
              <SettingsIcon sx={{ margin: '5px' }} />
              <ListItemText primary={item} />
            </ListItemButton> : ''}

            {/* //------------------------------------------------ */}

            {item === 'Logout' ? <ListItemButton sx={{ borderTop: '1px solid black' }}
              component={Link}
              to='/'
              onClick={() => {
                console.info("LOGOUT BUTTON TEST");
                setIsDrawerOpen(false);
              }}>
              <LogoutIcon sx={{ margin: '5px' }} />
              <ListItemText primary={item} />
            </ListItemButton> : ''}
          </ListItem>
        ))}

      </Drawer>
      <Box>
        <Typography variant="h4" sx={{
          my: 2,
          color: 'white',
          textAlign: 'center'
        }}>
          Weather Tracker
        </Typography>
      </Box>
      {/* we use an empty 3rd box 
            in order to center the Text within the toolbar */}
      <Box>
      </Box>

    </Toolbar>

  </>
  );
}
