import React from 'react';

export default function ResultCard({ result }) {
  if (!result) return null;

  const config = {
    Mild:     { color: '#28a745', bg: '#d4edda', emoji: '🟢', msg: 'Monitor the animal closely' },
    Moderate: { color: '#856404', bg: '#fff3cd', emoji: '🟡', msg: 'Visit vet as soon as possible' },
    Severe:   { color: '#721c24', bg: '#f8d7da', emoji: '🔴', msg: 'Rush to vet IMMEDIATELY!' }
  };

  const style = config[result.severity] || config['Moderate'];

  return (
    <div style={{
      background: style.bg,
      border: `2px solid ${style.color}`,
      borderRadius: '20px',
      padding: '25px',
      marginBottom: '20px',
      textAlign: 'center'
    }}>
      <p style={{ fontSize: '50px', marginBottom: '5px' }}>
        {result.animal === 'dog'  ? '🐕' :
         result.animal === 'cat'  ? '🐈' :
         result.animal === 'cow'  ? '🐄' :
         result.animal === 'bird' ? '🐦' : '🐾'}
      </p>
      <h2 style={{ color: '#2d3436', marginBottom: '5px', textTransform: 'capitalize' }}>
        Animal: {result.animal}
      </h2>
      <div style={{
        display: 'inline-block',
        background: style.color,
        color: 'white',
        padding: '8px 20px',
        borderRadius: '20px',
        fontWeight: '700',
        fontSize: '16px',
        margin: '10px 0'
      }}>
        {style.emoji} {result.severity} Injury
      </div>
      <p style={{ color: style.color, fontWeight: '700', fontSize: '15px' }}>
        ⚠️ {style.msg}
      </p>
    </div>
  );
}