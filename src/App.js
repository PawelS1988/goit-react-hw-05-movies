import React, {
  useEffect,
  useState,
  Suspense,
  lazy,
  useDebugValue,
} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import Navigation from './components/Navigation/Navigation.jsx';
import Reviews from './components/Reviews/Reviews.jsx';
import Loading from './components/Loading/Loading.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import { ImgSrcContext } from './Context/ImgSrcContext/ImgSrcContext';

const API_KEY = 'd663ef6d9c559823a3b7466e99f0a230';

function App() {
  const MovieDetailsPage = React.lazy(() =>
    import('./Pages/MovieDetailsPage/MovieDetailsPage')
  );
  const MoviesPage = lazy(() => import('./Pages/MoviesPage/MoviesPage'));
  const Cast = lazy(() => import('./components/Cast/Cast.jsx'));

  const useImgSrc = () => {
    const [imgSrc, setImgSrc] = useState({
      secure_base_url: '',
      poster_sizes: [],
      profile_sizes: [],
    });

    // cosnt

    useEffect(() => {
      const fetchImgConfiguration = apiKey => {
        fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`)
          .then(resp => resp.json())
          .then(resp => resp.images)
          .then(({ secure_base_url, poster_sizes, profile_sizes }) => {
            setImgSrc({ secure_base_url, poster_sizes, profile_sizes });
          })
          .catch(er => console.log('MoveDetailsPage fetch fail! -> ' + er));
      };
      fetchImgConfiguration(API_KEY);
    }, []);

    useDebugValue(imgSrc, 'loading...');

    return imgSrc;
  };

  const imgSrc = useImgSrc();

  return (
    <BrowserRouter>
      <ImgSrcContext.Provider value={imgSrc}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navigation />
                <Suspense fallback={<Loading />}>
                  <HomePage />
                </Suspense>
              </>
            }
          />

          <Route
            path="/movies"
            element={
              <>
                <Navigation />
                <Suspense fallback={<Loading />}>
                  <MoviesPage apiKey={API_KEY} />
                </Suspense>
              </>
            }
          />

          <Route
            path="/movies/:id"
            element={
              <>
                <Navigation />
                <Suspense fallback={<Loading />}>
                  <MovieDetailsPage apiKey={API_KEY} imgSrc={imgSrc} />
                </Suspense>
              </>
            }
          >
            <Route
              path="cast"
              element={
                <Suspense fallback={<Loading />}>
                  {/* Context for srcImg  */}
                  <Cast apiKey={API_KEY} />
                </Suspense>
              }
            />
            <Route path="reviews" element={<Reviews apiKey={API_KEY} />} />
          </Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </ImgSrcContext.Provider>
    </BrowserRouter>
  );
}

export default App;
