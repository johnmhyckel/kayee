import { useState, useRef, useEffect, useCallback } from 'react';
import { fetchPhotos, uploadPhoto, removePhoto } from '../../supabase';
import ConfirmDialog from '../../components/ConfirmDialog';
import './Photos.css';

// Individual photo card — fades in once the image has actually loaded
const PhotoCard = ({ photo, onView, onRemove }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`photo-card ${loaded ? 'photo-card--loaded' : ''}`}>
      {!loaded && <div className="photo-skeleton" />}
      <img
        src={photo.url}
        alt={photo.name}
        className="photo-img"
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onClick={() => onView(photo)}
        style={{ opacity: loaded ? 1 : 0 }}
      />
      <button
        className="photo-remove"
        onClick={() => onRemove(photo.id)}
        title="Remove"
      >
        ✕
      </button>
    </div>
  );
};

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const inputRef = useRef(null);

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

  const confirmRemove = useCallback((id) => setPendingDeleteId(id), []);
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

  // Skeleton grid shown while the list is still fetching from Supabase
  const skeletonCount = 6;

  return (
    <div className="photos-page">
      {pendingDeleteId !== null && (
        <ConfirmDialog
          message="Delete this photo? This can't be undone."
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}

      {lightbox && (
        <div className="lightbox-backdrop" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <img
            src={lightbox.url}
            alt={lightbox.name}
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
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
        // Skeleton placeholders so the page doesn't feel empty
        <div className="photos-grid">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <div className="photo-card" key={i}>
              <div className="photo-skeleton" />
            </div>
          ))}
        </div>
      ) : photos.length === 0 ? (
        <p className="photos-empty">No photos yet — upload some above! 🌸</p>
      ) : (
        <div className="photos-grid">
          {photos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              onView={setLightbox}
              onRemove={confirmRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Photos;
