import React, { ChangeEvent } from "react";
import { useRouter } from "next/router";
import CustomInput from "../../../../components/forms/Inputs/CustomInput";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import {
  validateEmail,
  validatePassword,
} from "../../../../utils/validators";
import { useFormContext } from "../../../../config/FormContext";
import { authService } from "../../../../services/auth/authService";
import { PromiseNotification } from "../../../../components/common/PromiseNotification";
import { Typography } from "@mui/material";
import Link from "next/link";

export default function LoginForm() {
  const { formValues, setFormValues } = useFormContext();
  const formName = "register";
  const router = useRouter();

  const [formErrors, setFormErrors] = React.useState({
    email: "",
    password: "",
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
      password: validatePassword,
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
      const registerPromise = authService.login({
        body: {
          username: formValues[formName].email,
          password: formValues[formName].password,
        },
      });

   
      PromiseNotification({
        promise: registerPromise,
        pendingMessage: "Registering...",
        successMessage: "Registration successful! Redirecting...",
        errorMessage: "An error occurred. Please try again.",
        successCallback: () => {
          return setTimeout(() => {
            router.push("/dashboard");
          }, 300);
        },
      });
    }
  };

  const isFormValid = () => {
    const commonFields = [
      formValues[formName]?.email,

      formValues[formName]?.password,
  
    ];
  
    return [...commonFields].every(Boolean);
  };

  return (
    <>
    
        <FormGroup onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            bgcolor={'background.paper'}
            borderRadius={1}
            textAlign={"center"}
          >
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
                label="Senha"
                type="password"
                value={formValues[formName]?.password || ""}
                onChange={handleChange("password")}
                helperText={formErrors.password}
                error={!!formErrors.password}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isFormValid()}
              >
                Entrar
              </Button>
            </Grid>
          </Grid>
        </FormGroup>
  
    </>
  );
}
