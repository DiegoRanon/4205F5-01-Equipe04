import React, { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHttpClient } from "../shared/hooks/http-hook";
import { useForm } from "../shared/hooks/form-hook";
import { AuthContext } from '../shared/context/auth-context';
import { useHistory } from 'react-router-dom';

function Login(props) {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [motdepasse, setMotDePasse] = useState('');
    const [type, setType] = useState('');

    const { error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: "",
                isValid: false,
            },
            motdepasse: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const handleSubmit = async (event) => {
        event.preventDefault();
        let reponseData = null;
        try {
            if(type=="etudiant") {
            reponseData = await sendRequest(
                "http://localhost:5000/etudiant/connexion",
                "POST",
                JSON.stringify({
                    email: email,
                    motdepasse: motdepasse,
                }),
                {
                    "Content-Type": "application/json",
                }
            );
            console.log(reponseData.etudiant.email);
            auth.login(reponseData.etudiant.id);
            history.push('/home');
            } else if(type=="employeur") {
                reponseData = await sendRequest(
                    "http://localhost:5000/employeur/connexion",
                    "POST",
                    JSON.stringify({
                        email: email,
                        motdepasse: motdepasse,
                    }),
                    {
                        "Content-Type": "application/json",
                    }
                );
                auth.login(reponseData.employeur.id);
                history.push('/home');
            }
           
            console.log(reponseData);
            auth.login(reponseData);

            if (!reponseData.success) {
                setEmail("");
                setMotDePasse("");
                alert("Login successful!");
                
            } else {
                alert("Login failed. Please check your credentials.");
            }
        } catch (err) {
            console.log(err);
            alert("An error noccurred while attempting to log in.");
        }
    };

    return (
        <div className="container">
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        onInput={inputHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="motDePasse">Mot de Passe</label>
                    <input
                        type="password"
                        id="motdepasse"
                        name="motdepasse"
                        value={motdepasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                        required
                        onInput={inputHandler}
                    />
                </div>
                <label htmlFor="userType">Select User Type:</label>
                    <select
                        id="userType"
                        name="userType"
                        value={type}
                        onChange={(e) =>setType(e.target.value)}
                    >
                        <option value="">Select an option</option>
                        <option value="etudiant">Etudiant</option>
                        <option value="employeur">Employeur</option>
                    </select>
                <div className="form-group">
                    <button type="submit">Connexion</button>
                </div>
                <Link to="/createAccount" className="linkC">
                    Créer un compte
                </Link>
            </form>
        </div>
    );
}

export default Login;