import React, { useEffect, useState } from 'react';
import {
  AppBar, Box, Container, Divider, Drawer, IconButton, List,
  ListItem, ListItemButton, ListItemIcon, Menu, MenuItem, Toolbar,
  Tooltip, Typography, Badge, Button,
  Collapse
} from '@mui/material';
import {
  AccountCircle, Contrast, ExitToApp, Settings, Notifications,
  RadioButtonCheckedTwoTone, RadioButtonUnchecked, Work,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from "next/router";
import nookies, { parseCookies, setCookie } from 'nookies';
import { useTheme } from '../../../../../styles/themes/themeContext';

const drawerWidth = 240;
// Defina seus itens de navegação, configurações e notificações
const navItems = [
  { id: 5, label: "Dashboard", path: "/dashboard" },
  { id: 1, label: "Vendas", path: "/vendas" },
  { id: 2, label: "Anúncios", path: "/anuncios" },
  { id: 3, label: "Estoque", path: "/estoque" },
  { id: 4, label: "Gerenciamento", path: "/gerenciamento" },
];
const settings = [
  { label: 'Perfil', icon: <AccountCircle color='action' /> },
  { label: 'Minha conta', icon: <Settings color='action' /> },
  { label: 'Tema', icon: <Contrast color='action' /> },
  { label: 'Sair', icon: <ExitToApp color='action' /> },
];
const notifications = ['Nova venda registrada', 'Atualizar estoque', 'Novo anúncio publicado'];

export default function PrivateLayout({ currentPath = '' }) {
  const router = useRouter();
  const { currentTheme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [anchorElSettings, setAnchorElSettings] = useState(null);
  const [alertNotification, setAlertNotification] = useState(notifications.length);
  const [userName, setUserName] = useState("");
  const [empresas, setEmpresas] = useState([]);
  const [empresaAtiva, setEmpresaAtiva] = useState(null);
  const [openCompanies, setOpenCompanies] = React.useState(false);

  // Estados para gerenciamento de contas
  const [selectedContaId, setSelectedContaId] = useState(null);
  const [acessoContaAlternativa, setAcessoContaAlternativa] = useState(false);
  const [emailAlternativo, setEmailAlternativo] = useState<string | null>(null);
  // Dados do usuário logado (incluindo contas)

 


  const [contas, setContas] = useState([]); // Inicialize com um valor padrão
  const [usuarioLogado, setUsuarioLogado] = useState(null); // Inicialize com null ou o valor padrão desejado
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Só acessa o localStorage no lado do cliente
      const usuario = JSON.parse(localStorage.getItem("dadosUsuarioLogado") || "{}");
      setUsuarioLogado(usuario);
      setSelectedContaId(usuario.contaAtiva || contas?.[0]?.id);
      // Defina as contas após a recuperação do localStorage
      const contasRecuperadas = usuario?.contas || [];
      setContas(contasRecuperadas);
    }
  }, []);
  const emailPrincipal = usuarioLogado?.email || "";
  // Ao carregar, seta usuário, empresas e a conta ativa
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("dadosUsuarioLogado") || "{}");
    setUserName(usuario?.userName || "Usuário não encontrado");
    setEmpresas(JSON.parse(localStorage.getItem("empresas") || "[]"));
    setEmpresaAtiva(usuario?.empresaAtiva || null);
    setAcessoContaAlternativa(usuario?.acessoContaAlternativa || false);
    setEmailAlternativo(usuario?.emailOwner)
    const contaSelecionada = contas?.find(conta => conta.id === selectedContaId);
    if (contaSelecionada) {
      setEmailAlternativo(contaSelecionada.email_owner);
    }

  }, []);

  useEffect(() => {
   
  }, [selectedContaId, contas]);

  // Recupera o ID da conta armazenado nos cookies ou usa a primeira conta do usuário
  useEffect(() => {
    const cookies = parseCookies();
    setSelectedContaId(cookies.idConta || contas?.[0]?.id);
  }, [contas]);

  // Função para alternar entre contas
  const handleSwitchAccount = (idConta, emailOwner) => {
    setSelectedContaId(idConta);
  
    // Atualiza o cookie com o novo ID da conta (válido por 7 dias)
    setCookie(null, "idConta", idConta, {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  
    setTimeout(() => {
      window.location.reload();
    }, 100); 
    // Se o e-mail da conta selecionada for diferente do e-mail principal, ativa o acesso alternativo
    setAcessoContaAlternativa(emailOwner !== emailPrincipal);

    // Forçar a atualização dos dados do localStorage ao alternar a conta
    const usuario = JSON.parse(localStorage.getItem("dadosUsuarioLogado") || "{}");
  
    // Atualizar o estado do usuário logado com os dados da conta alternada
    usuario.acessoContaAlternativa = emailOwner !== emailPrincipal; // Atualiza a conta ativa no objeto do usuário
    usuario.emailOwner = emailOwner; // Atualiza a conta ativa no objeto do usuário
    localStorage.setItem("dadosUsuarioLogado", JSON.stringify(usuario)); // Salva no localStorage
    router.replace(router.asPath);
    // Atualize as contas para refletir as mudanças
    const contasRecuperadas = usuario?.contas || [];
    setContas(contasRecuperadas);
    
    // Atualiza outras informações relacionadas à conta
    setUserName(usuario?.userName || "Usuário não encontrado");
    setEmpresas(JSON.parse(localStorage.getItem("empresas") || "[]"));
    setEmpresaAtiva(usuario?.empresaAtiva || null);

  };
  const handleToggleCompanies = () => {
    setOpenCompanies((prev) => !prev);
  };
  // Demais funções do layout (menu, navegação, etc.)
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMenuOpen = (setter) => (event) => setter(event.currentTarget);
  const handleMenuClose = (setter) => () => setter(null);
  const handleSettingsAction = (setting) => {
    handleMenuClose(setAnchorElSettings)();
    if (setting === 'Tema') toggleTheme(currentTheme === 'light' ? 'dark1' : 'light');
    if (setting === 'Sair') {
      nookies.destroy(null, 'token');
      router.push('/auth/logout');
    } else router.push(`/${setting.toLowerCase().replace(' ', '-')}`);
  };

  // Exemplo de drawer lateral
  const drawer = (
    <Box onClick={handleDrawerToggle} component="nav">
      <Box padding={1} color="white">
        <Link href="/">
          <Typography variant="h6" fontWeight='bold' ml={1} color='primary'>
            Hubeefive
          </Typography>
        </Link>
      </Box>
      <Divider sx={{ border: "1px solid #939393" }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton>
              <Link href={item.path} style={{ textDecoration: "none" }}>
                {item.label}
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
        <Divider sx={{ border: "1px solid #939393" }} />
        <ListItem>
          <ListItemButton>
            <Typography fontWeight="bold">Empresas</Typography>
          </ListItemButton>
        </ListItem>
        {empresas.length ? empresas.map((empresa) => (
          <ListItemButton
            key={empresa.id}
            selected={empresaAtiva === empresa.id}
            onClick={() => setEmpresaAtiva(empresa.id)}
            sx={{
              bgcolor: empresaAtiva === empresa.id ? "primary.main" : "inherit",
              color: empresaAtiva === empresa.id ? "white" : "inherit"
            }}
          >
            <ListItemIcon>
              {empresaAtiva === empresa.id ?
                <RadioButtonCheckedTwoTone color='action' /> :
                <RadioButtonUnchecked color='action' />}
            </ListItemIcon>
            <Typography>{empresa.nome}</Typography>
          </ListItemButton>
        )) : (
          <ListItem>
            <Typography sx={{ pl: 4, color: "gray" }}>
              Nenhuma empresa cadastrada
            </Typography>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar position="static" color="default">
          <Container>
            <Toolbar>
              <Link href='/home-hub' passHref>
                <Typography variant="h4" fontWeight='bold' color='primary'>
                  HubeeFive
                </Typography>
              </Link>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  justifyContent: "center"
                }}
              >
                {navItems.map((item) => (
                  <Button key={item.id} sx={{ color: 'primary', mx: 2 }}>
                    <Link href={item.path} passHref>
                      <Typography
                        fontWeight='600'
                        sx={{
                          color: router.pathname === item.path ? 'primary' : 'inherit',
                          borderBottom: router.pathname === item.path ? `2px solid #6A1B9A` : 'none'
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Link>
                  </Button>
                ))}
              </Box>
              <Tooltip title="Notificações">
                <IconButton onClick={handleMenuOpen(setAnchorElNotifications)}>
                  <Badge badgeContent={alertNotification} color="error">
                    <Notifications color='primary' />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElNotifications}
                open={Boolean(anchorElNotifications)}
                onClose={handleMenuClose(setAnchorElNotifications)}
              >
                {notifications.map((notification, index) => (
                  <MenuItem key={index}>{notification}</MenuItem>
                ))}
              </Menu>
              <Tooltip title="Configurações">
                <IconButton onClick={handleMenuOpen(setAnchorElSettings)}>
                  <Settings color="primary" />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElSettings}
                open={Boolean(anchorElSettings)}
                onClose={handleMenuClose(setAnchorElSettings)}
              >
                {settings.map((setting, index) => (
                  <MenuItem key={index} onClick={() => handleSettingsAction(setting.label)}>
                    <ListItemIcon>{setting.icon}</ListItemIcon>
                    <Typography>{setting.label}</Typography>
                  </MenuItem>
                ))}
                {/* Se houver mais de uma conta, exibe o item para trocar de conta */}
                {contas.length > 1 && (
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleToggleCompanies}>
                      <ListItemIcon>
                        <Work color="action" />
                      </ListItemIcon>
                      <Typography>Contas</Typography>
                      {openCompanies ? <ExpandLess color='action' /> : <ExpandMore color='action' />}
                    </ListItemButton>
                  </ListItem>
                )}
                <Collapse in={openCompanies} timeout="auto" unmountOnExit>
                  {/* Lista de contas */}
                  {contas.length > 1 && contas.map((conta) => (
                    <ListItem key={conta.id} disablePadding>
                      <ListItemButton
                        sx={{
                          textAlign: "center",
                          bgcolor: selectedContaId === conta.id ? "lightblue" : "inherit"
                        }}
                        onClick={() => handleSwitchAccount(conta.id, conta.email_owner)}
                      >
                        <Typography>{conta.first_name_owner}</Typography>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </Collapse>

              </Menu>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      {/* Drawer lateral para mobile */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
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

      {/* Alerta de conta alternativa */}
      {acessoContaAlternativa && (
        <Box sx={{ backgroundColor: "orange", display: "flex", justifyContent: "space-evenly", p: 1 }}>
          <Typography textAlign="center" component="p" variant="body1">
            Você está na conta alternativa {emailAlternativo}
          </Typography>
          <Button
            color="inherit"
            onClick={() => handleSwitchAccount(contas?.[0]?.id, emailPrincipal)}
          >
            Voltar para a conta principal
          </Button>
        </Box>
      )}
    </>
  );
}
