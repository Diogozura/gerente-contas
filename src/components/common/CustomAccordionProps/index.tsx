import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CustomAccordionProps } from "@/types/CustomAccordionProps";



function CustomAccordion({ title, subtitle, children, icon, defaultExpanded }: CustomAccordionProps) {
  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${title}-content`}
        id={`${title}-header`}
      >
        <Box>
        <Box display="flex" alignItems="center" gap={1}>
          {icon && <Box display="flex" alignItems="center">{icon}</Box>} {/* Renderizar o ícone, se fornecido */}
          <Typography variant="h5" component="h3" fontWeight={500}>
            {title}
          </Typography>
        </Box>
          {subtitle && (
            <Typography variant="body1" component="p">
              {subtitle}
            </Typography>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
