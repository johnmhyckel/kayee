import { useState, useRef, useEffect } from 'react';
import { getAllPhotos, addPhoto, deletePhoto } from '../../db';
import './Photos.css';

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const inputRef = useRef(null);

  // Load persisted photos from IndexedDB on mount
  useEffect(() => {
    getAllPhotos().then((records) => {
      const loaded = records.map((r) => ({
        id: r.id,
        url: URL.createObjectURL(r.blob),
        name: r.name,
      }));
      setPhotos(loaded);
    });
  }, []);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    e.target.value = '';

    const newPhotos = await Promise.all(
      files.map(async (file) => {
        const id = Date.now() + Math.random();
        const blob = file.slice(0, file.size, file.type); // copy as plain Blob
        await addPhoto({ id, blob, name: file.name });
        return { id, url: URL.createObjectURL(blob), name: file.name };
      })
    );

    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const removePhoto = async (id) => {
    await deletePhoto(id);
    setPhotos((prev) => {
      const removed = prev.find((p) => p.id === id);
      if (removed) URL.revokeObjectURL(removed.url);
      return prev.filter((p) => p.id !== id);
    });
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
