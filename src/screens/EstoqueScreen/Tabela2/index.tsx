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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";

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
                        checked={selectedIds.includes(product.id)}
                        onChange={() => onSelectOne(product.id)}
                      />
                  </TableCell>
                     <TableCell padding="checkbox">
                      <Image
                        src={'https://picsum.photos/200'}
                        width={200}
                        height={200} alt={""}                      />
                  </TableCell>
                    <TableCell>
                     <Link href={`/estoque/${product.sku}`} passHref>
                        <Typography color="primary" style={{ cursor: "pointer" }}>
                          {product.titulo}
                        </Typography>
                      </Link>
                    </TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.estoque}</TableCell>
              <TableCell>{product.estoqueCd}</TableCell>
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
