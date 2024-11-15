
import './App.css';
import Title from './components/Title';
import Footer from './components/Footer';
import Main from './components/Main';
import Top from './components/Top'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Movie100 from './components/Movie100';
import Detail from './components/Detail';
import movieArray from './utils/movieArray';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Top></Top>
      <Routes>
        <Route path="/" element={
          <>
          <Title title={'영화 박스오피스'}></Title>
          <Main/>
          <Title title={'추천영화'}></Title>
          <Movie100 movieArray={movieArray.koreaMovies} />
          <Movie100 movieArray={movieArray.classicMovies}/>
        </>
      }/>
      <Route path="/detail/:id" element={<Detail></Detail>}></Route>
      </Routes>
      </BrowserRouter>
       <Footer></Footer>
    </div>
  );
}

export default App;
