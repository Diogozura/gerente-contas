import { Box, Grid, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useRouter } from "next/router";
import { useFormContext } from "@/config/FormContext";

export default function Footer() {
  const { formValues ,setFormValues } = useFormContext();
  const router = useRouter();

  const handleStartTour = () => {
    const currentPath = router.pathname.replace(/^\//, ""); // Remove a barra inicial
    setFormValues("Tuor", { ...formValues, [currentPath || "home"]: true }); 
    // Se for '/', salva como 'home' (ou outro nome de sua escolha)
  };

  return (
    <>
      <Grid
        container
        component={"footer"}
        sx={{
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Typography>Hubeefive © Todos os direitos reservados 2024</Typography>
        <Typography>
          <Link href={"/politicas-seguranca-privacidade"}>
            Políticas de Segurança e Privacidade
          </Link>
        </Typography>
        <Box
          position="fixed"
          bottom={16}
          right={16}
          sx={{
            width: 48,
            height: 48,
            backgroundColor: "#6A1B9A",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: 3,
          }}
        >
          <IconButton
            aria-label="start-tour"
            color="primary"
            size="small"
            onClick={handleStartTour}
          >
            <QuestionMarkIcon
              fontSize="inherit"
              sx={{
                color: "#FFFF",
              }}
            />
          </IconButton>
        </Box>
      </Grid>
    </>
  );
}
