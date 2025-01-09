import { Button, FormControl, FormControlLabel, Grid, IconButton, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React from 'react';
import MoneyInput from '../common/InputMoney';
import { FormProvider, useFormContext } from '../../config/FormContext';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';



export default function ListaPreco({ view }) {
  const { formValues, setFormValues } = useFormContext();
 const [variacao, setVariacao] = React.useState("");
  const [precoMinimo, setPrecoMinimo] = React.useState<number>(0);

  const adicionarListaPreco = () => {
    if (variacao && precoMinimo) {
      setNewProduct((prev) => ({
        ...prev,
        listaPrecos: [...prev.listaPrecos, { variacao, precoMinimo }],
      }));
      setVariacao("");
      setPrecoMinimo(0);
    }
  };

  // Remover item da lista de preços
  const removerListaPreco = (index: number) => {
    setNewProduct((prev) => ({
      ...prev,
      listaPrecos: prev.listaPrecos.filter((_, i) => i !== index),
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues('meuFormulario', { [name]: value }); // Atualiza valores dinamicamente
  };

  return (
    <>
      <Grid container spacing={2}>
        {/* <Grid item xs={6} sm={6}>
          <MoneyInput label="Valor Mínimo" name="valorMinimo" />
          <MoneyInput label="Valor da compra" name="valorCompra" />
          <MoneyInput label="Preço sugerido" name="precoSugerido" />
          <MoneyInput label="Lucro real" name="lucroReal" />
          <Typography>Valores: {JSON.stringify(formValues.detalhesProduto || {})}</Typography>
          <Typography>meu form: {JSON.stringify(formValues.meuFormulario || {})}</Typography>
        </Grid> */}

        <Grid item xs={12}>
          <MoneyInput label="Valor da compra" name="valorCompra" />
        </Grid>
        <Typography variant="h6">Lista de Preços</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}>
            <TextField
              label="Variação"
              fullWidth
              name="valor"
              value={formValues.garantia?.valor || ''}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={4}>
            <MoneyInput label="Valor da compra" name="valorMinimo" />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={adicionarListaPreco}>
              Adicionar
            </Button>
          </Grid>
        </Grid>

        {/* Renderizar Lista de Preços */}
        {newProduct.listaPrecos.map((item, index) => (
          <Grid
            key={index}
            container
            spacing={2}
            alignItems="center"
            mt={1}
            sx={{ borderBottom: "1px solid #ccc", pb: 1 }}
          >
            <Grid item xs={4}>
              <Typography>{item.variacao}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>R$ {item.precoMinimo.toLocaleString('pt-br', { style: 'decimal', minimumSignificantDigits: 3 })}</Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={() => removerListaPreco(index)}>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}

      </Grid>

    </>

  );
}
