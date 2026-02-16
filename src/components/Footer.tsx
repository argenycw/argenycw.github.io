// Footer.tsx

import './Footer.css'

const Footer = () => {
  return (
    <div className="footer-box">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 col-xs-12">
            <span><b>Contact Me</b></span><br/>
            Email: <a href="mailto:argencwyan@gmail.com">argencwyan@gmail.com</a><br/>
            <span className="icon facebook-hover" onClick={() => window.open('https://www.facebook.com/chiuwai.yan', '_blank')}><i className="fa fa-facebook-square"></i></span> &nbsp;
            <span className="icon github-hover" onClick={() => window.open('https://github.com/argenycw', '_blank')}><i className="fa fa-github"></i></span> &nbsp;
            <span className="icon linkedin-hover" onClick={() => window.open('https://www.linkedin.com/in/chiu-wai-yan-64231b223/', '_blank')}><i className="fa fa-linkedin-in"></i></span> &nbsp;
            <span className="icon twitter-hover" onClick={() => window.open('https://twitter.com/argenycw', '_blank')}><i className="fa fa-twitter"></i></span> &nbsp;
          </div>
          <div className="acknowledgement col-sm-6 col-xs-12 d-flex flex-column justify-content-end align-items-end">
            <div className="item">Powered by VSCode and AG's keyboard.</div>
            <div className="item">Logos from the Internet.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;