let get = ()=>{}
let post = ()=>{}

/********* GET ************* */

//traer todos los videoGames

let urlAll = get("http://localhost:3002/videogames")

// traer todos los generos
let urlAllGner = get("http://localhost:3002/genres")

//traer todas la plataformas
let urlAllPlatf = get("http://localhost:3002/plataform")

//traer por nombre
let urlName = get(`http://localhost:3002/videogames?name=${NOMBRE}`)

//traer por id
let urlID = get(`http://localhost:3002/videogames/${ID}`)

/********** POST ***************** */
//Crear un videogame
let BODY
let postVideogame = post("http://localhost:3002/videogames")
    BODY = {
        newVideoGame: {
            "name": "Luis",
            "description": "El juego es un moba de 7 vs 7",
            "rating": 4.5,
            "background_image": ""
            },
        idGener: [1,2],
        idPlatform: [1,4,6]
    }




