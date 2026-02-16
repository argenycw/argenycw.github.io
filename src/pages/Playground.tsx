// Playground.tsx

import React from "react";
import Card from '../components/Card'

import jupyterLiteLogo from '../assets/jupyterlite.png';
import webLLMLogo from '../assets/webllm.jpg';

const Playground = () => {


  return (
    <div className="d-flex flex-column h-100">
      <div className="container nav-bar-push">  
        <main>          
          <div className="alert alert-primary alert-dismissible" role="alert">
            <button type="button" className="close" data-dismiss="alert">&times;</button>
            <strong>What is this?</strong><br/>   
            This is a set of playgrounds running <b>in-browser</b> <br />
            You can have a glimpse of how strong the modern JS-based frameworks have evolved.
          </div>

          <h1>Playground</h1>

          <div className="d-flex flex-wrap">
            <Card src={jupyterLiteLogo} title="JupyterLite" 
              description="A JupyterLab distribution that runs entirely in the browser built from the ground-up using JupyterLab components and extensions." 
              path="/#/Playground/JupyterLite" playable
            />
            <Card src={webLLMLogo} title="WebLLM" 
              description="Coming Soon!"
              path="/#/Playground/WebLLM" playable disabled
            />
            <Card src="https://placehold.co/200x200?text=?" title="???" 
              description="Coming Soon!"
              path="#" playable disabled
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Playground;