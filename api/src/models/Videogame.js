const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull:false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    released: {
      type: DataTypes.DATEONLY,
      defaultValue: sequelize.fn('NOW'),
      allowNull: false
    },
    background_image: {
      type: DataTypes.TEXT,
      defaultValue: "NOT",

      allowNull: false
    },
  

    
  },{timestamps: false });
};
