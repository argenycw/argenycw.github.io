import Card from "../components/Card";
import './Links.css';

import reactLogo from '../assets/reactJS.png';
import bootstrapsLogo from '../assets/bootstrap-stack.png';
import threeJSLogo from "../assets/threejs.png";
import faLogo from "../assets/font_awesome.png";
import pineappleLogo from "../assets/pineapple-100.png";

const Links = () => {
  return (
    <div className="nav-bar-push container">
      <main>
        <div className="alert alert-primary alert-dismissible" role="alert">
          <button type="button" className="close" data-dismiss="alert">&times;</button>
          <strong>What is this?</strong><br />
          This page is a "portal" that provides many useful links.<br />
          Increasing the number of hyperlinks
          (ususally through <a href="https://www.w3schools.com/tags/tag_a.asp" target="_blank">&lt;a&gt; tag</a>)
          in your website provides plenty of benefits, such as <br />
          <ul>
            <li>Increase the rank of your website (so <a href="https://www.google.com" target="_blank">Google</a> will put your website higher).</li>
            <li>Make the users more convenient if they wish to learn more information.</li>
            <li>Provide exit for spiders.</li>
          </ul>
        </div>

      <h1>Links</h1>

      <div className="link-area">
        <h2 className="new-row">Tools Used for this Site</h2>
        <hr />
        <div className="row align-items-start">

          <Card src={reactLogo}
            title="ReactJS" 
            width="14rem"
            description="Build user interfaces out of individual pieces called components written in JavaScript." 
            path="https://react.dev/" 
          />

          <Card src={bootstrapsLogo}
            title="Bootstrap" 
            width="14rem"
            description="The latest version during development (very long time ago)" 
            path="https://getbootstrap.com/" 
          />

          <Card src={threeJSLogo}
            title="ThreeJS" 
            width="14rem"
            description="An easy-to-use, lightweight, cross-browser, general-purpose 3D library" 
            path="https://threejs.org/" 
          />

          <Card src={faLogo}
            title="Font Awesome" 
            width="14rem"
            description="The next generation of the internet's favorite icon library and toolkit" 
            path="https://fontawesome.com/" 
          />

          <Card src={pineappleLogo}
            title="No Template Used" 
            width="14rem"
            description="This website is completely made by coding and involves no template" 
            path="#" 
          />

        </div>
      </div>
      </main>
    </div>
  );
}

export default Links;