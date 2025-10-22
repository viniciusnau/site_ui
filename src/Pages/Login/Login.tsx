import React, { useEffect, useState, useRef } from "react";
import Input from '../../Components/Forms/Input'
import Button from '../../Components/Forms/Button'
import { useNavigate, Link } from 'react-router-dom';
import img from '../../Assets/Defensoria_logo.png';
import styles from './Login.module.css';
import Snackbar from '../../Components/Snackbar/Snackbar';
import icon from '../../Assets/google-icon.png';
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "../../Services/Slices/meSlice";
import { isLoggedIn } from "../../Auth/Auth";
import Loading from "../../Components/Loading/Loading";
import { Eye, EyeOff } from 'lucide-react'; 

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    
    const dispatch = useDispatch();

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const { data, error, loading } = useSelector((state: any) => state.meSlice);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        const { name, value } = e.target;
        setForm((prev: any) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, fieldName: string) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            
            if (fieldName === 'username') {
                passwordRef.current?.focus();
            } else if (fieldName === 'password') {
                handleSubmit();
            }
        }
    };

const handleSubmit = async () => {
    if (!form.username.trim() || !form.password.trim()) {
        setShowSnackbar(true);
        return;
    }
    setIsLoading(true);
    
    try {
        await dispatch<any>(fetchMe(form));
        isLoggedIn(true);
        navigate("/admin");
        
    } catch (error) {
        console.error("Erro no login:", error);
        setShowSnackbar(true);
    } finally {
        setIsLoading(false);
    }
};

    useEffect(() => {
        if (error && !loading) {
            setIsLoading(false);
            setShowSnackbar(true);
        }
    }, [error, loading]);

    useEffect(() => {
        if (showSnackbar) {
            const timer = setTimeout(() => {
                setShowSnackbar(false);
            }, 5000);
            
            return () => clearTimeout(timer);
        }
    }, [showSnackbar]);

    if (isLoading || loading){
        return (
            <div
                style={{
                    display: "flex",
                    height: "50vw",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Loading type="spin"  size={100}/>
            </div>
        );
    }

  return (<>
        {showSnackbar && <Snackbar type='loginError'/>}
      <div className={styles.container}>
        <div className={styles.containerForms}>
            <img src={img} className={styles.img} alt="Logo Defensoria"></img>
            <div className={styles.forms}>
                <Input
                    ref={usernameRef} 
                    name="username"
                    max={50}
                    className={styles.input}
                    placeholder='Usuário'
                    value={form.username}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, 'username')}
                    />
                <div className={styles.passwordContainer}>
                    <Input
                        ref={passwordRef}
                        name="password"
                        max={50}
                        type={showPassword ? "text" : "password"}
                        className={styles.input}
                        placeholder='Senha'
                        value={form.password}
                        onChange={handleChange}
                        onKeyDown={(e) => handleKeyDown(e, 'password')}
                        autoComplete="off"
                        />
                    <button
                        type="button"
                        className={styles.passwordToggle}
                        onClick={toggleShowPassword}
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        >
                        {showPassword ? (
                            <EyeOff size={20} className={styles.eyeIcon} />
                        ) : (
                            <Eye size={20} className={styles.eyeIcon} />
                        )}
                    </button>
                </div>
                <Link to="/alterar-senha/" className={styles.forgotPassword}>
                Esqueceu a senha?
                </Link>
                <Button className={styles.button} onClick={handleSubmit}>
                    Entrar
                </Button>
                <div className={styles.line}></div>
                <form
                    action=""
                    method="get"
                    className={styles.form}
                >
                  <Button className={styles.google}>
                    <img
                        width="30rem"
                        style={{ marginRight: '.5rem', padding: '.25rem' }}
                        alt="Ícone do Google"
                        src={icon}
                        className={styles.icon}
                    />
                    <p className={styles.login}>Entrar com Google</p>
                  </Button>
                </form>
            </div>
        </div>
    </div>
    </>
  );
}

export default Login;