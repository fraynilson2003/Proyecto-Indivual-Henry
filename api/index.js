const server = require('./src/app.js');
const { conn } = require('./src/db');

const PORT = 3002

// server.listen(PORT, () => {
//   console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
// });


//force:true - elimina todas la bases de datos, y las vuelve a crear en base a los modelos
//alter:true - actualiza las tablas de BASE DE DATOS en base a los modelos

//Syncing all the models at once.


//{ force: true }


//conn.sync({ force: true }).then(() => {
conn.sync().then(() => {
  server.listen(PORT, () => {
    //conn.drop();    //ESTO ES PARA ELIMINAR TODAS LAS TABLAS
    console.log("************* BIEN ****************");
    console.log(`UUU listening at ${PORT}`); // eslint-disable-line no-console
  })
}).catch((err)=>console.log("*********************  ERROR ****************************"))
