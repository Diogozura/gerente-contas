export interface CustomAccordionProps {
   title: string;
    subtitle?: string;
    children: React.ReactNode;
    defaultExpanded?: boolean;
    icon:React.ReactNode; // Prop para o ícone
}