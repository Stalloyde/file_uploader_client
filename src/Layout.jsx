import { Outlet } from 'react-router-dom';

function Layout() {
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
