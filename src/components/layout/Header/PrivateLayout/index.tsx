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
import { useRouter } from "next/router"
import ContrastIcon from '@mui/icons-material/Contrast';
import ThemeToggle from '../../../common/ThemeToggle';
import nookies from 'nookies';

import { ThemeProvider, useTheme } from '../../../../../styles/themes/themeContext';
import { Avatar, Badge, Container, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { AccountCircle, DarkMode, ExitToApp } from '@mui/icons-material';
import { themes } from '../../../../../styles/themes/themes';
import SettingsIcon from '@mui/icons-material/Settings';
import MailIcon from '@mui/icons-material/Mail';

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

const settings = [
  { label: 'Perfil', icon: <AccountCircle /> },
  { label: 'Minha conta', icon:  <SettingsIcon /> },
  { label: 'Tema', icon: <ContrastIcon /> },
  { label: 'Sair', icon: <ExitToApp /> },
];
const notifications = ['Nova venda registrada', 'Atualizar estoque', 'Novo anúncio publicado'];


export default function PrivateLayout({ currentPath = '' }: { currentPath?: string }) {
  const router = useRouter()
  const { currentTheme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElNotifications, setAnchorElNotifications] = React.useState<null | HTMLElement>(null);
  const [anchorElSettings, setAnchorElSettings] = React.useState<null | HTMLElement>(null);
  const [alertNotification, setAlertNotification] = React.useState<null | Number>(notifications.length);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleOpenNotifications = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElNotifications(event.currentTarget);

  const handleOpenSettings = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElSettings(event.currentTarget);

  const handleCloseNotifications = () => {
    setAnchorElNotifications(null);
    setAlertNotification(0)
  }
  const handleCloseSettings = () => {
    setAnchorElSettings(null);
  }
  const handleSettingsAction = (setting: string) => {
    handleCloseSettings(); // Fecha o menu primeiro

    switch (setting) {
      case 'Perfil':
        router.push('/perfil'); // Redireciona para a página do perfil
        break;
      case 'Conta':
        router.push('/conta'); // Redireciona para a página da conta
        break;
      case 'Tema':
        toggleTheme(currentTheme === 'light' ? 'dark1' : 'light');
        break;
      case 'Sair':
        // Limpa cookies ou tokens e redireciona para a página de login
        nookies.destroy(null, 'token');
        router.push('/auth/logout');
        break;
      default:
        console.warn('Ação desconhecida:', setting);
    }
  };

  const isActive = (path: string) => path === router.pathname;
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
          <AppBar component="nav" position="static" color="default" enableColorOnDark>
            <Container>
              <Toolbar disableGutters>
                <Link href='/home-hub' passHref>
                  <Box component={'span'} display={'flex'} >
                    <Typography variant="h4" component={'h2'} fontWeight={'500'} noWrap color={'primary'}>
                      Hubee
                    </Typography>
                    <Typography variant="h4" component={'h2'} fontWeight={'bold'} noWrap color={'primary'}>
                      Five
                    </Typography>
                  </Box>

                </Link>
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
                          fontWeight: '600',
                          color: isActive(item.path) ? 'primary' : 'inherit', // Cor do texto (ajuste conforme o necessário)
                          borderBottom: isActive(item.path) ? `2px solid #6A1B9A` : 'none', // Cor e espessura da borda inferior
                          pb: 0.5, // Padding na parte inferior para dar um espaçamento visual mais agradável
                        }}>{item.label}</Typography>
                      </Link>
                    </Button>
                   
                  ))}
                  
                </Box>


                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Notificações">
                    <IconButton onClick={handleOpenNotifications}>
                      <Badge badgeContent={Number(alertNotification)} color="error">
                        <NotificationsIcon color={'primary'} fontSize='medium'/>
                      </Badge>
                    </IconButton>
                  </Tooltip>
                  <Menu

                    anchorEl={anchorElNotifications}
                    open={Boolean(anchorElNotifications)}
                    onClose={handleCloseNotifications}
                  >
                    {notifications.map((notification, index) => (
                      <MenuItem key={index} onClick={handleCloseNotifications}>
                        {notification}
                      </MenuItem>
                    ))}
                  </Menu>

                  <Tooltip title="Configurações">
                    <IconButton onClick={handleOpenSettings}>
                      <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" color={'primary'}/>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorElSettings}
                    open={Boolean(anchorElSettings)}
                    onClose={handleCloseSettings}
                  >
                    {settings.map((setting, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleSettingsAction(setting.label)}>
                          <ListItemIcon>{setting.icon}</ListItemIcon>
                          <Typography>{setting.label}</Typography>
                        </ListItemButton>
                      </ListItem>
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
   
    </>
  );
}

