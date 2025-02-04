import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
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
  const [precoMinimo, setPrecoMinimo] = React.useState<number>(0);
  const [editIndex, setEditIndex] = React.useState<number | null>(null);
  const { formValues, setFormValues } = useFormContext();


  // Carregar dados do localStorage na inicialização
  React.useEffect(() => {
    const savedList = localStorage.getItem(LOCAL_STORAGE_KEY);
    console.log('savedList', savedList)
    if (savedList) {
      setListaPrecificacao(JSON.parse(savedList));
    }
  }, []);


  // Salvar lista no localStorage sempre que for atualizada
  // React.useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(listaPrecificacao));
  // }, [listaPrecificacao]);

  // Adicionar ou editar item na lista
    const adicionarOuEditarListaPreco = () => {
      const precoMinimo = formValues?.precos?.valorMinimo || 0; // Use o valor do contexto
      if (variacao && precoMinimo > 0) {
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

 
  // Atualizar item na lista
  const atualizarItem = (index: number, field: keyof PrecificacaoItem, value: string | number) => {
    setListaPrecificacao((prev) => {
      const novaLista = [...prev];
      novaLista[index] = {
        ...novaLista[index],
        [field]: value,
      };
      return novaLista;
    });
  };

  // Salvar edição
  const salvarEdicao = () => {
    setEditIndex(null); // Sair do modo de edição
  };

  // Cancelar edição
  const cancelarEdicao = () => {
    setEditIndex(null);
  };

  // Remover item da lista
  const removerListaPreco = (index: number) => {
    const novaLista = listaPrecificacao.filter((_, i) => i !== index);
    setListaPrecificacao(novaLista);
    if (editIndex === index) {
      setEditIndex(null); // Resetar modo de edição se o item removido estava sendo editado
    }
  };

  return (
    <>
      

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
          {/* Se a linha está em modo de edição */}
          {editIndex === index ? (
            <>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  variant='standard'
                  value={item.variacao}
                  onChange={(e) => atualizarItem(index, 'variacao', e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
              <MoneyInput label="Valor Mínimo" variant='standard' name="valorMinimo" />
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={salvarEdicao}>
                  <SaveOutlinedIcon />
                </IconButton>
                <IconButton onClick={cancelarEdicao}>
                  <CloseOutlinedIcon />
                </IconButton>
              </Grid>
            </>
          ) : (
            // Se a linha está em modo de visualização
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
                <IconButton onClick={() => setEditIndex(index)}>
                  <EditOutlinedIcon />
                </IconButton>
                <IconButton onClick={() => removerListaPreco(index)}>
                  <DeleteOutlineOutlinedIcon />
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
