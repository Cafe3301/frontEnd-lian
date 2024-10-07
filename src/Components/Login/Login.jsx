import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import './Login.css'; 
import api from '../../services/api'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/auth/login', {
                email: username,
                password: password
            });
            const { token } = response.data;
            localStorage.setItem('token', token);
            alert("Login realizado com sucesso!");
            navigate('/home'); // Ajuste a rota conforme necessário
        } catch (error) {
            alert("Erro ao realizar login: " + (error.response?.data?.msg || error.message));
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Acesse o Sistema</h1>
                <div className='input-field'>
                    <input
                        type="email"
                        placeholder='E-mail'
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <FaUser className='icon' />
                </div>
                <div className='input-field'>
                    <input
                        type="password"
                        placeholder='Senha'
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaLock className='icon' />
                </div>
                <button>Entrar</button>
            </form>
        </div>
    );
};

export default Login;
