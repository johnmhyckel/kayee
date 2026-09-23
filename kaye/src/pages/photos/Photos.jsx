import { useState, useRef } from 'react';
import './Photos.css';

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const inputRef = useRef(null);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file) => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setPhotos((prev) => [...prev, ...newPhotos]);
    // reset so same file can be re-added
    e.target.value = '';
  };

  const removePhoto = (id) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="photos-page">
      <div className="photos-header">
        <h1>Our Photos</h1>
        <p>Every moment with you is a memory I treasure 💖</p>
      </div>

      <div className="upload-area" onClick={() => inputRef.current.click()}>
        <span className="upload-icon">📷</span>
        <span className="upload-label">Click to upload photos</span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleUpload}
          className="upload-input"
        />
      </div>

      {photos.length === 0 ? (
        <p className="photos-empty">No photos yet — upload some above! 🌸</p>
      ) : (
        <div className="photos-grid">
          {photos.map((photo) => (
            <div className="photo-card" key={photo.id}>
              <img src={photo.url} alt={photo.name} className="photo-img" />
              <button
                className="photo-remove"
                onClick={() => removePhoto(photo.id)}
                title="Remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Photos;
