import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHttpClient } from "../shared/hooks/http-hook";
import { useForm } from "../shared/hooks/form-hook";

function Login(props) {
    const [email, setEmail] = useState('');
    const [motdepasse, setMotDePasse] = useState('');

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
        try {
            console.log("Email:", email);
            console.log("Mot de Passe:", motdepasse);

            const reponseData = await sendRequest(
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
           
            console.log(reponseData);

            if (reponseData.success) {
                alert("Login successful!");
            } else {
                alert("Login failed. Please check your credentials.");
            }
        } catch (err) {
            console.log(err);
            alert("An error occurred while attempting to log in.");
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