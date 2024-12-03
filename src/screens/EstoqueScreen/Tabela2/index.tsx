import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import { SaveAlt, Edit, Delete, Visibility } from "@mui/icons-material";
import { saveAs } from "file-saver";

// Dados fake (simula importação)


const ProductsPage = ({products, selectedAll}) => {
  const [product, setProducts] = useState(products);
  const [selected, setSelected] = useState<number[]>(selectedAll);
  console.log('selected all', selectedAll)
  console.log('selected individual', selected)
// Seleção individual
const handleSelect = (id: number) => {
  setSelected((prev) =>
    prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
  );
};

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Gerenciamento de Produtos
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
              </TableCell>
              <TableCell>Título</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Estoque</TableCell>
              <TableCell>Estoque em CD</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.includes(product.id)}
                    onChange={() => handleSelect(product.id)}
                  />
                </TableCell>
                <TableCell>{product.titulo}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>
                  <span
                    style={{
                      color: product.estoque < 20 ? "red" : "green",
                    }}
                  >
                    {product.estoque}
                  </span>
                </TableCell>
                <TableCell>{product.estoqueCd}</TableCell>
                <TableCell>
                  <Tooltip title="Editar">
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton color="error">
                      <Delete />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Visualizar">
                    <IconButton color="info">
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
     
    </div>
  );
};

export default ProductsPage;
