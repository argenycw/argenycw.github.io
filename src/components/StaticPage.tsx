// StaticPage.tsx
import { useEffect } from 'react';

interface StaticPageProps {
  src: string;
}

const StaticPage = ( item: StaticPageProps ) => {
  useEffect(() => {
    // Load the static HTML content
    fetch(item.src)
      .then((response) => response.text())
      .then((html) => {
        const content = document.getElementById('static-content');
        if (content) {
          // load the static webpage
          content.innerHTML = html;

          // find and load the script manually
          /*
          const scripts = content.getElementsByTagName('script');
          for (let script of scripts) {
            // Create a new <script> element
            const newScript = document.createElement('script');
            newScript.text = script.innerHTML; // Set the text from the existing script
            document.body.appendChild(newScript); // Append to the body to execute
          }
          */
        }
      })
      .catch((error) => {
        console.error('Error loading static HTML:', error);
      });
  }, []);

  return <div id="static-content"></div>;
};

export default StaticPage;