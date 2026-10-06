import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
    return (
        <main className='home-page'>
            <header className='home-header'>
                <div className='home-brand'>
                    <img src='https://img.icons8.com/pastel-glyph/64/note.png' alt='' />
                    <span>a-Note</span>
                </div>
                <Link className='home-login-link' to='/login' style={{ textDecoration: 'none' }}>Log in</Link>
            </header>
            <section className='home-hero'>
                <div className='home-copy'>
                    <p className='home-eyebrow'>A calmer place for your thoughts</p>
                    <h1>Keep your ideas close.</h1>
                    <p className='home-description'>
                        a-Note helps you capture, organize, and find the notes you need.
                        Write things down, then archive or remove them when you are done.
                    </p>
                    <div className='home-actions'>
                        <Link className='home-primary-action' to='/login' style={{ textDecoration: 'none' }}>Get Started</Link>
                        <Link className='home-secondary-action' to='/signup' >Create an account</Link>
                    </div>
                </div>
                <div className='home-preview' aria-hidden='true'>
                    <div className='home-preview-top'><span></span><span></span><span></span></div>
                    <div className='home-preview-label'>YOUR NOTES</div>
                    <div className='home-preview-note'>
                        <div className='home-preview-line home-preview-line-title'></div>
                        <div className='home-preview-line'></div>
                        <div className='home-preview-line home-preview-line-short'></div>
                    </div>
                    <div className='home-preview-note home-preview-note-blue'>
                        <div className='home-preview-line home-preview-line-title'></div>
                        <div className='home-preview-line'></div>
                        <div className='home-preview-line home-preview-line-short'></div>
                    </div>
                </div>
            </section>
        </main>
    );
}
