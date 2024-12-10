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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import SearchIcon from '@mui/icons-material/Search';
import FiltroTexto from "../../../components/common/FiltroText";
import FiltroAvancado from "../../../components/common/FiltroAvancado";

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

  const handleSearch = () => {
    if (searchValue.trim() !== '') {
      console.log('Valor pesquisado:', searchValue); // Salva o valor no console
      // Aqui você pode chamar outra função ou processar o valor
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Opções para o filtro avançado
  const filtroAvancadoOpcoes = [
    { value: 'categoria', label: 'Categoria' },
    { value: 'status', label: 'Status' },
    { value: 'preco', label: 'Preço' },
  ];

  // Filtragem dos produtos
  const produtosFiltrados = products.filter((produto) =>
    produto.titulo.toLowerCase().includes(textoFiltro.toLowerCase()) ||
    produto.sku.includes(textoFiltro)
  );
  console.log('produtosFiltrados', produtosFiltrados);
  // Lógica de exclusão em massa
  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      alert("Selecione pelo menos um produto para excluir.");
      return;
    }

    if (confirm("Você tem certeza que deseja excluir os produtos selecionados?")) {
      selectedIds.forEach((id) => onDelete(id));
      alert("Produtos excluídos com sucesso!");
    }
  };
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={someSelected}
                checked={allSelected}
                onChange={onSelectAll}
              />
            </TableCell>
            <TableCell padding="normal">
              {/* <TextField
            variant="outlined"
            id="outlined-basic"
            placeholder="Filtro de visualização"
            onKeyDown={handleKeyDown} // Chama a função ao pressionar uma tecla
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
            //   disabled={editIndex !== index} // Somente habilitado no modo edição
            //   value={nomeLojas[index]}
            //   onChange={(event) => handleChange(event, index)}
              sx={{ width: "400px", 
              
                '& .MuiOutlinedInput-root': {
                borderRadius: '60px', // Aplica o borderRadius ao campo
                },  
             }}
            /> */}

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
          </TableRow>
        </TableHead>
        <TableBody>
          {produtosFiltrados.map((product, index) => (

            <TableRow key={product.id} sx={{
              borderBottom: '20px solid #f5f5f5', // Cor da separação entre as linhas
              bgcolor: "Background", // Cor alternada de fundo para melhorar a visualização
            }}>

              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedIds.includes(product.id)}
                  onChange={() => onSelectOne(product.id)}
                />
              </TableCell>
              <TableCell padding="checkbox">
                <Image
                  src={'https://picsum.photos/200'}
                  width={200}
                  height={200} alt={""} />
              </TableCell>
              <TableCell>
                <Link href={`/estoque/${product.sku}`} passHref>
                  <Typography color="primary" style={{ cursor: "pointer" }}>
                    {product.titulo}
                  </Typography>


                </Link>
                <Typography  >
                  SKU : {product.sku}
                </Typography>
                <Typography  >
                  Estoque : {product.estoque}
                </Typography>
              </TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => onEdit(product)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(product.id)}>
                  <Delete />
                </IconButton>
              </TableCell>

            </TableRow>

          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QuickFilteringGrid;
