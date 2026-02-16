// About.tsx
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

import '/src/App.css';
import './About.css'

import CVBar from "../components/CVBar";
import PreviewImage from '../components/PreviewImage';
import PaperEntry from '../components/PaperEntry';
import { useEffect, useState } from 'react';

import profilePic from '../assets/ag_pic01.jpg';
import iceCreamPreview from "../assets/ice_cream_game.png";
import noiseGeneratorPreview from "../assets/noise_generator.png";
import rhythmAndJumpPreview from "../assets/rhythm_and_jump.png";
import drumMachinePreview from "../assets/drum_machine.png";
import renderingProjectPreview from "../assets/rendering_project.png";

interface ResearchItem {
  author: string,
  title: string,
  booktitle: string,
  year: string,
  thumbnail: string,
  src: string,
}

function About() {

  const [researchItems, setResearchItems] = useState<ResearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/research/research.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setResearchItems(jsonData);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          setLoading(false);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="About">
      <div className="container-fluid nav-bar-push">
        <div className="row" >
          <div className="col-sm col-md-4 col-lg-3 col-xxl-2 ag-lightblue-bg sidebar">
            <CVBar />
          </div>

          {/* Self Introduction */}          
          <main role="main" className="darker-background col-no-padding col-12 col-md-8 col-lg-9 col-xxl-10 ml-sm-auto">                        
            <h1>About Me</h1>
            <div className="container">                                          
              <div className="jumbotron text-center unselectable ag-section" style={{backgroundColor: "inherit"}}>              
                <div className="jumbotron-heading quote">“Am I supposed to say something cool here?”</div>
                <p className="text-muted" style={{textAlign: "right", paddingRight: "10vw"}}>― AG</p>
              </div>              
              <div className="row ag-section">
                <div id="myself-pic-holder" className="col-md-6">
                  <img className="rounded-circle" src={profilePic} style={{width: "100%"}} />
                </div>
                <div className="col-md-6">
                  <p>Hello World!</p>
                  <p>This is AG, currently a graduate student who has just been approved for graduation.</p>
                  <p>
                    I awarded my bachelor degree from HKUST, Hong Kong in 2020. During the study, I discovered the huge potential 
                    of Machine Learning in different applications nowadays. Eager to dig deeper into the field while having a promising academic performance, 
                    I initiated my research journey in the same university then. 
                  </p>
                  <div className="length-control">
                  {/*<!-- WW91IHRoaW5rIHlvdSBhcmUgcGxheWluZyBDYXB0dXJlLVRoZS1GbGFnLCBhcmVuJ3QgeW91Pw== -->*/}
                  <p>I enjoy adding eastereggs and boring stuffs inside my page. Hope you enjoy finding and playing them as well.</p>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div data-aos="fade-left" className="ag-section">
                <div className="col-12 text-center unselectable" id="about-me-projects"><h2 className="ag-section-title">Projects</h2></div>
                <hr/>
                <div className="row">
                  <div className="col-md-6">
                    <p> As an enthusiastic workaholic in developing projects as well as the research works, development of different 
                      interesting projects has already been one of my leisure activities. This is also the reason why this website
                      is created.
                    </p>
                    <p>
                      Apart from showcasing my skills and ability, the project list here also archives my past works.
                      To record that, some time ago in somewhere, there was a dreamer realizing his nonsense.
                    </p>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <PreviewImage title="SVG Game" src={iceCreamPreview} onClick={()=>{ window.open("/projects/svg_game/game.html", "_blank") }} />
                      <PreviewImage title="Soundwave Generator" src={noiseGeneratorPreview} onClick={()=>{ window.open("/projects/noise_generator", "_blank") }} />
                      <PreviewImage title="WebGL Game" src={rhythmAndJumpPreview} onClick={()=>{ window.open("/projects/rhythm_and_jump", "_blank") }} />
                      <PreviewImage title="MIDI Drum Machine" src={drumMachinePreview} onClick={()=>{ window.open("/projects/drum_machine", "_blank") }} />
                      <PreviewImage title="Rendering Project" src={renderingProjectPreview} onClick={()=>{ window.open("/projects/rendering_project", "_blank") }} />
                    </div>
                  </div>
                </div>
              </div>	        

              {/* Research */}
              <div data-aos="fade-right" className="ag-section research-section">
                <div className="col-12 text-center unselectable"><h2 className="ag-section-title">Research</h2></div> 
                <hr/>
                {
                  (error) ? <div className="ag-red prompt-msg">Loading Error...</div> : 
                  (loading) ? <div className="ag-gray prompt-msg">Loading...</div> :
                  researchItems.reverse().map((item : ResearchItem) => {
                    return (
                      <PaperEntry key={item.src} author={item.author} title={item.title} booktitle={item.booktitle} year={item.year} thumbnail={item.thumbnail} src={item.src} />
                    )
                  })
                }
              </div>		

              {/* Empty Placeholder */}
              <div className="ag-section"></div>
            </div>
          </main>
        </div>					
      </div>
    </div>
  )
}

export default About;
