// CVBar.tsx
import '/src/App.css'
import './CVBar.css';

function CVBar() {
  // const [count, setCount] = useState(0)

  return (
    <div className="sidebar-sticky ag-blue" id="cv-bar">
      <div className="nav-section unselectable" id="name-info">
        <div className="large-name-highlight">(AG)</div>
        <div className="name-highlight">甄&emsp;釗&emsp;煒</div>
        <div className="name-highlight">YAN CHIU WAI</div>
      </div>      

      <div className="nav-section" id="contact-info">
        <h4 className="bold">Contact</h4><hr/>
        <table id="contact-table">
          <tbody>
            <tr><td><i className="fa fa-envelope"></i></td><td><a href="mailto:argencwyan@gmail.com">argencwyan@gmail.com</a></td></tr>
            <tr><td><i className="fas fa-file-alt"></i></td><td><a href='/certifications/YanChiuWai_cv.pdf' target="_blank">Download My CV</a></td></tr>            
            <tr><td><i className="fa fa-github"></i></td><td><a href="https://github.com/argenycw" target="_blank">Github</a></td></tr>            
            <tr><td><i className="fa fa-linkedin"></i></td><td><a href="https://www.linkedin.com/in/chiu-wai-yan-64231b223/" target="_blank">LinkedIn</a></td></tr>
          </tbody>
        </table>
      </div>

      <div className="nav-section">
        <h4 className="bold">Education</h4><hr/>

        <div className="nav-section">
          <div>MPhil in Computer Science (2020 - 2022), HKUST</div>        
          <div>Research Topic: <span className="ag-gray">Adversarial Attack, Deep Learning, Computer Vision</span></div>
          <table id="contact-table">
            <tbody>
              <tr><td><i className="fa fa-certificate"></i></td><td><a href='/certifications/mphil_certificate.png' target="_blank">Certificate</a></td></tr>
              <tr><td><i className="fa fa-graduation-cap"></i></td><td><a href='/certifications/YanChiuWai_transcript.pdf' target="_blank">Academic Transcript</a></td></tr>
            </tbody>
          </table>
        </div>

        <div className="nav-section">
          <div>BEng in Computer Science (2016 - 2020), HKUST </div>
          <div>First Class Honors (CGPA: 3.88)</div>
          <table id="contact-table"><tbody><tr><td><i className="fa fa-graduation-cap"></i></td><td><a href='/certifications/YanChiuWai_transcript.pdf' target="_blank">Academic Transcript</a></td></tr></tbody></table>        
        </div>
      </div>
    </div>
  )
}

export default CVBar;
