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

}

interface QuickFilteringGridProps {
  products: Product[];
  selectedIds: number[];
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectOne: (id: number) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const QuickFilteringGrid: React.FC<QuickFilteringGridProps> = ({
  products,
  onEdit,
  onDelete,
  selectedIds,
  onSelectAll,
  onSelectOne,
}) => {
  const allSelected = selectedIds.length === products.length;
  const someSelected = selectedIds.length > 0 && !allSelected;
  const [textoFiltro, setTextoFiltro] = React.useState('');
  const [filtroAvancado, setFiltroAvancado] = React.useState('');
  const [searchValue, setSearchValue] = React.useState<string>('');



  // Filtragem dos produtos
  const produtosFiltrados = products.filter((produto) =>
    produto.titulo.toLowerCase().includes(textoFiltro.toLowerCase()) ||
    produto.sku.includes(textoFiltro)
  );

  
  return (
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
          {produtosFiltrados.map((product, index) => (

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
                  <Typography  style={{ cursor: "pointer" }} fontWeight={'600'}  component="h3">
                    {product.titulo}
                  </Typography>


                </Link>
                <Typography   component="p">
                  SKU : <b>{product.sku}</b>
                </Typography>
                <Typography   component="p">
                  Estoque : <b>{product.estoqueCd}</b>
                </Typography>
                <Typography   component="p">
                  Estoque em centro de distribuição : <b>{product.estoque}</b>
                </Typography>
                <Typography display={'flex'} component="p">
                🔗 Vinculado em seus Anúncios
                </Typography>
              </TableCell>
            
              <TableCell sx={{
                display:'grid'
              }}>
             
                <Button variant="contained" color={'error'} sx={{m:1}}>
                  Estoque   Baixo
                </Button>
                <Button variant="contained" color={'error'} >
                  Estoque Baixo Em CD
                </Button>
                <Button variant="contained" color={'success'} >
                 Confirme dados do produto
                </Button>
              
              </TableCell>
       
              <TableCell >
                <Button variant="contained" color="inherit" sx={{ m:1}} 
                onClick={() => onEdit(product)}>
                  <Edit />
                </Button>
                <Button variant="contained" color="inherit" disabled 
                sx={{m:1}} 
                >
                  <ContentCopyIcon />
                </Button>
                <Button variant="contained" color="inherit" 
                onClick={() => onDelete(product.id)}
                sx={{m:1}} 
                >
                  <Delete />
                </Button>
                <Button variant="contained" color="inherit" disabled
                 sx={{m:1}} 
                >
                  <RemoveRedEyeIcon />
                </Button>
              </TableCell>

            </TableRow>

          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QuickFilteringGrid;
