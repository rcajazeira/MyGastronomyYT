import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import styles from './page.module.css';
import useAuthServices from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function Auth() {
    const [formType, setFormType] = useState('login');
    const [formData, setFormData] = useState(null);
    const navigate = useNavigate();
    const { login, signup, authLoading } = useAuthServices();

    // This part is for redirection and is not causing the current button issue.
    // It's correct to leave it navigating to '/profile'.
    useEffect(() => {
        const authData = localStorage.getItem('auth');
        if (authData) {
            navigate('/profile');
        }
    }, [navigate]);

    // PONTO 1: A FUNÇÃO QUE TROCA O FORMULÁRIO
    // Certifique-se de que sua função está exatamente assim.
    const handleChangeFormType = () => {
        console.log("Switching form..."); // Adicionei este log para teste
        setFormData(null);
        setFormType(formType === 'login' ? 'signup' : 'login');
    };

    const handleFormDataChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (formType === 'login') {
            login(formData);
        } else {
            if (formData.password !== formData.confirmPassword) {
                return console.error("Passwords do not match");
            }
            signup(formData);
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
                    {/* PONTO 2: O BOTÃO
                        O onClick deve chamar a função handleChangeFormType. */}
                    <button type="button" onClick={handleChangeFormType}>
                        Don't you have an account? Click here
                    </button>
                    <form onSubmit={handleSubmitForm}>
                        <TextField required label="Email" type="email" name="email" onChange={handleFormDataChange} />
                        <TextField required label="Password" type="password" name="password" onChange={handleFormDataChange} />
                        <button type="submit">Login</button>
                    </form>
                </>
            ) : (
                <>
                    <h1>Signup</h1>
                    {/* O mesmo se aplica a este botão */}
                    <button type="button" onClick={handleChangeFormType}>
                        Already have an account? Click here
                    </button>
                    <form onSubmit={handleSubmitForm}>
                        <TextField required label="Fullname" name="fullname" onChange={handleFormDataChange} />
                        <TextField required label="Email" type="email" name="email" onChange={handleFormDataChange} />
                        <TextField required label="Password" type="password" name="password" onChange={handleFormDataChange} />
                        <TextField required label="Confirm password" type="password" name="confirmPassword" onChange={handleFormDataChange} />
                        <button type="submit">Signup</button>
                    </form>
                </>
            )}
        </div>
    );
}