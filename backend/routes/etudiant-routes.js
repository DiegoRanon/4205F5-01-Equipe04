const express = require("express");

const controleursEtudiant = require("../controlers/etudiant-controleurs");
const router = express.Router();

router.get("/:etudiantId/",controleursEtudiant.getEtudiantById);

router.post("/creerEtudiant",controleursEtudiant.creerEtudiant);

router.patch('/:etudiantId', controleursEtudiant.updateEtudiant);

router.delete('/:etudiantId', controleursEtudiant.supprimerEtudiant);

router.post('/connexion', controleursEtudiant.connexion);

module.exports = router;