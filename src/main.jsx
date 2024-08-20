import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './Home.jsx';
import TargetFolder from './TargetFolder.jsx';
import TargetFile from './TargetFile.jsx';
import Layout from './Left/Layout.jsx';
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
        path: 'folder/:folderId',
        element: <TargetFolder />,
      },
      {
        path: 'folder/:folderId/:fileId',
        element: <TargetFile />,
      },
      {
        path: 'file/:fileId',
        element: <TargetFile />,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <Signup />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
