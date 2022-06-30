import { blue } from "@mui/material/colors";
import LinkPage from "../../components/Link";

export default function Sala() {
    return (
        <>
             <LinkPage href={'/'} name={'home'}   color={"white"} bg={blue[400]} padding={"10px"} hoverBg={blue[300]} margin={"1em"} />
        </>
    )
}