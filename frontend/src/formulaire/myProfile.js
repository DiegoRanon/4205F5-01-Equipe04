import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHttpClient } from "../shared/hooks/http-hook";
import { useForm } from "../shared/hooks/form-hook";
import { AuthContext } from '../shared/context/auth-context';
import { useParams } from 'react-router-dom';

function MyProfile(props) {
  const auth = useContext(AuthContext);
  const { error, sendRequest, clearError } = useHttpClient();
  const [loadedEtudiant, setLoadedEtudiant] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const [formState, inputHandler, setFormData] = useForm(
    {
      nom: {
        value: '',
        isValid: false
      },
      email: {
        value: '',
        isValid: false
      },
      numTel: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchEtudiant = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/etudiant/:etudiantId`,
          "PATCH"
        );
        setLoadedEtudiant(responseData.etudiant);
        console.log(responseData.etudiant);
        setFormData(
          {
            nom: {
              value: responseData.etudiant.nom,
              isValid: true
            },
            email: {
              value: responseData.etudiant.email,
              isValid: true
            },
            numTel: {
              value: responseData.etudiant.numTel,
              isValid: true
            }
          },
          true
        );

      } catch (err) {
        console.error('Error fetching etudiant:', err);
      }
    };
    fetchEtudiant();
  }, [sendRequest, userId, setFormData]);

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, userId: userId, login: auth.login, logout: auth.logout }}>
      <div className="container">
        <h2>Mon Profile</h2>
        {loadedEtudiant && (
          <div>
            <p>Nom : {loadedEtudiant.nom}</p>
            <p>Email : {loadedEtudiant.email}</p>
            <p>Numero de telephone : {loadedEtudiant.numTel}</p>
          </div>
        )}
      </div>
    </AuthContext.Provider>
  );
}

export default MyProfile;
