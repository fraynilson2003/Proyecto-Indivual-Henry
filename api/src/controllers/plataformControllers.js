require('dotenv').config();
const axios = require("axios")
const {platform, videogame} = require("../db")//AQUI VAN TODOS LOS CONTROLADORES DE USERS
// const {Op} = require("sequelize")

const { MY_KEY_API } = process.env;

/*********** SIN EXPORT *************** */

let getAllPlatformAPI = async()=>{   
  let allPlatform = await axios.get(`https://api.rawg.io/api/platforms/lists/parents`,{
    params: {
      key: MY_KEY_API,
    }
  }).then(res=>res.data.results.map(platf=>{
    return {id: platf.id,
            name: platf.name,
    }
  }))
  .catch(error=>{throw Error(error)})

  console.log(allPlatform.length);

  //AGREGAMOS A LA BASE DA DATOS
  let setPromise = allPlatform.map( ele => {
    return platform.create(ele)
  });
  await Promise.all(setPromise)
  
  return true
}

/**************  GET ********************/
let getAllPlatform = async()=>{
    try {
      let allPlatf =  await platform.findAll()

      allPlatf =  allPlatf.sort(function(a, b) {
        return a.id - b.id;
      });

      console.log(allPlatf.length);
      return allPlatf
    } catch (error) {
      throw Error(error)
    }
}
/*************** POST ************************** */

let createPlatform = async(name, slug)=>{
    if(!name && !slug.length) throw Error("Mising data")
    let newPlatform = await platform.create({name, slug})

    return newPlatform

}

/*************** POST VINCULATE ***********************/
let createVideogamePlataform = async(videoGamesID, platformID)=>{
    let newVideoplatform
    if(videoGamesID && platformID.length){
        newVideoplatform = await videogame.findByPk(videoGamesID)
        await newVideoplatform.addPlatforms(platformID) //sequalize crea el metodo "addUsers"

        return newVideoplatform
    }
    
}
module.exports = {
    getAllPlatform,
    getAllPlatformAPI,
    createVideogamePlataform,
    createPlatform

}

