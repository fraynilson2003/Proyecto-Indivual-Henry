import { Route } from 'react-router-dom';
import "./App.css"
import { Portada } from './components/home/Portada';
import { Main } from './components/Videogame/Main';
import { VideogameDetail } from './components/VideogameDetail/VideogameDetail';

function App() {
  return (
    <div className="App">
     <Route exact path="/">
      <Portada/>
    </Route>

    <Route exact path={"/videogames"}>
      <Main/>
    </Route>

    <Route exact path={"/videogames/:vidID"}>
      <VideogameDetail/>
    </Route>

    </div>
  )
}

export default App;
