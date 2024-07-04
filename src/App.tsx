import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import MoviePage from './Movie/Movie';
import PersonPage from './Person/Person';
import HomePage from './pages/Home/Home';
import RootPage from './pages/Root/Root';

function App() {
  const routers = createBrowserRouter(
    [
      { 
        path: "/", 
        element: <RootPage /> ,
        children:[
          { path: "/", element: <HomePage />},
          { path: "/movie/:mname", element: <MoviePage /> },
          { path: "/person", element: <PersonPage /> },
        ]
      }
    ]
  );
  return (
    <>
      <RouterProvider router={routers} />
    </>
  )
}

export default App
