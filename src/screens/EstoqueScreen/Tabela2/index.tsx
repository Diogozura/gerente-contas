import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Checkbox,
  Paper,
  TextField,
  InputAdornment,
  Button,
  Box,
  Modal,
  Chip,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import SearchIcon from '@mui/icons-material/Search';
import FiltroTexto from "../../../components/common/FiltroText";
import FiltroAvancado from "../../../components/common/FiltroAvancado";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LinkIcon from '@mui/icons-material/Link';
import { ModalVinculo } from "@/components/ui/Modal";
import { showToast } from "@/components/common/AlertToast";
import EditarProdutoForm from "@/components/forms/EditarProdutoForm";
interface Product {
  id: number;
  titulo: string;
  sku: string;
  estoque: number;
  estoqueCd: number;
  estoqueMin: number;
  estoqueCdMin: number;
}

interface QuickFilteringGridProps {
  products: Product[];
  selectedIds: number[];
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectOne: (id: number) => void;
  onEdit: (updatedProduct: Product) => void;
  onDelete: (id: number) => void;
}
const verificarDadosFaltantes = (product: Product): string[] => {
  return Object.entries(product)
    .filter(([_, value]) => value === null || value === undefined || value === "")
    .map(([key]) => key);
};

const QuickFilteringGrid: React.FC<QuickFilteringGridProps> = ({
  products,
  onDelete,
  selectedIds,
  onSelectAll,
  onSelectOne,
  onEdit,
}) => {
  const allSelected = selectedIds.length === products.length;
  const someSelected = selectedIds.length > 0 && !allSelected;
  const [textoFiltro, setTextoFiltro] = React.useState('');
  const [filtroAvancado, setFiltroAvancado] = React.useState('');
  const [searchValue, setSearchValue] = React.useState<string>('');

  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);





  // Filtragem dos produtos
  const produtosFiltrados = products.filter((produto) =>
    produto.titulo.toLowerCase().includes(textoFiltro.toLowerCase()) ||
    produto.sku.includes(textoFiltro)
  );

  const [modalState, setModalState] = React.useState({
    open: false,
    tipo: "",
    data: null, // Armazena os dados do produto no modal
  });

  const handleOpenModal = (tipo: string, data: Product | null = null) => {
    setModalState({
      open: true,
      tipo,
      data, // Passa os dados do produto atual
    });
  };

  const handleCloseModal = () => {
    setModalState({ open: false, tipo: "", data: null });
  };

  const handleSaveModal = (data: any) => {
    showToast({
      title: "Salvo com sucesso!",
      status: "success",
      position: "bottom-left",
    });
    handleCloseModal();
  };


  return (
    <>
      <TableContainer>
        <Table>
          <TableBody >
            {produtosFiltrados.map((product) => {
              const dadosFaltantes = verificarDadosFaltantes(product);
              return (
               
                <TableRow component={Paper} key={product.id} sx={{
                  borderBottom: '20px solid #f5f5f5', // Cor da separação entre as linhas
                  bgcolor: "Background", // Cor alternada de fundo para melhorar a visualização
                  boxShadow: '0px 15px 5px #000000'
                 
                }}>

  

                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedIds.includes(product.id)}
                      onChange={() => onSelectOne(product.id)}
                    />
                  </TableCell>
                  <TableCell padding="none" >

                    <Image
                      src={'https://picsum.photos/200'}
                      width={150}
                      height={150} alt={"aaa"} />
                  </TableCell>
                  <TableCell>
                    <Link href={`/estoque/${product.sku}`} passHref>
                      <Typography style={{ cursor: "pointer" }} fontWeight={'600'} component="h3">
                        {product.titulo}
                      </Typography>


                    </Link>
                    <Typography component="p">
                      SKU : <b>{product.sku}</b>
                    </Typography>
                    <Typography component="p">
                      Estoque : <b>{product.estoqueCd}</b>
                    </Typography>
                    <Typography component="p">
                      Estoque em centro de distribuição : <b>{product.estoque}</b>
                    </Typography>
                    <Typography display={'flex'} component="p">
                      🔗 Vinculado em seus Anúncios
                    </Typography>
                  </TableCell>

                  <TableCell sx={{
                    display: 'grid',
                    borderBottom: 'none' ,
                  }}>
                    {product.estoqueMin > product.estoque ?
                      <>
                      <Chip color="error" label="Estoque   Baixo" sx={{borderRadius: '5px'}} variant="filled"/>
                        <Button variant="contained" color={'error'} sx={{ m: 1 }}>
                          Estoque   Baixo
                        </Button>

                      </> : null
                    }
                    {product.estoqueCdMin > product.estoqueCd ?
                      <>
                        <Chip color="error" label="Estoque Baixo Em CD" sx={{borderRadius: '5px'}} variant="filled"/>
                        <Button variant="contained" color={'error'} > 
                          Estoque Baixo Em CD
                        </Button>


                      </> : null
                    }

                    {dadosFaltantes.length > 0 ?
                      <>
                        <Button
                          variant="contained"
                          color={dadosFaltantes.length > 0 ? "warning" : "success"}
                          sx={{ m: 1 }}
                        >
                          {dadosFaltantes.length > 0
                            ? `Faltam dados: ${dadosFaltantes.join(", ")}`
                            : ""}
                        </Button>

                      </> : null
                    }




                  </TableCell>

                  <TableCell >
                    <Button variant="contained" color="inherit" sx={{ m: 1 }}
                      onClick={() => handleOpenModal("Editar", product)}>
                      <Edit />
                    </Button>
                    <Button variant="contained" color="inherit" disabled
                      sx={{ m: 1 }}
                    >
                      <ContentCopyIcon />
                    </Button>
                    <Button variant="contained" color="inherit"
                      onClick={() => onDelete(product.id)}
                      sx={{ m: 1 }}
                    >
                      <Delete />
                    </Button>
                    <Button variant="contained" color="inherit" disabled
                      sx={{ m: 1 }}
                    >
                      <RemoveRedEyeIcon />
                    </Button>
                  </TableCell>

                </TableRow>
                
              )
            }


            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalVinculo
        open={modalState.open}
        onClose={handleCloseModal}
        title={'Editar Produto'}
        subTitulo=""
        onSave={handleSaveModal}>
        
             <EditarProdutoForm view={false}/>    
        
      </ModalVinculo>
    </>
  );
};

export default QuickFilteringGrid;
