import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="aboutPageContainer">
      <h3>About SAMAN</h3>
      <div>
        <p>Simple Asset Management (SAMAN) was put together in two weeks. It is a full CRUD application using technologies I've learned at Prime Digital Academy.
        </p>
        <p> Special thanks to my friends in the Mitchison cohort, instructor Dane Smith, my mentors Mali Franzese and Dewitt Kane, Jeannie from Gaimin, Matt Black, Edan Schwartz, and all of my family and friends who have supported me.</p>
        <p>Technologies used in this app include React.js, Redux, Express, Node.js, Axios, MUI, and Passport.
        </p>
      </div>
      Changelog
      <p>
        1.0 - Launch. Scanning not yet implemented.
      </p>
    </div>
  );
}

export default AboutPage;
