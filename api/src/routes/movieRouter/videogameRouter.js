let {Router} = require("express")
const {Op} = require("sequelize")

let {
    getAllMovies,
    getVideogameID,
    getVideogameByName,
    createVideoGame,
    createVideogameGener,
   
} = require("../../controllers/videoGamesControllers")

let ERROR_FOUNT = 404

let videogameRouter = Router()

/**************  GET ********************/

videogameRouter.get("/", async(req,res)=>{
    let {name} = req.query
    let videogames
    try {
        if(name) videogames = await getVideogameByName(name)
        else     videogames = await getAllMovies();//sacamos todos los juegos   

        res.status(200).json(videogames)

    } catch (error) {
        res.status(ERROR_FOUNT).json({error: error.message})
    }
})

videogameRouter.get("/:id", async(req,res)=>{ 
    let {id} = req.params
    let results
    try {
        results = await getVideogameID(id)
        res.status(200).json(results)
    } catch (error) {
        res.status(ERROR_FOUNT).json({error: error.message})
    }

})




/*************** POST ***********************/

videogameRouter.post("/", async(req,res)=>{
    let {newVideoGame, idGener, idPlatform} = req.body
    
    let newMovie
    try {
        newMovie = await createVideoGame(newVideoGame, idGener, idPlatform)
        res.status(200).json(newMovie)
    } catch (error) {
        res.status(ERROR_FOUNT).json({error: error.message})
    }
})

/****************POST VINCULATE **************** */
videogameRouter.post("/videoGenre", async(req,res)=>{
    let {idVideogame, idGener} = req.body
    try {
    movies = await createVideogameGener(idVideogame, idGener)
    res.status(200).json(movies)

    } catch (error) {
        res.status(ERROR_FOUNT).json({error: error.message})
    }
})

/**************** PUT ********************** */

// movieRouter.put("/", (req, res)=>{
//     let {id, name, email} = req.body
//     try {
//         let results = updateUsers(id, name, email)
//         res.status(200).json(results)
//     } catch (error) {
//         res.status(ERROR_FOUNT).json({error: error.message})
//     }
//  })


 /**************** DELETE ********************** */
 
//  movieRouter.delete("/:id/delete", async(req,res)=>{
//      let {id} = req.params
//      try {
//         let results = await deletUser(id)
//         console.log(results);
//         res.status(200).json(results)

//      } catch (error) {
//         res.status(ERROR_FOUNT).json({error: error.message})

//      }

//  })

//POSTS
//GET/ users                devuelve todos los users
//GET/ users/:id            devuelve user con ese id
//GET/ users/?name          devuelve todos los users
//POST/ users               crea nuevo usuario
//PUT/ users                modifica usuario
//DELTE/ users/:id/delete          elimina usuario con ese id

module.exports = {videogameRouter}