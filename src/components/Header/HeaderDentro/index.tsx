/* eslint-disable react/jsx-key */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Image from 'next/image';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import LinkPage from '../../Link';
import { blue } from '@mui/material/colors';
import { Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children: React.ReactElement
}

const drawerWidth = 240;

const navItems = [{
    id: 1,
    label: 'Home',
    path: '#home',
    // icon: HomeIcon
},
{
    id: 2,
    label: 'Sair',
    path: '#sair',
    // icon: HomeIcon
    },
];
function HideOnScroll(props: Props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
    });
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

export default function HeaderHome({ children }: Props, props:Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const drawer = (
    <Box onClick={handleDrawerToggle} >
      <Typography variant="h6" sx={{ my: 2 }}>
      {/* <Image
                    src='/image/logo.svg'
                    alt="Logo easy imobiliário"
                    // layout="responsive"
                    width={250}
                    height={80} /> */}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
       <LinkPage href={item.path} name={item.label} color={''} />
            </ListItemButton>
            </ListItem>
            
        ))}
      </List>
    </Box>
    );

   

  const container = window !== undefined ? () => window().document.body : undefined;

    return (
       

       
      <Box sx={{ display: 'flex' }}>
    <HideOnScroll {...props}>
      <AppBar  position="static" >
            <Toolbar>
           <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Photos
          </Typography>
        
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}> <LinkPage href={'/'} name={'home'} color={"white"} bg={blue[400]} padding={"10px"} hoverBg={blue[300]}  />
             </MenuItem>
                <MenuItem onClick={handleClose}><LinkPage href={"/logout"} name={"Sair"} color={"red"}/></MenuItem>
              </Menu>
            
        
        
         
        </Toolbar>
      </AppBar>
  </HideOnScroll>
            <Box component="nav">
           
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
            {drawer}
            
        </Drawer>
      </Box>
    </Box>
           
  );
}