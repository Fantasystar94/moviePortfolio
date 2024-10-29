
import './App.css';
import Title from './components/Title';
import Footer from './components/Footer';
import Main from './components/Main';
import Top from './components/Top'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Movie100 from './components/Movie100';
import Detail from './components/Detail';
import util from './utils/util';
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
          <Title title={'세계명작 영화'}></Title>
          <Movie100 movieArray={util.koreaMovies} />
          <Movie100 movieArray={util.classicMovies}/>
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
