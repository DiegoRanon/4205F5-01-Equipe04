const express = require("express");

const controleurEmployeur = require("../controlers/employeur-controleur");
const router = express.Router();

router.get("/:employeurId/",controleurEmployeur);

router.post("/creerEmployeur",controleurEmployeur);

router.patch('/:employeurId', controleurEmployeur);

router.delete('/:employeurId', controleurEmployeur.supprimeremployeur);

router.post('/connexion', controleurEmployeur.connexion);

module.exports = router;