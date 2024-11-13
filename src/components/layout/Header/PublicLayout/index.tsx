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

import ThemeToggle from '../../../common/ThemeToggle';
import nookies from 'nookies';

import { ThemeProvider, useTheme } from '../../../../../styles/themes/themeContext';
import { Container } from '@mui/material';

interface Props {
  window?: () => Window;
  children: React.ReactNode;
}

const drawerWidth = 240;


const navItems = [
  {
    id: 1,
    label: "Sobre nós",
    path: "/sobre",
  },
  {
    id: 2,
    label: "Planos",
    path: "/",
  },
  {
    id: 3,
    label: "Contato",
    path: "/contato",
  },
];




export default function PublicLayout({ currentPath = '' }: { currentPath?: string }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const isActive = (path) => path === currentPath;
  console.log('isActive', currentPath)
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
      <Box sx={{ display: "flex" }} component={"header"}>
        <AppBar component="nav" position="static">
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
                      color: 'white',
                      mx: 2,
                      borderBottom: isActive(item.path) ? '2px solid white' : 'none',
                    }}
                  >
                    <Link href={item.path} passHref>
                      <Typography>{item.label}</Typography>
                    </Link>
                  </Button>
                ))}
              </Box>
             
              <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Button sx={{ color: "white" }}>
                <Link href="/auth/login" passHref>
                <Typography  
                 ml={1}>
             Login
            </Typography>
                </Link>
              </Button>
            </Toolbar>
          </Container>
          {/*
           <Toolbar >
            
            <Box sx={{ flexGrow: 1, width: 150, padding: 2, display: { xs: 'none', sm: 'block' } }}>
              <Link href={'/'}>
                <Box
                component={'aside'}
                display={'flex'}
               alignItems={'center'}
                >  
               
                  <Typography variant='h4' ml={1} >Easy cálculos</Typography>
                </Box>
              
              </Link>
           
            </Box>
             </Toolbar> */}
            {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }} component={'nav'}>
              {navItems.map((item) => (
                <Link key={item.id} href={item.path} style={{  fontSize: '1.3rem' }} >
                  {item.label}
                </Link>


              ))}
            </Box> */}

            
           
         
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
    </>
  );
}

