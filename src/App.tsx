
import React, { useState } from 'react';

function App() {
  const [feeling, setFeeling] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!feeling.trim()) return;
    setLoading(true);
    const res = await fetch('https://lumequa-flow-ryan-padovanis-projects.vercel.app/api/flow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feeling }),
    });
    const data = await res.json();
    setResponse(data);
    setLoading(false);
  };

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem', background: '#0f0c29', color: '#fff', minHeight: '100vh' }}>
      <h1>Luméqua Flow</h1>
      <textarea
        rows={4}
        value={feeling}
        onChange={(e) => setFeeling(e.target.value)}
        placeholder="Type your feeling here..."
        style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #555' }}
      />
      <button onClick={handleSubmit} disabled={loading} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#663399', color: '#fff' }}>
        {loading ? 'Processing...' : 'Flow It'}
      </button>

      {response && (
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#222', borderRadius: '10px' }}>
          <h2>Luméqua’s Message:</h2>
          <p style={{ whiteSpace: 'pre-wrap' }}>{response.message}</p>
          {response.music && <audio controls src={response.music} style={{ marginTop: '1rem', width: '100%' }} />}
        </div>
      )}
    </main>
  );
}

export default App;
    