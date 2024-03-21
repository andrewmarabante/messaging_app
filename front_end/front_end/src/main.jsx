import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from './LoginPage.jsx'
import Error from './Error.jsx';
import Messages from './Messages.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />

  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "messages",
    element: <Messages/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
