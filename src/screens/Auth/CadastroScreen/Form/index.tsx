import React, { ChangeEvent } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  validateCNPJ,
  validateConfirmPassword,
  validateCPF,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from "../../../../utils/validators";
import { useFormContext } from "../../../../config/FormContext";
import { authService } from "../../../../services/auth/authService";
import { PromiseNotification } from "../../../../components/common/PromiseNotification";
import { Typography } from "@mui/material";
function limparNumeros(valor: string): string {
  return valor.replace(/\D/g, "");
}
export default function RegisterForm() {
  const { formValues, setFormValues } = useFormContext();
  const formName = "register";
  const router = useRouter();
  const { id } = router.query;
  const [formErrors, setFormErrors] = React.useState({
    email: "",
    tel: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    cpf: "",
    cnpj: "",
    razao_social: "",
  });

  const [isCPF, setIsCPF] = React.useState(true);

  const handleChange =
    (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setFormValues(formName, { [field]: value });

      // Clear the error for the current field
      setFormErrors({
        ...formErrors,
        [field]: "",
      });
    };

  const handleSwitchChange = () => {
    setIsCPF(!isCPF);
    // Clear CNPJ and Razao Social fields when switching to CPF
    if (!isCPF) {
      setFormValues(formName, { cnpj: "", razao_social: "" });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const errors: any = {};

    const validateFn = {
      email: validateEmail,
      firstname: validateName,
      lastname: validateName,
      cpf: validateCPF,
      cnpj: validateCNPJ,
      password: validatePassword,
      confirmPassword: (value: string) =>
        validateConfirmPassword(formValues[formName]?.password || "", value),
      razao_social: validateName,
      // tel :validatePhone,
    };

    Object.keys(formValues[formName] || {}).forEach((field) => {
      if (validateFn[field as keyof typeof formValues]) {
        const error = validateFn[field as keyof typeof formValues](
          formValues[formName][field as keyof typeof formValues]
        );
        if (error) {
          errors[field] = error;
        }
      }
    });

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const registerPromise = authService.cadastro({
        body: {
          email: formValues[formName].email,
          firstname: formValues[formName].firstname,
          lastname: formValues[formName].lastname,
          password: formValues[formName].password,
          cpf: parseInt(limparNumeros(formValues[formName].cpf), 10),
          cnpj: parseInt(limparNumeros(formValues[formName].cnpj), 10),
          razao_social: formValues[formName].razao_social,
        },
        id
      });


      PromiseNotification({
        promise: registerPromise,
        pendingMessage: "Registering...",
        successMessage: "Registration successful! Redirecting...",
        errorMessage: "An error occurred. Please try again.",
        successCallback: () => {
          return setTimeout(() => {
            router.push("/auth/login");
          }, 300);
        },
      });
    }
  };

  const isFormValid = () => {
    const commonFields = [
      formValues[formName]?.email,
      formValues[formName]?.firstname,
      formValues[formName]?.lastname,
      formValues[formName]?.password,
      formValues[formName]?.confirmPassword,
    ];
    const specificFields = isCPF
      ? [formValues[formName]?.cpf]
      : [formValues[formName]?.cnpj, formValues[formName]?.razao_social];

    return [...commonFields, ...specificFields].every(Boolean);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Grid
            container
            xs={12}
            spacing={2}
            bgcolor={'background.paper'}
            padding={2}
            borderRadius={2}
            textAlign={"center"}
          >
            <Grid item xs={12}>
              <CustomInput
                label="Nome"
                type="text"
                value={formValues[formName]?.firstname || ""}
                onChange={handleChange("firstname")}
                helperText={formErrors.firstname}
                error={!!formErrors.firstname}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                label="Sobrenome"
                type="text"
                value={formValues[formName]?.lastname || ""}
                onChange={handleChange("lastname")}
                helperText={formErrors.lastname}
                error={!!formErrors.lastname}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                label="Email"
                type="email"
                value={formValues[formName]?.email || ""}
                onChange={handleChange("email")}
                helperText={formErrors.email}
                error={!!formErrors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                label="Telefone"
                type="tel"
                value={formValues[formName]?.tel || ""}
                onChange={handleChange("tel")}
                helperText={formErrors.tel}
                error={!!formErrors.tel}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomInput
                label="CPF"
                type="cpf"
                value={formValues[formName]?.cpf || ""}
                onChange={handleChange("cpf")}
                helperText={formErrors.cpf}
                error={!!formErrors.cpf}
              />
            </Grid>

{/*          
              <Grid item xs={12}>
                <CustomInput
                  label="CNPJ"
                  type="cnpj"
                  value={formValues[formName]?.cnpj || ""}
                  onChange={handleChange("cnpj")}
                  helperText={formErrors.cnpj}
                  error={!!formErrors.cnpj}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomInput
                  label="Razão Social"
                  type="text"
                  value={formValues[formName]?.razao_social || ""}
                  onChange={handleChange("razao_social")}
                  helperText={formErrors.razao_social}
                  error={!!formErrors.razao_social}
                />
              </Grid> */}
         

            <Grid item xs={12}>
              <CustomInput
                label="Senha"
                type="password"
                value={formValues[formName]?.password || ""}
                onChange={handleChange("password")}
                helperText={formErrors.password}
                error={!!formErrors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                label="Repita a Senha"
                type="password"
                value={formValues[formName]?.confirmPassword || ""}
                onChange={handleChange("confirmPassword")}
                helperText={formErrors.confirmPassword}
                error={!!formErrors.confirmPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isFormValid()}
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={12} >
              <Typography variant="body1" textAlign={"center"} p={2} component={"p"}>
                Garantimos a privacidade dos seus dados com criptografia.
              </Typography>
            </Grid>
          </Grid>
        </FormGroup>
      </form>
    </>
  );
}
