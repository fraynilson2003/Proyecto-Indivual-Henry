require('dotenv').config();
const { Sequelize } = require('sequelize');

const VideogameModel = require("./models/Videogame")
const GendersModel = require("./models/Geners")
const PlataformModel = require("./models/Plataform")

const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;
/******* FIN DE EXPORTACIONES********** */

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});



VideogameModel(sequelize)
GendersModel(sequelize)
PlataformModel(sequelize)

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { videogame, platform, genre } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

//VINCULAMOS VIDEOGAMES CON LAS PLATAFORMAS
videogame.belongsToMany(platform, {through: "VideogamesPlataform"})
platform.belongsToMany(videogame, {through: "VideogamesPlataform"})

//VINCULAMOS GENEROS CON VIDEOGAMES
videogame.belongsToMany(genre, {through: "VideogameGenre"})
genre.belongsToMany(videogame, {through: "VideogameGenre"})


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
