import React, { useState, useEffect } from "react";
import { Drawer, List, ListItem, ListItemText, Box, Checkbox, CircularProgress, Accordion, AccordionSummary, AccordionDetails, Typography, Container, Grid } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Page {
  name: string;
  path: string;
}

interface PagesData {
  [folder: string]: Page[];
}
const STORAGE_KEY = "telaFuncionando";
const NovidadesPage: React.FC = () => {
  const [pages, setPages] = useState<PagesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkedPages, setCheckedPages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const savedPages = localStorage.getItem(STORAGE_KEY);
    if (savedPages) {
      setCheckedPages(JSON.parse(savedPages));
    }
    fetch("/api/getPages")
      .then((res) => res.json())
      .then((data) => {
        setPages(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
 // 🔹 Atualiza o localStorage quando um checkbox for alterado
 const handleCheckboxChange = (path: string) => {
    setCheckedPages((prev) => {
      const newCheckedPages = { ...prev, [path]: !prev[path] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCheckedPages));
      return newCheckedPages;
    });
  };
  return (
    <Container sx={{
        backgroundColor:'Background'
    }}>
      <Grid container spacing={2} >
        <Grid item xs={12}>
        <Typography variant="h3" component={'h1'}>Novidades</Typography>
        <Typography variant="body2" component={'p'}>Verifique quais páginas estão funcionando corretamente.</Typography>
        </Grid>
      
      <Grid item xs={12}>
      <List>
          {loading ? (
            <CircularProgress sx={{ margin: "auto", display: "block" }} />
          ) : (
            Object.entries(pages || {}).map(([folder, items]) => (
              <Accordion defaultExpanded key={folder} sx={{ background: "transparent", boxShadow: "none" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">{folder}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {items.map((page) => (
                      <ListItem key={page.path}>
                        <Checkbox checked={checkedPages[page.path] || false}
                          onChange={() => handleCheckboxChange(page.path)}/>
                        <ListItemText primary={page.name} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </List>
      </Grid>
        
      
        </Grid>
      {/* Conteúdo Principal */}
      
    </Container>
  );
};

export default NovidadesPage;
