import { RouterProvider } from 'react-router-dom';
import './styles/global.css';
import { router } from './routes';
import { useEffect } from 'react';
import { api } from './services/api';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('@BePrepared:token');
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
