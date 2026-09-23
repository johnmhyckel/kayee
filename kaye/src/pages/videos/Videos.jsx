import { useState, useRef } from 'react';
import './Videos.css';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const inputRef = useRef(null);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const newVideos = files.map((file) => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setVideos((prev) => [...prev, ...newVideos]);
    e.target.value = '';
  };

  const removeVideo = (id) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <div className="videos-page">
      <div className="videos-header">
        <h1>Our Videos</h1>
        <p>Every laugh, every moment — saved just for us 🎥💕</p>
      </div>

      <div className="upload-area" onClick={() => inputRef.current.click()}>
        <span className="upload-icon">🎬</span>
        <span className="upload-label">Click to upload videos</span>
        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          multiple
          onChange={handleUpload}
          className="upload-input"
        />
      </div>

      {videos.length === 0 ? (
        <p className="videos-empty">No videos yet — upload some above! 💕</p>
      ) : (
        <div className="videos-grid">
          {videos.map((video) => (
            <div className="video-card" key={video.id}>
              <video
                src={video.url}
                controls
                className="video-player"
              />
              <div className="video-footer">
                <span className="video-name">{video.name}</span>
                <button
                  className="video-remove"
                  onClick={() => removeVideo(video.id)}
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
