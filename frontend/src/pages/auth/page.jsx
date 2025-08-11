import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import styles from './page.module.css';
import authServices from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";

export default function Auth() {
    const [formType, setFormType] = useState('login');
    const [formData, setFormData] = useState(null);
    const { login, signup, authLoading } = authServices();
    const navigate = useNavigate();

    // Lógica de proteção de rota
    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem('auth'));
        if (authData) {
          return navigate('/profile');
       }
    }, [navigate]); 

    const handleChangeFormType = () => {
        setFormData(null);
        setFormType(formType === 'login' ? 'signup' : 'login');
    };

    const handleFormDataChange = (e) => {
        setFormData({
             ...formData,
             [e.target.name]: e.target.value
       });

     // MODIFICAÇÃO: Esta linha foi adicionada para mostrar o valor no console
        console.log(`Campo: ${e.target.name}, Valor: ${e.target.value}`);
     };

   const handleSubmitForm = (e) => {
        e.preventDefault();

        switch (formType) {
        case 'login':
                login(formData);
                break;
            case 'signup':
                if (formData.password !== formData.confirmPassword) {
                     console.log('Passwords do not match');
                     return;
                }
                signup(formData);
                break;
            default:
                break;
        }
    };

    if (authLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className={styles.authPageContainer}>
             {formType === 'login' ? (
              <>
                    <h1>Login</h1>
                    <button type="button" onClick={handleChangeFormType}>
                     Don't you have an account? Click here
                     </button>
                     <form onSubmit={handleSubmitForm}>
                      <TextField required label="Email" type="email" name="email" onChange={handleFormDataChange} />
                      <TextField required label="Password" type="password" name="password" onChange={handleFormDataChange} />
                      <button type="submit">Login<LuLogIn /></button>
                    </form>
                </>
            ) : (
               <>
                    <h1>Signup</h1>
                    <button type="button" onClick={handleChangeFormType}>
                       Already have an account? Click here
                    </button>
                    <form onSubmit={handleSubmitForm}>
                      <TextField required label="Fullname" name="fullname" onChange={handleFormDataChange} />
                        <TextField required label="Email" type="email" name="email" onChange={handleFormDataChange} />
                        <TextField required label="Password" type="password" name="password" onChange={handleFormDataChange} />
                        <TextField required label="Confirm password" type="password" name="confirmPassword" onChange={handleFormDataChange} />
                        <button type="submit">Signup<LuLogIn /></button>
                    </form>
                 </>
            )}
        </div>
    );
}