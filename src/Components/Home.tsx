import { NavLink } from "react-router-dom";
import { pagesPath } from "../routers";

const Home = () => {
  return (
    <section id="home" className="layout__container">
      <div className="home__content">
        <h1 className="default-title">Hello! I am Maksim Shpetyuk.</h1>
        <p className="home__content_desc">I present my thesis, with the help of which we can classify blood cells according to their type!</p>
        <NavLink to={pagesPath.cabinet} className="default-btn">
          <span>Get started</span>
        </NavLink>
      </div>
    </section>
  );
};

export default Home;
