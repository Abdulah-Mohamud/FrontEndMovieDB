import './App.css';
import Appbar from './components/Appbar'
import MovieDatabase from './components/MovieDatabase'
import Searchbar from './components/Searchbar'

function App() {
  return (
    <div className="App">
    <Appbar/>
    <Searchbar/>
    <MovieDatabase/>
     
    </div>
  );
}

export default App;