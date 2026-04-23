import React, { useState } from 'react';
import axios from 'axios';

export default function ImageUpload({ setResult }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview
    setPreview(URL.createObjectURL(file));
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await axios.post('http://localhost:5000/api/analyze', formData);
      setResult(res.data);
    } catch (err) {
      alert('Error analyzing image. Make sure server is running!');
    }
    setLoading(false);
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '30px',
      textAlign: 'center',
      border: '2px dashed #FF6B35',
      marginBottom: '20px'
    }}>
      <p style={{ fontSize: '40px', marginBottom: '10px' }}>📷</p>
      <h3 style={{ color: '#FF6B35', marginBottom: '10px' }}>
        Upload Animal Photo
      </h3>
      <p style={{ color: '#888', fontSize: '13px', marginBottom: '15px' }}>
        Take or upload a photo of the injured animal
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        style={{ display: 'none' }}
        id="upload-input"
      />
      <label htmlFor="upload-input" style={{
        background: '#FF6B35',
        color: 'white',
        padding: '12px 30px',
        borderRadius: '25px',
        cursor: 'pointer',
        fontWeight: '700',
        fontSize: '15px'
      }}>
        Choose Photo
      </label>

      {preview && (
        <img src={preview} alt="preview"
          style={{
            width: '200px',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '15px',
            marginTop: '15px',
            display: 'block',
            margin: '15px auto 0'
          }}
        />
      )}

      {loading && (
        <p style={{ color: '#FF6B35', marginTop: '15px', fontWeight: '600' }}>
          🔍 Analyzing image with AI...
        </p>
      )}
    </div>
  );
}