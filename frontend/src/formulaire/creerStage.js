import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHttpClient } from "../shared/hooks/http-hook";
import { useForm } from "../shared/hooks/form-hook";
import "./creerStage.css";



function CreerStage() {
  const [nom, setNom] = useState('');
  const [courriel, setCourriel] = useState('');
  const [numeroTel, setNumeroTel] = useState('');
  const [nomEntreprise, setNomEntreprise] = useState('');
  const [adresseEntreprise, setAdresseEntreprise] = useState('');
  const [typeStage, setTypeStage] = useState('');
  const [descriptionStage, setDescriptionStage] = useState('');
  const [remuneration, setRemuneration] = useState('');
  const { error, sendRequest, clearError } = useHttpClient();
  const [selectedOption, setSelectedOption] = useState('');
  const [formState, inputHandler, setFormData] = useForm(
    {
        nom: {
            value: "",
            isValid: false,
        },
        courriel: {
            value: "",
            isValid: false,
        },
        numeroTel: {
            value: "",
            isValid: false,
        },
        nomEntreprise: {
            value: "",
            isValid: false,
        },
        adresseEntreprise: {
            value: "",
            isValid: false,
        },
        typeStage: {
            value: "",
            isValid: false
        },
        descriptionStage: {
            value: "",
            isValid: false
        },
        remuneration: {
            value: "",
            isValid: false
        }
    },
    false
  );


  const handleSubmit = async (event) => {
    event.preventDefault();
    let reponseData = null;
    try {
        reponseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "employeur/creerStage",
            "POST",
            JSON.stringify({
                nom:nom,
                courriel:courriel,
                numeroTel:numeroTel,
                nomEntreprise:nomEntreprise,
                adresseEntreprise:adresseEntreprise,
                typeStage:typeStage,
                descriptionStage:descriptionStage,
                remuneration:remuneration,
      }),
      {
        "Content-Type": "application/json",
      }
        );

      if(reponseData != null){
        setNom('');
        setCourriel('');
        setNumeroTel('');
        setNomEntreprise('');
        setAdresseEntreprise('');
        setTypeStage('');
        setDescriptionStage('');
        setRemuneration('');

      alert('Le stage a été créé avec succès !');

    } else{
        alert("Creation de stage pas reussi. Veuiller reessayer.")
    }} catch (error) {
      console.error(error);
      alert('Une erreur s\'est produite lors de la création du stage.');
    }
  };
  

  return (
    <div className="container">
    <h2>Create a Stage</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nom">Nom</label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={nom}
          onChange={(e) =>setNom(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="courriel">Courriel</label>
        <input
          type="email"
          id="courriel"
          name="courriel"
          value={courriel}
          onChange={(e) =>setCourriel(e.target.courriel)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="numeroTel">Numero de téléphone</label>
        <input
          type="tel"
          id="numeroTel"
          name="numeroTel"
          value={numeroTel}
          onChange={(e) =>setNumeroTel(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="nomEntreprise">Nom de l'entreprise</label>
        <input
          type="text"
          id="nomEntreprise"
          name="nomEntreprise"
          value={nomEntreprise}
          onChange={(e) =>setNomEntreprise(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="adresseEntreprise">Adresse de l'entreprise</label>
        <input
          type="text"
          id="adresseEntreprise"
          name="adresseEntreprise"
          value={adresseEntreprise}
          onChange={(e) =>setAdresseEntreprise(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="typeStage">Type de stage</label>
        <input
          type="text"
          id="typeStage"
          name="typeStage"
          value={typeStage}
          onChange={(e) =>setTypeStage(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="descriptionStage">Description du stage</label>
        <textarea
          id="descriptionStage"
          name="descriptionStage"
          value={descriptionStage}
          onChange={(e) =>setDescriptionStage(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="remuneration">Rémunération</label>
        <input
          type="text"
          id="remuneration"
          name="remuneration"
          value={remuneration}
          onChange={(e) =>setRemuneration(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <button type="submit">Create Stage</button>
      </div>
    </form>
  </div>
  
  ); 
};

export default CreerStage;

