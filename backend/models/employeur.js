const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const employeurSchema = new Schema({
nom:{type: String,required: true},
prenom:{type: String,required: true},
nomEntreprise:{type: String,required: true},
adresseEntreprise:{type: String,required: true},
email:{type: String, required: true},
motdepasse:{type: String, required: true},
numTel:{type: String,required: true},
posteTel:{type: String,required: true},
listeStage:[{type: mongoose.Types.ObjectId, required: true, ref:"Stage"}]
});

module.exports = mongoose.model("Employeur", employeurSchema);