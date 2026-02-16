// NavBar.tsx
import './NavBar.css'

import { Link } from 'react-router-dom';

const NavBar = () => {

  return (
    <nav className="navbar fixed-top navbar-expand-md navbar-light bg-light">
      <a className="navbar-brand" href="#">AG'S PAGE</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapse-data" aria-controls="collapse-data" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapse-data">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to='/'>Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/about'>About Me</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/playground'>Playground</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/interesting-works">Interesting Works</Link>
          </li>			  
          <li className="nav-item">
          <Link className="nav-link" to="/links">Links</Link>
          </li>		  
        </ul>
        <span className="navbar-text"></span>
      </div>
    </nav>
  )
}

export default NavBar;