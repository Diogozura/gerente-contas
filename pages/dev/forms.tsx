import React, { useState, lazy, Suspense } from 'react';
import fs from 'fs';
import path from 'path';
import { Drawer, List, ListItem, ListItemText, Box, CircularProgress } from '@mui/material';

interface FormsPageProps {
  forms: string[];
}

const FormsPage: React.FC<FormsPageProps> = ({ forms }) => {
  const [selectedForm, setSelectedForm] = useState<string | null>(null);

  const loadForm = (formName: string) => {
    return lazy(() => import(`../../src/components/forms/${formName}`));
  };

  const FormComponent = selectedForm ? loadForm(selectedForm) : null;

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Menu Lateral */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <List>
          {forms.map((form) => (
            <ListItem
              button
              key={form}
              onClick={() => setSelectedForm(form.replace('.tsx', ''))}
            >
              <ListItemText primary={form.replace('.tsx', '')} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Área de Visualização */}
      <Box sx={{ flexGrow: 1, p: 2 }}>
        {selectedForm ? (
          <Suspense fallback={<CircularProgress />}>
            <FormComponent />
          </Suspense>
        ) : (
          <Box>Selecione um formulário no menu ao lado.</Box>
        )}
      </Box>
    </Box>
  );
};

export const getStaticProps = async () => {
    const formsDirectory = path.join(process.cwd(), 'src', 'components', 'forms'); // Ajuste para 'components'

    console.log('Caminho calculado:', formsDirectory); // Para debug
    const forms = fs.existsSync(formsDirectory)
      ? fs.readdirSync(formsDirectory).filter((file) => file.endsWith('.tsx'))
      : [];
  

  return {
    props: {
      forms,
    },
  };
};

export default FormsPage;
