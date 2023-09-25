import { Link } from 'react-router-dom';
import { useHttpClient } from "../shared/hooks/http-hook";
import { useForm } from "../shared/hooks/form-hook";
import { AuthContext } from '../shared/context/auth-context';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; // Importer useHistory


const ListeStage = () => {
  const auth = useContext(AuthContext);
  const employerId = auth.userId;
  const [stages, setStages] = useState([]);
  const history = useHistory(); 

  useEffect(() => {
    
    const fetchEmployerStages = async () => {
      try {
        const response = await fetch(`/api/employer/${employerId}/stages`);
        const data = await response.json();
        setStages(data.stages);
      } catch (error) {
        console.error('Erreur lors de la récupération des stages :', error);
      }
    };

    
    fetchEmployerStages();
  }, [employerId]);

  // Rediriger vers la page de création de stage lorsque le bouton est cliqué
  const redirectToCreateStagePage = () => {
    history.push('/creerStage'); // Remplacez '/creer-stage' par l'URL de votre page de création de stage
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
            <li key={stage.id}>{stage.nomStage}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListeStage;
