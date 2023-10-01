const { response } = require("express");
const { default: mongoose, mongo } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const HttpErreur = require("../models/http-erreur");


const Employeur = require("../models/employeur");


const getEmployeurById = async (requete, reponse, next) => {
  const employeurId = requete.params.employeurId;
  let employeur;
  try {
    employeur = await employeur.findById(employeurId);
  } catch (err) {
    return next(
      new HttpErreur("Erreur lors de la récupération de l'employeur(e)", 500)
    );
  }
  if (!employeur) {
    return next(new HttpErreur("Aucun(e) employeur(e) trouvée pour l'id fourni", 404));
  }
  reponse.json({ employeur: employeur.toObject({ getters: true }) });
};

const creerEmployeur = async (requete, reponse, next) => {
    const { nom,nomEntreprise,adresseEntreprise, email, motdepasse, numTel,posteTel, userType } = requete.body;

  

  try {
    employeurExiste = await Employeur.findOne({ email: email });
  } catch {
    return next(new HttpErreur("Échec vérification employeur existe", 500));
  }

  if (employeurExiste) {
    return next(
      new HttpErreur("employeur existe déjà, veuillez vos connecter", 422)
    );
  }

  const nouveauEmployeur = new Employeur({
    nom,
    nomEntreprise,
    adresseEntreprise,
    email,
    motdepasse,
    numTel,
    posteTel,
    userType
});
  try {
    await nouveauEmployeur.save();
  } catch (err) {
    console.log(err);
    return next(new HttpErreur("Erreur lors de l'ajout de l'employeur", 422));
  }
  reponse
    .status(201)
    .json({ employeur: nouveauEmployeur.toObject({ getter: true }) });
  };


const updateEmployeur = async (requete, reponse, next) => {
  const { email, motdepasse, numTel,stagesCreer } = requete.body;
  const employeurId = requete.params.employeurId;

  let employeur;

  try {
    employeur = await employeur.findById(employeurId);
    employeur.email = email;
    employeur.motdepasse = motdepasse;
    employeur.numTel = numTel;
    await employeur.save();
  } catch {
    return next(
      new HttpErreur("Erreur lors de la mise à jour de la employeur", 500)
    );
  }

  reponse.status(200).json({ employeur: employeur.toObject({ getters: true }) });
};

const supprimerEmployeur = async (requete, reponse, next) => {
    const employeurId = requete.params.employeurId;
    let employeur;
    try {
      employeur = await employeur.findById(employeurId);
    } catch {
      return next(
        new HttpErreur("Erreur lors de la suppression de la employeur", 500)
      );
    }
    if(!employeur){
      return next(new HttpErreur("Impossible de trouver l'employeur", 404));
    }
  
    try{
      await employeur.remove();
    }catch{
      return next(
        new HttpErreur("Erreur lors de la suppression de la employeur", 500)
      );
    }
    reponse.status(200).json({ message: "employeur supprimée" });
  };




  const connexion = async (requete, reponse, next) => {
    const { email, motdepasse } = requete.body;
  
    let employeurExiste;
  
    try {
      employeurExiste = await Employeur.findOne({ email: email });
    } catch {
      return next(
        new HttpErreur("Connexion échouée, veuillez réessayer plus tard", 500)
      );
    }
  
   
    if (employeurExiste != null) {

    reponse.json({
      "success": true,
      message: "connexion réussie!",
      employeur: employeurExiste.toObject({ getters: true }),
    });
  } else {
    reponse.json({
      "success": false,
      message: "connexion réussie!"
     
    });
  }
  };

  


exports.getEmployeurById = getEmployeurById;
exports.creerEmployeur = creerEmployeur;
exports.updateEmployeur = updateEmployeur;
exports.supprimerEmployeur = supprimerEmployeur;
exports.connexion = connexion;



