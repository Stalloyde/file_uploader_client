import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './Home.jsx';
import Folder from './TargetFolder.jsx';
import File from './TargetFile.jsx';
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
        element: <Folder />,
      },
      {
        path: 'folder/:folderId/:fileId',
        element: <File />,
      },
      {
        path: 'file/:fileId',
        element: <File />,
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
