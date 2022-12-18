import './App.css';
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Home from './Components/Home'
import Filters from './Components/Filters'
import RestaurantsDetails from './Components/RestaurantsDetails'
import ErrorPage from './Components/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><Home/></div>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/filters",
    element: <div><Filters/></div>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/details/:RestaurantsName",
    element: <RestaurantsDetails/>,
    errorElement: <ErrorPage/>
  }
]);

function App() {
  return (
    <div><RouterProvider router={router} /></div>
  )
}

export default App;
