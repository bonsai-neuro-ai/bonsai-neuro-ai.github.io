import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './footer';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="page-container">
      <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;