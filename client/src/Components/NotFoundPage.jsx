import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <img src={"https://previews.123rf.com/images/devitaayusilvia/devitaayusilvia2212/devitaayusilvia221200126/197943572-hand-drawn-doodle-person-confused-by-the-signpost-illustration.jpg"} alt="Page Not Found" className="not-found-image" />
      <h1>Error 404: Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/">
        <button>Go Home</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;