
export let ordenadorABC = (data, order)=>{
    let res
    if(order == "a - z"){
        res =  data.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
        });
    }else{
        res =  data.sort((a, b) => {
            if (a.name > b.name) {
              return -1;
            }
            if (a.name < b.name) {
              return 1;
            }
            return 0;
        });
    }

    return res

}

export let ordenadorOrigin = (data, origin)=>{
  let result

  if (origin == "All") {
    return data
  }

  result = data.filter(function (vid){
    return vid.origin == origin
  }.bind(this))


  return result
}

export let ordenadorGener = (data, gener)=>{
  if (gener == 0) return data
  
  if (!gener) return data

  console.log("Entra a filter gener");
  console.log(data);
  //tengo que hacer que llegue el bind
  let result = data.filter(function(vid){
    let idGen
    if(!vid.genres.length){
      return false
    }else{
      idGen = vid.genres.map(gen=>gen.id)
      return idGen.includes(Number(gener))
    }
  }.bind(this))

  console.log("*****/////****///****////****/");
  console.log(result);
  return [...result]


}
