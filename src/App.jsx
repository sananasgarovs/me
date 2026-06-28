import Sanan from './Sanan.jsx';

const SANAN_KEY = import.meta.env.VITE_SANAN_KEY;

const App = () => {
  const params = new URLSearchParams(window.location.search);
  const key = params.get('s');

  if (key !== SANAN_KEY) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#05080f',
        color: '#fff',
        fontFamily: 'Inter, sans-serif',
      }}>
        <p style={{ opacity: 0.5, fontSize: 14, letterSpacing: '0.1em' }}>404 — Not Found</p>
      </div>
    );
  }

  return <Sanan />;
};

export default App;
