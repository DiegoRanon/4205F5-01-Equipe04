import { Link } from 'react-router-dom';
import { useHttpClient } from "../shared/hooks/http-hook";
import { useForm } from "../shared/hooks/form-hook";
import { AuthContext } from '../shared/context/auth-context';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; 
//import './liste.css';


const ListeStage = () => {
  const auth = useContext(AuthContext);
  const employerId = auth.userId;
  const typeUser = auth.typeUser;
  const [stages, setStages] = useState([]);
  const history = useHistory(); 

  useEffect(() => {
    
    const fetchEmployerStages = async () => {
      try {
        let response;
        if(typeUser === 'employeur'){
        const response = await fetch(`/employeur/${employerId}/stages`);
        }
        else if(typeUser === 'etudiant'){
          const response = await fetch(`/stages/stageId`);
        }
        const data = await response.json();
        setStages(data.stages);
      } catch (error) {
        console.error('Erreur lors de la récupération des stages :', error);
      }
    };

    
    fetchEmployerStages();
  }, [employerId,typeUser]);

 
  const redirectToCreateStagePage = () => {
    history.push('/creerStage'); 
  };

  return (
    <div>
      <h1>Liste des stages disponibles</h1>
      {stages.length === 0 ? (
        <div>
          <p>Aucun stage disponible.</p>
          <button onClick={redirectToCreateStagePage}>Créer un stage</button>
        </div>
      ) : (
        <ul>
          {stages.map((stage) => (
            <li key={stage.id}>{stage.nomStage}
            <h2>{stage.nomStage}</h2>
              <p>Nom de l'entreprise : {stage.nomEntreprise}</p>
              <p>Type de stage : {stage.typeStage}</p>
              <p>Rémunération : {stage.remuneration}</p></li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListeStage;
