import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';


function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function Bread({nav}) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link  href={`/${nav.principal}`}>
        {nav.principal}
        </Link>
        <Typography sx={{ color: 'text.primary' }}>{nav.atual}</Typography>
      </Breadcrumbs>
    </div>
  );
}
