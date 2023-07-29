import { Container } from 'components';
import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import { SharedLayout } from 'pages';
import css from 'components/App.module.scss';

const Home = lazy(() => import('../pages/Home/Home'));
// const Movies = lazy(() => import('../pages/Movies/Movies'));
// const MovieDetails = lazy(() => import('../pages/MovieDetails/MovieDetails'));
// const Cast = lazy(() => import('../pages/Cast/Cast'));
// const Reviews = lazy(() => import('../pages/Reviews/Reviews'));

export const App = () => {
  return (
    <div className={css.App}>
      <Container>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            {/* <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId" element={<MovieDetails />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="*" element={<NotFound />} />
            </Route> */}
          </Route>

          <Route path="*" element={<Home />} />
        </Routes>
      </Container>
    </div>
  );
};
