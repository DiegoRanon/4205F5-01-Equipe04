const { response } = require("express");
const { default: mongoose, mongo } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const HttpErreur = require("../models/http-erreur");

const Etudiant = require("../models/etudiant");


const getEtudiantById = async (requete, reponse, next) => {
  const etudiantId = requete.params.etudiantId;
  let etudiant;
  try {
    etudiant = await Etudiant.findById(etudiantId);
  } catch (err) {
    return next(
      new HttpErreur("Erreur lors de la récupération de l'étudiant(e)", 500)
    );
  }
  if (!etudiant) {
    return next(new HttpErreur("Aucun(e) etudiant(e) trouvée pour l'id fourni", 404));
  }
  reponse.json({ etudiant: etudiant.toObject({ getters: true }) });
};



const updateEtudiant = async (requete, reponse, next) => {
  const { email, motdepasse, numTel } = requete.body;
  const etudiantId = requete.params.etudiantId;

  let etudiant;

  try {
    etudiant = await Etudiant.findById(etudiantId);
    etudiant.email = email;
    etudiant.motdepasse = motdepasse;
    etudiant.numTel = numTel;
    await etudiant.save();
  } catch {
    return next(
      new HttpErreur("Erreur lors de la mise à jour de la etudiant", 500)
    );
  }

  reponse.status(200).json({ etudiant: etudiant.toObject({ getters: true }) });
};

const supprimerEtudiant = async (requete, reponse, next) => {
    const etudiantId = requete.params.etudiantId;
    let etudiant;
    try {
      etudiant = await Etudiant.findById(etudiantId);
    } catch {
      return next(
        new HttpErreur("Erreur lors de la suppression de la etudiant", 500)
      );
    }
    if(!etudiant){
      return next(new HttpErreur("Impossible de trouver l'etudiant", 404));
    }
  
    try{
      await etudiant.remove();
    }catch{
      return next(
        new HttpErreur("Erreur lors de la suppression de la etudiant", 500)
      );
    }
    reponse.status(200).json({ message: "etudiant supprimée" });
  };

const inscription = async (requete, reponse, next) => {
  const { nom, prenom, email, motdepasse, numTel } = requete.body;

  let etudiant;

  try {
    etudiantExiste = await Etudiant.findOne({ email: email });
  } catch {
    return next(new HttpErreur("Échec vérification Etudiant existe", 500));
  }

  if (etudiantExiste) {
    return next(
      new HttpErreur("Etudiant existe déjà, veuillez vos connecter", 422)
    );
  }

  let nouveauEtudiant = new Etudiant({
    nom,
    prenom,
    email,
    numTel,
    motdepasse
  });
  try {
    await nouveauEtudiant.save();
  } catch (err) {
    console.log(err);
    return next(new HttpErreur("Erreur lors de l'ajout de l'Etudiant", 422));
  }
  reponse
    .status(201)
    .json({ etudiant: nouveauEtudiant.toObject({ getter: true }) });
};


  const connexion = async (requete, reponse, next) => {
    const { email, motdepasse } = requete.body;
  
    let etudiantExiste;
  
    try {
      etudiantExiste = await Etudiant.findOne({ email: email });
    } catch {
      return next(
        new HttpErreur("Connexion échouée, veuillez réessayer plus tard", 500)
      );
    }
  
    if (!etudiantExiste || etudiantExiste.motdepasse !== motdepasse) {
      return next(new HttpErreur("Courriel ou mot de passe incorrect", 401));
    }
  
    reponse.json({
      message: "connexion réussie!",
      etudiant: etudiantExiste.toObject({ getters: true }),
    });
  };



exports.getEtudiantById = getEtudiantById;
exports.updateEtudiant = updateEtudiant;
exports.supprimerEtudiant = supprimerEtudiant;
exports.connexion = connexion;
exports.inscription = inscription;

