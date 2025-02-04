import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';
import MoneyInput from '../Inputs/InputMoney';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useFormContext } from '@/config/FormContext';

type PrecificacaoItem = {
  variacao: string;
  precoMinimo: number;
};

const LOCAL_STORAGE_KEY = 'listaPrecificacao';

export default function ListaPreco({ view }: { view: boolean }) {
  const [listaPrecificacao, setListaPrecificacao] = React.useState<PrecificacaoItem[]>([]);
  const [variacao, setVariacao] = React.useState('');
  const [editIndex, setEditIndex] = React.useState<number | null>(null);
  const { formValues, setFormValues } = useFormContext();
  
  // Carregar dados do localStorage na inicialização
  React.useEffect(() => {
    const savedList = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedList) {
      setListaPrecificacao(JSON.parse(savedList));
    }
  }, []);

  // Salvar lista no localStorage sempre que for atualizada
  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(listaPrecificacao));
  }, [listaPrecificacao]);

  // Adicionar ou editar item na lista
  const adicionarOuEditarListaPreco = () => {
    const precoMinimo = formValues?.precos?.valorMinimo || 0; // Use o valor do contexto
    if (variacao.trim() && precoMinimo > 0) {
      if (editIndex !== null) {
        // Atualizar item existente
        const novaLista = [...listaPrecificacao];
        novaLista[editIndex] = { variacao, precoMinimo };
        setListaPrecificacao(novaLista);
        setEditIndex(null); // Sair do modo de edição
      } else {
        // Adicionar novo item
        setListaPrecificacao([...listaPrecificacao, { variacao, precoMinimo }]);
      }

      // Resetar campos
      setVariacao('');
      setFormValues('precos', { valorMinimo: 0 }); // Reseta o valor no contexto
    }
  };

  // Remover item da lista
  const removerListaPreco = (index: number) => {
    const novaLista = listaPrecificacao.filter((_, i) => i !== index);
    setListaPrecificacao(novaLista);
    if (editIndex === index) {
      setEditIndex(null); // Resetar modo de edição se o item removido estava sendo editado
    }
  };

  const adicionarNovoItem = () => {
    const novoItem: PrecificacaoItem = { variacao: '', precoMinimo: 0 };
    setListaPrecificacao([novoItem, ...listaPrecificacao]); // Adiciona no topo
    setEditIndex(0); // Sempre edita o primeiro item da lista
    setVariacao(''); // Limpa o campo de variação
    setFormValues('precos', { valorMinimo: 0 }); // Reseta o valor mínimo
  };

  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'} p={1}>
        <Typography variant="body1" component={'p'}>Crie variações de preços para diferentes tipos ou canais de venda</Typography>
        <Button
          variant="contained"
          onClick={() => adicionarNovoItem()}
          sx={{ mb: 2 }}
        >
          + Adicionar Lista
        </Button>
      </Box>


      {/* Inputs para adicionar ou editar precificação */}


      {/* Renderizar a lista de precificação */}
      {listaPrecificacao.map((item, index) => (
        <Grid
          key={index}
          container
          spacing={2}
          alignItems="center"
          mt={1}
          sx={{ borderBottom: '1px solid #ccc', pb: 1 }}
        >
          {editIndex === index ? (
            <>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Variação"
                  value={variacao}
                  onChange={(e) => setVariacao(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <MoneyInput
                  label="Valor Mínimo"
                  variant="standard"
                  name="valorMinimo"
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={adicionarOuEditarListaPreco}>
                  <SaveOutlinedIcon color="action" />
                </IconButton>
                <IconButton onClick={() => setEditIndex(null)}>
                  <CloseOutlinedIcon color="action" />
                </IconButton>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={4}>
                <Typography>{item.variacao}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  R$ {item.precoMinimo.toLocaleString('pt-br', { style: 'decimal', minimumFractionDigits: 2 })}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => {
                  setVariacao(item.variacao); // Preenche com o valor atual
                  setFormValues('precos', { valorMinimo: item.precoMinimo }); // Preenche o valor de "precoMinimo"
                  setEditIndex(index);
                }}>
                  <EditOutlinedIcon color="action" />
                </IconButton>
                <IconButton onClick={() => removerListaPreco(index)}>
                  <DeleteOutlineOutlinedIcon color="action" />
                </IconButton>
              </Grid>
            </>
          )}
        </Grid>
      ))}

      {/* Mensagem caso a lista esteja vazia */}
      {listaPrecificacao.length === 0 && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Nenhum item na lista de precificação.
        </Typography>
      )}
    </>
  );
}
