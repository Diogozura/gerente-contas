import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';
import MoneyInput from '../Inputs/InputMoney';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useFormContext } from '@/config/FormContext';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
type EstoqueItem = {
  local: string;
  estoque: number;
  estoqueMin: number;
  precoPago: number;
  dataCompra: string;
};

const LOCAL_STORAGE_KEY = 'listaEstoque';

export default function ListaEstoque({ view }: { view: boolean }) {
  const [listaEstoque, setListaEstoque] = React.useState<EstoqueItem[]>([]);
  const [editIndex, setEditIndex] = React.useState<number | null>(null);
  const { formValues, setFormValues } = useFormContext();
  console.log('listaEstoque', listaEstoque)
  React.useEffect(() => {
    const savedList = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedList) {
      setListaEstoque(JSON.parse(savedList));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(listaEstoque));
  }, [listaEstoque]);

  const adicionarOuEditarEstoque = () => {
    const novoItem: EstoqueItem = {
      local: formValues?.estoque?.local || '',
      estoque: formValues?.estoque?.quantidade || 0,
      estoqueMin: formValues?.estoque?.estoqueMin || 0,
      precoPago: formValues?.precos?.precoPago || 0,
      dataCompra: formValues?.estoque?.dataCompra || moment().format('YYYY-MM-DD'),
    };

    if (novoItem.local.trim() && novoItem.estoque > 0) {
      if (editIndex !== null) {
        const novaLista = [...listaEstoque];
        novaLista[editIndex] = novoItem;
        setListaEstoque(novaLista);
        setEditIndex(null);
      } else {
        setListaEstoque([...listaEstoque, novoItem]);
      }
      setFormValues('estoque', { local: '', quantidade: 0, estoqueMin: 0, precoPago: 0, dataCompra: moment().format('YYYY-MM-DD') });
    }
  };

  const removerEstoque = (index: number) => {
    setListaEstoque(listaEstoque.filter((_, i) => i !== index));
    if (editIndex === index) setEditIndex(null);
  };

  return (
    <>
      

      {editIndex !== null && (
        <Grid container spacing={2} alignItems="center" mt={1} sx={{ borderBottom: '1px solid #ccc', pb: 1 }}>
          <Grid item xs={3}>
            <TextField fullWidth label="Local" variant="outlined" value={formValues?.estoque?.local || ''} onChange={(e) => setFormValues('estoque', { ...formValues.estoque, local: e.target.value })} />
          </Grid>
          <Grid item xs={2}>
            <TextField fullWidth label="Estoque" variant="outlined" type="number" value={formValues?.estoque?.quantidade || ''} onChange={(e) => setFormValues('estoque', { ...formValues.estoque, quantidade: Number(e.target.value) })} />
          </Grid>
          <Grid item xs={2}>
            <TextField fullWidth label="Estoque Mínimo" variant="outlined" type="number" value={formValues?.estoque?.estoqueMin || ''} onChange={(e) => setFormValues('estoque', { ...formValues.estoque, estoqueMin: Number(e.target.value) })} />
          </Grid>
          <Grid item xs={2}>
            <MoneyInput label="Preço Pago" variant="outlined" name="precoPago" />
          </Grid>
          <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="pt-br">
              <DatePicker label="Data de Compra"
               slots={{ openPickerIcon:  AddShoppingCartIcon}}
              slotProps={{
                openPickerIcon: {
                  color: 'active',
                },
              }}
               value={moment(formValues?.estoque?.dataCompra)} 
               onChange={(newValue) => setFormValues('estoque', { ...formValues.estoque, dataCompra: moment(newValue).format('YYYY-MM-DD') })} />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={adicionarOuEditarEstoque}>
              <SaveOutlinedIcon color="action" />
            </IconButton>
            <IconButton onClick={() => setEditIndex(null)}>
              <CloseOutlinedIcon color="action" />
            </IconButton>
          </Grid>
        </Grid>
      )}

      {listaEstoque.map((item, index) => (
        <Grid key={index} container spacing={2} alignItems="center" mt={1} sx={{ borderBottom: '1px solid #ccc', pb: 1 }}>
          <Grid item xs={3}>
            <Typography>{item.local}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>{item.estoque}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>{item.estoqueMin}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>R$ {item.precoPago.toLocaleString('pt-br', { style: 'decimal', minimumFractionDigits: 2 })}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>{moment(item.dataCompra).format('DD/MM/YYYY')}</Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => {
              setFormValues('estoque', { local: item.local, quantidade: item.estoque, estoqueMin: item.estoqueMin, precoPago: item.precoPago, dataCompra: item.dataCompra });
              setEditIndex(index);
            }}>
              <EditOutlinedIcon color="action" />
            </IconButton>
            <IconButton onClick={() => removerEstoque(index)}>
              <DeleteOutlineOutlinedIcon color="action" />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      {listaEstoque.length === 0 && <Typography variant="body1" sx={{ mt: 2 }}>Nenhum estoque cadastrado.</Typography>}
      <Box display="flex" justifyContent="space-between" p={1}>
        
        <Button variant="contained" fullWidth onClick={() => setEditIndex(listaEstoque.length)}>
          + Adicionar Estoque
        </Button>
      </Box>
    </>
  );
}
