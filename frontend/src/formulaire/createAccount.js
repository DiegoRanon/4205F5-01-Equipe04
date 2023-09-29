import React, { Component, useState} from 'react';
import "./createAccount.css";
import { useHttpClient } from '../shared/hooks/http-hook';
import { useForm } from "../shared/hooks/form-hook";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


   

function CreateAccount(props) {
    const history = useHistory();
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [motdepasse, setMotDePasse] = useState('');
    const [numTel, setNumTel] = useState('');
    const [type, setType] = useState('');
    const { error, sendRequest, clearError } = useHttpClient();
    const [selectedOption, setSelectedOption] = useState('');
    const [formState, inputHandler, setFormData] = useForm(
        {
            nom:{
                value:"",
                isValid:false,
            },
            prenom:{
                value:"",
                isValid:false,
            },
            email: {
                value: "",
                isValid: false,
            },
            motdepasse: {
                value: "",
                isValid: false,
            },
            numTel: {
                value:"",
                isValid:false,
            },
            type: {
                value:"",
                isValid:false
            }
        },
        false
    );
    


    const handleSubmit = async (event) => {
        event.preventDefault();
        let reponseData = null;
        console.log(type)
        try {
           if(type == "etudiant") {
            reponseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL + "etudiant/inscription",
                "POST",
                JSON.stringify({
                    nom:nom,
                    prenom:prenom,
                    email: email,
                    motdepasse: motdepasse,
                    numTel: numTel
                }),
                {
                    "Content-Type": "application/json",
                }
            );
           } else if(type == "employeur") {

                reponseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + "employeur/inscription",
                    "POST",
                    JSON.stringify({
                        nom:nom,
                        prenom:prenom,
                        email: email,
                        motdepasse: motdepasse,
                        numTel: numTel
                    }),
                    {
                        "Content-Type": "application/json",
                    }
                );
           } 
            

            if (reponseData != null) {
                alert("Creation of account succefull!");
                setNom("");
                setPrenom("");
                setEmail("");
                setNumTel("");
                setMotDePasse("");
                history.push('/login');

            } else {
                alert("Creation of account failed. Please try again later.");
            }
        } catch (err) {
            console.log(err);
            alert("An error occurred while attempting to creating your account.");
           
        }
    };
    

    
        return (
            <div className="container">
                <h2>Creation de Compte</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="Nom">Nom</label>
                        <input type="text" id="nomComplet" name="nomComplet" value={nom} onChange={(e) =>setNom(e.target.value)} required onInput={inputHandler}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="prenom">Prenom</label>
                        <input type="text" id="prenom" name="prenom" value={prenom} onChange={(e) =>setPrenom(e.target.value)} required onInput={inputHandler}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) =>setEmail(e.target.value)} required onInput={inputHandler}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Numero de telephone</label>
                        <input type="tel" id="numeroTelephone" name="numeroTelephone" value={numTel} onChange={(e) =>setNumTel(e.target.value)} required onInput={inputHandler}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={motdepasse} onChange={(e) =>setMotDePasse(e.target.value)} required onInput={inputHandler}/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="type">Type d'utilisateur:</label>
                    <select id="type" name="type" value={type} onChange={(e) =>setType(e.target.value)} required onInput={inputHandler}>
                        <option value="etudiant">Etudiant</option>
                        <option value="employeur">Employeur</option>
                    </select>
                    </div>
                    


                    


                     
                    <div className="form-group">
                        <button type="submit">Creer un compte</button>
                    </div>
                    <Link to="/login" className="linkC"> Connexion </Link>
                    
                </form>
            </div>
        );
    
        }

export default CreateAccount;