import React, { useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import ResultCard from '../components/ResultCard';
import MapView from '../components/MapView';
import Chatbot from '../components/Chatbot';

export default function Home() {
  const [result, setResult] = useState(null);

  return (
    <div className="container" style={{ paddingTop: '30px' }}>

      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#FF6B35' }}>
          🐾 ResQAI
        </h1>
        <p style={{ color: '#888', fontSize: '15px' }}>
          AI powered animal rescue — Upload photo, find vets, get first aid
        </p>
      </div>

      {/* Image Upload */}
      <ImageUpload setResult={setResult} />

      {/* Result */}
      <ResultCard result={result} />

      {/* Map */}
      <MapView />

      {/* Chatbot */}
      <Chatbot />

    </div>
  );
}