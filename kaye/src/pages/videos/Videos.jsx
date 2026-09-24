import { useState, useRef, useEffect } from 'react';
import { fetchVideos, uploadVideo, removeVideo } from '../../supabase';
import './Videos.css';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  // Load all videos from Supabase on mount
  useEffect(() => {
    fetchVideos()
      .then(setVideos)
      .catch((err) => console.error('Failed to load videos:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    e.target.value = '';
    if (!files.length) return;

    setUploading(true);
    try {
      const uploaded = await Promise.all(files.map((f) => uploadVideo(f)));
      setVideos((prev) => [...prev, ...uploaded]);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeVideo(id);
      setVideos((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Could not delete video. Please try again.');
    }
  };

  return (
    <div className="videos-page">
      <div className="videos-header">
        <h1>Our Videos</h1>
        <p>Every laugh, every moment — saved just for us 🎥💕</p>
      </div>

      <div
        className={`upload-area ${uploading ? 'upload-area--busy' : ''}`}
        onClick={() => !uploading && inputRef.current.click()}
      >
        <span className="upload-icon">{uploading ? '⏳' : '🎬'}</span>
        <span className="upload-label">
          {uploading ? 'Uploading…' : 'Click to upload videos'}
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          multiple
          onChange={handleUpload}
          className="upload-input"
        />
      </div>

      {loading ? (
        <p className="videos-empty">Loading videos… 💕</p>
      ) : videos.length === 0 ? (
        <p className="videos-empty">No videos yet — upload some above! 💕</p>
      ) : (
        <div className="videos-grid">
          {videos.map((video) => (
            <div className="video-card" key={video.id}>
              <video src={video.url} controls className="video-player" />
              <div className="video-footer">
                <span className="video-name">{video.name}</span>
                <button
                  className="video-remove"
                  onClick={() => handleRemove(video.id)}
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Videos;
