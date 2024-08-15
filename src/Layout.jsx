import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    async function getHome() {
      const response = await fetch('http://localhost:3000', {
        credentials: 'include',
      });
      if (response.status === 401) navigate('/login');
      if (!response.ok)
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`,
        );

      const responseData = await response.json();
      console.log(responseData);
    }

    getHome();
  }, []);

  return (
    <>
      <section>Left section here</section>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
