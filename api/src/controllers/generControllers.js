require('dotenv').config();
const axios = require("axios")
const {genre, videogame} = require("../db")//AQUI VAN TODOS LOS CONTROLADORES DE USERS


const { MY_KEY_API } = process.env;

/*************  METODOS SIN EXPORT *************** */
let getAllGenerAPI = async()=>{
 
    let API = await axios.get(`https://api.rawg.io/api/genres`, {
        params: {
            key: MY_KEY_API,
        }
    }).then(res=>res.data.results.map(gene=>{
        return {id: gene.id,
                name: gene.name,
                image_background: gene.image_background,
                //games: gene.games
                }
    }))
    .catch(error=>{throw Error(error)})

    API =  API.sort(function(a, b) {
        return a.id - b.id;
      });
      console.log(API.length);

    return API

    
}

/**************  GET ********************/
let getAllGeners = async()=>{
 
    try {
        /* DESACTIVADO MIENTRAS PROBAMOS FRONTED*/
        // //API
        // let genersAPI = await getAllGenerAPI()
        // //Ponemos a la DATA BASE todos los generos
        // let setPromise = genersAPI.map(ele => {
        //     return  genre.create(ele)
        // });
        // await Promise.all(setPromise)

        //DATA BASE
        let genersDataBase = await genre.findAll()

        genersDataBase =  genersDataBase.sort(function(a, b) {
            return a.id - b.id;
        });

        return genersDataBase

    } catch (error) {
        console.log(error);
        throw Error(error)
    }
  
}
/************************ POST  ***********************/
let createGener = async(name)=>{
    if(!name) throw Error("Mising data")
    let newGener = await genre.create({name})

    return newGener

}

module.exports = {
    createGener,
    getAllGeners

}

