import { useState, useRef, useEffect } from 'react';
import { getAllVideos, addVideo, deleteVideo } from '../../db';
import './Videos.css';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const inputRef = useRef(null);

  // Load persisted videos from IndexedDB on mount
  useEffect(() => {
    getAllVideos().then((records) => {
      const loaded = records.map((r) => ({
        id: r.id,
        url: URL.createObjectURL(r.blob),
        name: r.name,
      }));
      setVideos(loaded);
    });
  }, []);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    e.target.value = '';

    const newVideos = await Promise.all(
      files.map(async (file) => {
        const id = Date.now() + Math.random();
        const blob = file.slice(0, file.size, file.type); // copy as plain Blob
        await addVideo({ id, blob, name: file.name });
        return { id, url: URL.createObjectURL(blob), name: file.name };
      })
    );

    setVideos((prev) => [...prev, ...newVideos]);
  };

  const removeVideo = async (id) => {
    await deleteVideo(id);
    setVideos((prev) => {
      const removed = prev.find((v) => v.id === id);
      if (removed) URL.revokeObjectURL(removed.url);
      return prev.filter((v) => v.id !== id);
    });
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
