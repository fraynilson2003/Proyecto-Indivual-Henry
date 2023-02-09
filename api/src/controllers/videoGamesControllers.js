require('dotenv').config();
const {videogame, platform, genre} = require("../db")//AQUI VAN TODOS LOS CONTROLADORES DE USERS
const axios = require("axios")

const {Op} = require("sequelize");
const { config } = require('dotenv');
const { MY_KEY_API } = process.env;


/***************** METODOS SIN EXPORT  ******************* */
//Filtros

///Todo
let getAllPageAPI = async(pageNu)=>{
  let videogames = []

  let promises = pageNu.map(page=>{
    return axios.get('https://api.rawg.io/api/games', {
      params: {
        key: MY_KEY_API,
        page: page, //numero de pagina
        page_size: 20,
      }}
  ).then((res)=>res.data.results.map(vid=>{
    let modiVideogame = {id: vid.id,
                        name: vid.name,
                        slug: vid.slug,
                        background_image: vid.background_image,
                        genres: vid.genres.map(det=>{
                          return {id: det.id,
                                  name: det.name,
                                  image_background: det.image_background
                                  }
                        }),
                        origin: "API"
                        }
    videogames.push(modiVideogame)
  }))
  .catch(error => {
    throw Error(error)
  })
  })

  await Promise.all(promises)

  videogames = videogames.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
 

  return videogames
}

let gettAllDataBase = async()=>{
  let baseDatos
  await videogame.findAll(
    { attributes: ["id", "name", "background_image"],
      include:      
      {model: genre,
        attributes: ["id", "name", "image_background"],
        through: { 
        attributes:[]
      }}
    }
  ).then((response) => {
    baseDatos = response.map((vid)=>{
      vid.dataValues.origin = "database"
      return vid.dataValues
    })
  }).catch(error => {
    throw Error("Error en extraccion de datos de la BASE DATA "+error)
  });

  //ordenamos
  baseDatos = baseDatos.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return baseDatos

}

/**************  GET ********************/
//todo
let getAllMovies = async(ordenGeneral = "mas")=>{   
  let resultAPI = []
  let resultBase = []
  let finalResult

  //API
  let APIPromise = getAllPageAPI([1,2,3,4])
            .then(res=> resultAPI = res)
            .catch(error=>{throw Error(error)})

  //BASE DE DATOS  
  let BasePromise = gettAllDataBase()
            .then(res=> resultBase = res)
            .catch(error=>{throw Error(error)})
  
  await Promise.all([BasePromise, APIPromise]);
  console.log("***********************************");

  //Ordenamos
  resultBase = resultBase.slice(0, 50)


  if(ordenGeneral == "menos" ){
    finalResult = [...resultBase, ...resultAPI].sort(function(a, b) {
      return b.name - a.name;
    });
  }else{
    finalResult = [...resultBase, ...resultAPI].sort(function(a, b) {
      return a.name - b.name;
    });
  }

  console.log(finalResult.length);


  return finalResult

}
//por ID
let getVideogameID = async(id)=>{
  let users

  if (!isNaN(id)) {
    //CONSULTA EN LA API
    await axios.get(`https://api.rawg.io/api/games/${id}`, {
      params: {
        key: MY_KEY_API
      }
    }).then(resp=>{
      
      users = {id: resp.data.id,
              name: resp.data.name,
              description: resp.data.description,
              rating: resp.data.rating,
              released: resp.data.released,
              background_image: resp.data.background_image,
              platforms: resp.data.platforms.map(ele=>ele.platform),
              genres: resp.data.genres,
              }
      })
    .catch(error => {
      throw Error(error)
    })

  } else{
    //CONSULTA EN LA BASE DE DATOS
    users =  await videogame.findOne({
      where: {id: id},
      include:
      [{model: genre,
        attributes: ["id", "name", "image_background"],
        through: { 
        attributes:[]
      }},
      {model: platform,
        attributes: ["id", "name"],
        through: { 
        attributes:[]
      }}]
    })
  }
  console.log("************************************");
  console.log(users);
  if (users) return users 
  else throw Error("No existe el videogame con este ID")
}
//por nombre
let getVideoByNameAPI = async(name)=>{
  let API = []

  await axios.get(`https://api.rawg.io/api/games`,{
    params: {
      key: MY_KEY_API,
      search: name
    }
  }).then(res=>res.data.results.map(vid=>{
    let newGame = {id: vid.id,
                  name: vid.name,
                  background_image: vid.background_image,
                  genres: vid.genres.map(det=>{
                    return {id: det.id,
                            name: det.name,
                            image_background: "NOT"
                            }
                  }),
                  origin: "API",
                  }
    API.push(newGame)        
          
  })).catch(error=>{
    throw Error(error)
  })

  //ordenamos

  return API

}

let getVideoByNameBaseData = async(name)=>{
  let DataBase = []

  await videogame.findAll(
    { where: {name: {[Op.iLike]:`%${name}%`}},
      attributes: ["id", "name", "background_image"],
      limit: 5,
      include:  
      {model: genre,
        attributes: ["id", "name", "image_background"],
        through: { 
        attributes:[]
      }}
    }
  ).then(response => DataBase = response.map((vid)=>{
    vid.dataValues.origin = "database"
    return vid.dataValues})
  ).catch(error=>{throw Error(error)})
  
  return DataBase
}

let getVideogameByName = async(name, ordenGeneral = "mas")=>{
  let API = []
  let DataBase = []
  let finalResult
  
  //API
  promiseAPI = getVideoByNameAPI(name)
              .then(res=>API=res)
              .catch(error=>{throw Error(error)})
  //DATA BASE
  promiseBase = getVideoByNameBaseData(name)
              .then(res=>DataBase=res)
              .catch(error=>{throw Error(error)})

  await Promise.all([promiseAPI, promiseBase])
  console.log("******************************************");
  //ordenamos

  finalResult = [...DataBase, ...API ].slice(0,15)
  
  // devolvemos solo 15
  return finalResult

}

/*************** POST ***********************/

let createVideoGame = async(newVideoGame, idGener, idPlatform)=>{
  if(idGener.length && idPlatform.length ){
    try {

      console.log("*******************************");
      console.log(newVideoGame);

      let newVideogame = await videogame.create(newVideoGame)
      await newVideogame.addGenres(idGener) //agregamos los generos
      await newVideogame.addPlatforms(idPlatform)//agregamos las plataformas


      //lo que traigo de la DATA BASE
      let allDataVideo = await videogame.findAll(
        {where: {id: newVideogame.id},              //condicion
        attributes: ["id", "name", "description", "background_image", "released"],  //atributos a traer
        include:                    //extras que traemos de otras tablas
          [{model: genre,
          attributes: ["id", "name", "image_background"],  //del model "Page" que traigo
          through: {attributes:[]}
          },
          {model: platform,
          attributes: ["id", "name"],
          through: {attributes: []} 
          }]
        }
      )


      return allDataVideo
    } catch (error) {
      throw Error(error)
    }
  
  }else{
    throw Error("Mising data")
  } 
}

/*************** POST VINCULADOS ***********************/
let createVideogameGener = async(idVideogame, idGener)=>{
  let newGener
  if(idVideogame, idGener.length){
      try {
        newGener = await videogame.findByPk(idVideogame)
        await newGener.addGenres(idGener) //sequalize crea el metodo "addUsers"
  
        return newGener
      } catch (error) {
        throw Error(error)
      }

  }else{
      throw Error ("Mising data")
  }
  
}


module.exports = {
    getAllMovies,
    getVideogameID,
    getVideogameByName,
    createVideoGame,
    createVideogameGener

}

