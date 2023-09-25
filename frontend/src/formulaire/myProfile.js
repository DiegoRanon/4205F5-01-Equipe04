import React, { useEffect,useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHttpClient } from "../shared/hooks/http-hook";
import { useForm } from "../shared/hooks/form-hook";
import { AuthContext } from '../shared/context/auth-context';
import { useHistory } from 'react-router-dom';

function MyProfile(props) {


    const auth = useContext(AuthContext);

    

      return (
        <div className="container">
          <h2>Mon profil</h2>
         
        </div>
      );
    }
    
    export default MyProfile;
    