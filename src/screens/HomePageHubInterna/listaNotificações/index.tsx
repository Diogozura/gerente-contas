import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

// Importa os dados do JSON
import notificacoes from '../../../mock/notificacoes.json';

export default function ListaDeNotificacao() {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {notificacoes.map((notificacao, index) => (
        <React.Fragment key={notificacao.id}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={notificacao.titulo}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: 'text.primary', display: 'inline' }}
                  >
                    {notificacao.descricao}
                  </Typography>
                  {` ${notificacao.sku} - ${notificacao.data}`}
                </React.Fragment>
              }
            />
          </ListItem>
          {/* Renderiza o Divider somente se não for o último item */}
          {index < notificacoes.length - 1 && <Divider variant="inset" component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
}
