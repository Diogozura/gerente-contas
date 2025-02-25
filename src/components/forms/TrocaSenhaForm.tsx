import { useFormContext } from "@/config/FormContext";
import { Grid, TextField } from "@mui/material";

export default function TrocaSenhaForm() {
    const { formValues, setFormValues } = useFormContext();


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues('trocaSenha', { [name]: value }); // Atualiza valores dinamicamente
    };
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} display={'grid'} alignItems={'center'}>
                    <TextField
                        label="Email "
                        name="email"
                        fullWidth
                        value={formValues.trocaSenha?.email || ''}
                        required
                        onChange={handleInputChange}
                    />
                </Grid>
            </Grid>
        </>
    )
}