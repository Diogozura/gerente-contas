// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import MenuIcon from '@mui/icons-material/Menu';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';

// interface Props {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window?: () => Window;
// }

// const drawerWidth = 240;
// const navItems = ['Home', 'About', 'Contact'];

// export default function DrawerAppBar(props: Props) {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen((prevState) => !prevState);
//   };

//   const drawer = (
//     <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
//       <Typography variant="h6" sx={{ my: 2 }}>
//         MUI
//       </Typography>
//       <Divider />
//       <List>
//         {navItems.map((item) => (
//           <ListItem key={item} disablePadding>
//             <ListItemButton sx={{ textAlign: 'center' }}>
//               <ListItemText primary={item} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   const container = window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="static" >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
//           >
//             MUI
//           </Typography>
//           <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
//             {navItems.map((item) => (
//               <Button key={item} sx={{ color: '#fff' }}>
//                 {item}
//               </Button>
//             ))}
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <nav>
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//           sx={{
//             display: { xs: 'block', sm: 'none' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </nav>
//     </Box>
//   );
// }
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import NotificationsIcon from '@mui/icons-material/Notifications';

import ThemeToggle from '../../../common/ThemeToggle';
import nookies from 'nookies';

import { ThemeProvider, useTheme } from '../../../../../styles/themes/themeContext';
import { Avatar, Container, Menu, MenuItem, Tooltip } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { themes } from '../../../../../styles/themes/themes';

interface Props {
  window?: () => Window;
  children: React.ReactNode;
}

const drawerWidth = 240;


const navItems = [
  {
    id: 5,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    id: 1,
    label: "Vendas",
    path: "/vendas",
  },
  {
    id: 2,
    label: "Anuncios",
    path: "/anuncios",
  },
  {
    id: 3,
    label: "Estoque",
    path: "/estoque",
  },
  {
    id: 4,
    label: "Gerenciamento",
    path: "/gerenciamento",
  },
 
];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


export default function PublicLayout({ currentPath = '' }: { currentPath?: string }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const isActive = (path) => path === currentPath;
  console.log('isActive', currentPath)
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} component={"header"}>
      <Box padding={1} color={"white"}>
        <Link href={"/"}>
          <Box component={"aside"} display={"flex"} alignItems={"center"}>
            <Typography variant="h6" component={'h2'} fontWeight={'bold'} ml={1} color={'primary'}>
             Hubeefive
            </Typography>
          </Box>
        </Link>
      </Box>
      <Divider
        sx={{
          border: "1px solid #939393",
        }}
      />
      <List component={"nav"}>
        {navItems.map((item) => (
          <>
            <ListItem key={item.id} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <Link
                  href={item.path}
                  style={{ textDecoration: "none", fontSize: "1.3rem" }}
                >
                  {item.label}
                </Link>
              </ListItemButton>
            </ListItem>
            <Divider
              sx={{
                border: "1px solid #939393",
              }}
              
            />

          </>
        ))}
          <ListItemButton sx={{ textAlign: "center" }}>
                <Link
                  href={'/auth/login'}
                  style={{ textDecoration: "none", fontSize: "1.3rem" }}
                >
                 Login
                </Link>
              </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
    <ThemeProvider theme={themes.dark1}>
      <Box sx={{ display: "flex" }} component={"header"}>
        <AppBar component="nav" position="static" color="default" enableColorOnDark>
          <Container>
            <Toolbar disableGutters>
              <Typography variant="h4" component={'h2'} fontWeight={'400'}noWrap>
                Hubee
              </Typography>
              <Typography variant="h4" component={'h2'} fontWeight={'bold'}noWrap>
                Five
              </Typography>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  flexGrow: 1,
                  justifyContent: "center",
                }}
              >
                 {navItems.map((item) => (
                  <Button
                    key={item.id}
                    sx={{
                      color: 'primary',
                      mx: 2,
                     
                    }}
                  >
                   
                    <Link href={item.path} passHref>
                      <Typography component={'p'} sx={{
                          fontWeight:'600',
                          color: isActive(item.path) ? 'primary' : 'inherit', // Cor do texto (ajuste conforme o necessário)
                          borderBottom: isActive(item.path) ? '2px solid #6A1B9A' : 'none', // Cor e espessura da borda inferior
                          pb: 0.5, // Padding na parte inferior para dar um espaçamento visual mais agradável
                      }}>{item.label}</Typography>
                    </Link>
                  </Button>
                ))}
              </Box>
             
             
       <Box sx={{ flexGrow: 0 }}>
       <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <NotificationsIcon color='primary'  fontSize="large"/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
         
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
            </Toolbar>
          </Container>
         
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
      </ThemeProvider>
    </>
  );
}

