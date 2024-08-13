import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './Home.jsx';
import Folder from './Folder.jsx';
import File from './File.jsx';
import Layout from './Layout.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '*',
    element: <Navigate to='/' />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/folder',
        element: <Folder />,
        children: [],
      },
      {
        path: '/file',
        element: <File />,
        children: [],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
