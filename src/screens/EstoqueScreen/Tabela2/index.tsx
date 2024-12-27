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

  const [openModal, setOpenModal] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setOpenModal(true);
  };
  const handleSave = () => {
    if (editingProduct) {
      onEdit(editingProduct);
      setOpenModal(false);
    }
  };

  const handleChange = (field: keyof Product, value: string | number) => {
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [field]: value });
    }
  };

  // Filtragem dos produtos
  const produtosFiltrados = products.filter((produto) =>
    produto.titulo.toLowerCase().includes(textoFiltro.toLowerCase()) ||
    produto.sku.includes(textoFiltro)
  );


  return (
    <>
    <TableContainer>
      <Table>
        <TableHead>
          {/* <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={someSelected}
                checked={allSelected}
                onChange={onSelectAll}
              />
            </TableCell>
    
            <TableCell padding="normal">
              <FiltroTexto
                label="Filtrar por título ou SKU"
                value={textoFiltro}
                onChange={setTextoFiltro}

              />
            </TableCell>
            <TableCell padding="normal">
              <FiltroAvancado
                label="Filtrar por"
                options={filtroAvancadoOpcoes}
                value={filtroAvancado}
                onChange={setFiltroAvancado}
              />
            </TableCell>
            
            <TableCell padding="normal">
              <Typography variant="body2">
                Total de Produtos: {products.length} / Selecionados: {selectedIds.length}
              </Typography>
            </TableCell>
            <TableCell padding="normal">
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteSelected}
                disabled={selectedIds.length === 0}
              >
                Excluir Produtos
              </Button>
            </TableCell>
          </TableRow> */}
        </TableHead>
        <TableBody >
          {produtosFiltrados.map((product) => {
             const dadosFaltantes = verificarDadosFaltantes(product);
             return(
              <TableRow component={Paper} key={product.id} sx={{
                borderBottom: '20px solid #f5f5f5', // Cor da separação entre as linhas
                bgcolor: "Background", // Cor alternada de fundo para melhorar a visualização
  
              }}>
  
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedIds.includes(product.id)}
                    onChange={() => onSelectOne(product.id)}
                  />
                </TableCell>
                <TableCell padding="none">
  
                  <Image
                    src={'https://picsum.photos/200'}
                    width={150}
                    height={150} alt={""} />
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
                  display: 'grid'
                }}>
                  {product.estoqueMin > product.estoque ?
                    <>
                      <Button variant="contained" color={'error'} sx={{ m: 1 }}>
                        Estoque   Baixo
                      </Button>
  
                    </> : null
                  }
                  {product.estoqueCdMin > product.estoqueCd ?
                    <>
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
                    onClick={() => handleEdit(product)}>
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

      {/* Modal de edição */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Paper
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "16px",
            width: "400px",
          }}
        >
          {editingProduct && (
            <>
              <Typography variant="h6">Editar Produto</Typography>
              <TextField
                label="Título"
                fullWidth
                value={editingProduct.titulo}
                onChange={(e) => handleChange("titulo", e.target.value)}
                margin="normal"
              />
              <TextField
                label="SKU"
                fullWidth
                value={editingProduct.sku}
                onChange={(e) => handleChange("sku", e.target.value)}
                margin="normal"
              />
              <TextField
                label="Estoque"
                type="number"
                fullWidth
                value={editingProduct.estoque}
                onChange={(e) => handleChange("estoque", Number(e.target.value))}
                margin="normal"
              />
              <Button variant="contained" color="primary" onClick={handleSave}>
                Salvar
              </Button>
            </>
          )}
        </Paper>
      </Modal>
    </>
  );
};

export default QuickFilteringGrid;
