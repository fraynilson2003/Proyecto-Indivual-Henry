const { videogame, conn } = require('../../src/db');
const { expect } = require('chai');

describe('videogame model', () => {
  beforeEach(() => conn.authenticate()
    .catch((err) => {
      console.error('No se pudo conectar a la base de datos:', err);
    }));
  describe('Validadores', () => {
    beforeEach(() => videogame.sync({ force: true }));
    describe('Nombre', () => {
      it('Debería lanzar un error si el nombre es nulo', (done) => {
        videogame.create({})
          .then(() => done(new Error('Se requiere un nombre válido')))
          .catch(() => done());
      });
      it('Debería funcionar si es un nombre válido', (done) => {
        videogame.create(	{
          newVideoGame: {
                    name: "Komi",
                    description: "El juego es un moba de 7 vs 7",
                    released: "2023-01-18",
                    rating: 4.5,
                    background_image: "https://somoskudasai.com/wp-content/uploads/2022/10/portada_komi-san-76.jpg"
                    },
          idGener: [3],
          idPlatform: [4]
      
        })
        .then(() => done(new Error('Se creo correctamente')))
        .catch(() => done());
      });
    });
  });
});