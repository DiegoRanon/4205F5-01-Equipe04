import React, { Component } from 'react';
import "./createAccount.css";
import { Link } from 'react-router-dom';

class createAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nomComplet: '',
            email: '',
            numeroTelephone: '',
            password: '',
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
    }

    render() {
        return (
            <div className="container">
                <h2>Creation de Compte</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fullName">Nom Complet</label>
                        <input type="text" id="nomComplet" name="nomComplet" value={this.state.nomComplet} onChange={this.handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Numero de telephone</label>
                        <input type="tel" id="numeroTelephone" name="numeroTelephone" value={this.state.numeroTelephone} onChange={this.handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <button type="submit">Creer un compte</button>
                    </div>
                    <Link to="/login" className="linkC"> Connexion </Link>
                    
                </form>
            </div>
        );
    }
}

export default createAccount;
