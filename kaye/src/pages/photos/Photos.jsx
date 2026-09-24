import { useState, useRef, useEffect } from 'react';
import { fetchPhotos, uploadPhoto, removePhoto } from '../../supabase';
import ConfirmDialog from '../../components/ConfirmDialog';
import './Photos.css';

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const inputRef = useRef(null);

  // Load all photos from Supabase on mount
  useEffect(() => {
    fetchPhotos()
      .then(setPhotos)
      .catch((err) => console.error('Failed to load photos:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    e.target.value = '';
    if (!files.length) return;

    setUploading(true);
    try {
      const uploaded = await Promise.all(files.map((f) => uploadPhoto(f)));
      setPhotos((prev) => [...prev, ...uploaded]);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const confirmRemove = (id) => setPendingDeleteId(id);
  const handleCancelDelete = () => setPendingDeleteId(null);

  const handleConfirmDelete = async () => {
    const id = pendingDeleteId;
    setPendingDeleteId(null);
    try {
      await removePhoto(id);
      setPhotos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Could not delete photo. Please try again.');
    }
  };

  return (
    <div className="photos-page">
      {pendingDeleteId !== null && (
        <ConfirmDialog
          message="Delete this photo? This can't be undone."
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}

      <div className="photos-header">
        <h1>Our Photos</h1>
        <p>Every moment with you is a memory I treasure 💖</p>
      </div>

      <div
        className={`upload-area ${uploading ? 'upload-area--busy' : ''}`}
        onClick={() => !uploading && inputRef.current.click()}
      >
        <span className="upload-icon">{uploading ? '⏳' : '📷'}</span>
        <span className="upload-label">
          {uploading ? 'Uploading…' : 'Click to upload photos'}
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleUpload}
          className="upload-input"
        />
      </div>

      {loading ? (
        <p className="photos-empty">Loading photos… 🌸</p>
      ) : photos.length === 0 ? (
        <p className="photos-empty">No photos yet — upload some above! 🌸</p>
      ) : (
        <div className="photos-grid">
          {photos.map((photo) => (
            <div className="photo-card" key={photo.id}>
              <img src={photo.url} alt={photo.name} className="photo-img" />
              <button
                className="photo-remove"
                onClick={() => confirmRemove(photo.id)}
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
