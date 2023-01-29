let {Router} = require("express")
let ERROR_FOUNT = 404

let plataformRouter = Router()
let {
    getAllPlatform,
    getAllPlatformAPI,
    createPlatform,
    createVideogamePlataform
} = require("../../controllers/plataformControllers")

/**************  GET ********************/
plataformRouter.get("/", async(req,res)=>{
    let platform
    try {
        console.log("Llega a platform");
        // activamos cuando la base de datos este vacia
        //await getAllPlatformAPI()

        platform = await getAllPlatform()
        res.status(200).json(platform)

    } catch (error) {
        res.status(ERROR_FOUNT).json({error: error.message})
    }
})
/*************** POST ***********************/
plataformRouter.post("/", async(req,res)=>{
    let {name, slug} = req.body

    let newPlataform
    try {
        newPlataform = await createPlatform(name, slug)

        res.status(200).json(newPlataform)

    } catch (error) {
        res.status(ERROR_FOUNT).json({error: error.message})
    }
})

/*************** POST VINCULADOS  ***********************/

plataformRouter.post("/videogamePlatform", async(req,res)=>{
    let {videoGamesID, platformID} = req.body


    let newPlataform
    try {
        newPlataform = await createVideogamePlataform(videoGamesID, platformID)


        res.status(200).json(newPlataform)

    } catch (error) {
        res.status(ERROR_FOUNT).json({error: error.message})
    }
})

/**************** PUT ********************** */



 /**************** DELETE ********************** */



module.exports = {plataformRouter}