import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import { useRouter } from "next/router";
import react from "react";
import { BoxForm, Formulario } from "../../components/Formulario";
import { TituloFom } from "../../components/Formulario/TituloForm";
import { authService } from "../../services/auth/authService";


export default function CriarOrganization() {
    const router = useRouter()

    const [values, setValues] = react.useState({
        nome: ''
 })

   

    function handleChange(event:any){
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        
        setValues((currentValues) => {
            return {
                ...currentValues,
                [fieldName]:fieldValue
            }
        })
    }
    const [open, setOpen] = react.useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleToggle = () => {
      setOpen(!open);
    };
   
    return (
        <>
  <BoxForm>
          
        <Formulario
        onSubmit={(event) => {
                    event.preventDefault()
              alert(JSON.stringify(values, null, 2))
              authService.neworgatization({
                nome: values.nome
              })
                      .then((res) => {
console.log(res)
                        router.push("/sala")
                        })
                      .catch((erro) => {
                  
                        console.log(erro)
                      } )
                    }}
                >

                    <TituloFom>  <h2>Criar Organização</h2></TituloFom>
                    <TextField
                        id="outlined-basic"
                        label="Nome da organização"
                        name="nome"

                        value={values.nome}
                        onChange={handleChange}

                        margin="normal"
                        required 
                        variant="standard" />
                    

                    {/* <TextField
                        id="outlined-basic"
                        label="Senha"
                        type="password"
                        name="senha"
                        value={values}
                        onChange={handleChange}
                        margin="normal"
                        required
                        variant="standard" /> */}
                    
                    <Button variant="contained" onClick={handleToggle} type="submit"> Entrar</Button>
                    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
                    
        </Formulario>
    </BoxForm>
        </>
      
    )
}