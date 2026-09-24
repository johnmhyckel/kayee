import { openDB } from 'idb';

const DB_NAME = 'kaye-media';
const DB_VERSION = 1;

let dbPromise;

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('photos')) {
          db.createObjectStore('photos', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('videos')) {
          db.createObjectStore('videos', { keyPath: 'id' });
        }
      },
    });
  }
  return dbPromise;
}

// ── Photos ──────────────────────────────────────────────────────────────────

export async function getAllPhotos() {
  const db = await getDB();
  return db.getAll('photos');
}

export async function addPhoto(record) {
  // record: { id, blob, name }
  const db = await getDB();
  await db.put('photos', record);
}

export async function deletePhoto(id) {
  const db = await getDB();
  await db.delete('photos', id);
}

// ── Videos ──────────────────────────────────────────────────────────────────

export async function getAllVideos() {
  const db = await getDB();
  return db.getAll('videos');
}

export async function addVideo(record) {
  // record: { id, blob, name }
  const db = await getDB();
  await db.put('videos', record);
}

export async function deleteVideo(id) {
  const db = await getDB();
  await db.delete('videos', id);
}
