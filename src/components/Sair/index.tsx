import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { tokenService } from "../../services/auth/tokenService";

export default function Sair() {
    const router = useRouter()

    function handleClick() {
        tokenService.delete()
        router.push('/')
    }

    return (
        <Button variant="contained" color="warning" onClick={handleClick}>Sair</Button>
    )
}