// InterestingWorks.tsx
import { useRef, useState } from 'react';

import './InterestingWorks.css'

import InterestingWorkPanel from '../components/InterestingWorkPanel'
import MatrixTable from '../components/MatrixTable';
import { genMatrix } from './interesting_works/matrice';

const InterestingWorks = () => {

  const [matrixSize, setMatrixSize] = useState(3);

  return (
    <div className="d-flex flex-column h-100">
      <div className="container nav-bar-push"> 
        <main>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">                
              <div className="alert alert-primary alert-dismissible" role="alert">
                <button type="button" className="close" data-dismiss="alert">&times;</button>
                <strong>What is this?</strong><br/>   
                This is a set of Javascript projects that I completed in my year 2 winter. <br />
                
                However, due to the rework of the website (to ReactJS), the Javascript may not run properly.
                Please be patient to wait for the rework of this page as well :)
              </div>
            </div>
          </div>		
          <h1 className="big-header">Interesting Works</h1>
          
          <div className="justify-content-center">

            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">RREF Calculator</a>
                <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Inverse Calculator</a>
                <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Japanese Vocab Quiz</a>
              </div>
            </nav>

            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                {/* Remake RREF Calculator */}
                <InterestingWorkPanel 
                  title='RREF Calculator'
                  preText='Please input the dimension of the matrix. (Row × Column)'
                  Component={MatrixTable}
                  postText={`Don't ask me what happens in the code. <br/> It took me 3 nights of debugging and then it magically worked. <br/> -AG`}  
                />
              </div>
              <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                {/* Inverse Calculator */}
                <InterestingWorkPanel 
                  title='Inverse Calculator'
                  preText='Please input the size of the matrix.' 
                  Component={() => (
                    <div>
                      {/*
                      <input type="number" id="size" max="10" min="1" value={matrixSize} onChange={e => setMatrixSize(Number(e.target.value))} />&emsp;
                      <button id="gen-matrix" onClick={() => {genMatrix()}}>Generate Matrix</button>
                      */}
                      <MatrixTable sizeX={matrixSize} square />
                      {/*
                      <div className="row">
                        <div id="matrix-2" className="col-12 col-md-6"></div>
                        <div id="soln-2" className="matrix-values col-12 col-md-6"></div>
                      </div>*/}
                    </div>
                  )} 
                  postText={`The trick here is to build an Nx(2N) matrix, with the left NxN being the target matrix and the right NxN an identity matrix.<br/> 
                  After that, apply RREF. If the left matrix is identity, then the right matrix will be the solution.<br/>-AG`}
                />   
              </div>
              <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                <iframe src="/projects/jp_selfstudy/index.html" width="100%" height="100%" style={{minHeight: "600px", marginTop: "10px"}}></iframe>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InterestingWorks;