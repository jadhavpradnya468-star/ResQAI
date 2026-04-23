import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/incidents')
      .then(res => setIncidents(res.data))
      .catch(err => console.log(err));
  }, []);

  const total    = incidents.length;
  const severe   = incidents.filter(i => i.severity === 'Severe').length;
  const mild     = incidents.filter(i => i.severity === 'Mild').length;

  const StatCard = ({ title, value, color, emoji }) => (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '25px',
      textAlign: 'center',
      flex: 1,
      borderTop: `4px solid ${color}`,
      boxShadow: '0 2px 15px rgba(0,0,0,0.08)'
    }}>
      <p style={{ fontSize: '35px' }}>{emoji}</p>
      <h2 style={{ fontSize: '36px', color, fontWeight: '800' }}>{value}</h2>
      <p style={{ color: '#888', fontSize: '13px' }}>{title}</p>
    </div>
  );

  return (
    <div className="container" style={{ paddingTop: '30px' }}>
      <h2 style={{ color: '#FF6B35', marginBottom: '20px' }}>
        📊 Rescue Dashboard
      </h2>

      {/* Stat Cards */}
      <div className="stat-cards" style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
        <StatCard title="Total Incidents" value={total}  color="#FF6B35" emoji="🐾" />
        <StatCard title="Severe Cases"    value={severe} color="#dc3545" emoji="🔴" />
        <StatCard title="Mild Cases"      value={mild}   color="#28a745" emoji="🟢" />
      </div>

      {/* Incident List */}
      <h3 style={{ marginBottom: '15px', color: '#2d3436' }}>
        📋 Recent Incidents
      </h3>
      {incidents.length === 0 ? (
        <p style={{ color: '#888', textAlign: 'center' }}>
          No incidents reported yet
        </p>
      ) : (
        incidents.map((inc, i) => (
          <div key={i} style={{
            background: 'white',
            borderRadius: '15px',
            padding: '15px 20px',
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
          }}>
            <div>
              <p style={{ fontWeight: '700', textTransform: 'capitalize' }}>
                🐾 {inc.animalType}
              </p>
              <p style={{ fontSize: '12px', color: '#888' }}>
                📍 {inc.location?.lat?.toFixed(2)}, {inc.location?.lng?.toFixed(2)}
              </p>
            </div>
            <span style={{
              padding: '5px 15px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '700',
              background: inc.severity === 'Severe'   ? '#f8d7da' :
                          inc.severity === 'Moderate' ? '#fff3cd' : '#d4edda',
              color:      inc.severity === 'Severe'   ? '#721c24' :
                          inc.severity === 'Moderate' ? '#856404' : '#155724'
            }}>
              {inc.severity}
            </span>
          </div>
        ))
      )}
    </div>
  );
}