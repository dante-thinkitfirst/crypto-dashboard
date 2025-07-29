import { Link } from "react-router";

const Header = () => {
  return (
    <header>
      <div className="top-nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
    </header>
  );
};

export default Header;
