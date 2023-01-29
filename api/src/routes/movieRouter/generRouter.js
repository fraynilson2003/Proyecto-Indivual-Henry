let {Router} = require("express")
const {Op} = require("sequelize")

let {
    getAllGeners,
    createGener,
    createVideogameGener
} = require("../../controllers/generControllers")

let ERROR_FOUNT = 404

let generRouter = Router()

/*************** GET GENERS ******************/
generRouter.get("/", async(req,res)=>{
    let geners
    try {
        geners = await getAllGeners()
         res.status(200).json(geners)

    } catch (error) {
        res.status(ERROR_FOUNT).json({error: error.message})
    }
})
/******************** POST  *******************/
generRouter.post("/", async(req, res)=>{
    let {name} = req.body

    let newGener
    try {
        newGener = await createGener(name)
        res.status(200).json(newGener)

    } catch (error) {
        res.status(ERROR_FOUNT).json({error: error.message})
    }
})




module.exports = {generRouter}