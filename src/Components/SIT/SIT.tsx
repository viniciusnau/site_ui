import style from "./SIT.module.css";
import Button from "../Forms/Button";
import { isLoggedIn } from "../../Auth/Auth";

const SIT: React.FC = () =>{
    const handleButton = () =>{
        window.open('http://sit.defensoria.sc.def.br/front/helpdesk.public.php?create_ticket=1', '_blank');
    }

    return(<> 
       {isLoggedIn() && <Button onClick={handleButton} className={style.button}><b>SIT</b></Button>}
    </>)
}

export default SIT;