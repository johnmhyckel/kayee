import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gnnhjctlpquptmanzhhs.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_cFYL8eoLpY7qxyFQcCo5ng_htFzXaOg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Bucket names ─────────────────────────────────────────────────────────────
const PHOTOS_BUCKET = 'photos';
const VIDEOS_BUCKET = 'videos';

// ── Photos ───────────────────────────────────────────────────────────────────

/** Returns an array of { id, url, name } for every file in the photos bucket */
export async function fetchPhotos() {
  const { data, error } = await supabase.storage.from(PHOTOS_BUCKET).list('', {
    sortBy: { column: 'created_at', order: 'asc' },
  });
  if (error) throw error;

  return data.map((file) => {
    const { data: urlData } = supabase.storage
      .from(PHOTOS_BUCKET)
      .getPublicUrl(file.name);
    return { id: file.name, url: urlData.publicUrl, name: file.name };
  });
}

/** Uploads a File/Blob to the photos bucket. Returns { id, url, name }. */
export async function uploadPhoto(file) {
  const ext = file.name.split('.').pop();
  const id = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage
    .from(PHOTOS_BUCKET)
    .upload(id, file, { contentType: file.type, upsert: false });
  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from(PHOTOS_BUCKET)
    .getPublicUrl(id);
  return { id, url: urlData.publicUrl, name: file.name };
}

/** Deletes a photo by its storage id (the filename). */
export async function removePhoto(id) {
  const { error } = await supabase.storage.from(PHOTOS_BUCKET).remove([id]);
  if (error) throw error;
}

// ── Videos ───────────────────────────────────────────────────────────────────

/** Returns an array of { id, url, name } for every file in the videos bucket */
export async function fetchVideos() {
  const { data, error } = await supabase.storage.from(VIDEOS_BUCKET).list('', {
    sortBy: { column: 'created_at', order: 'asc' },
  });
  if (error) throw error;

  return data.map((file) => {
    const { data: urlData } = supabase.storage
      .from(VIDEOS_BUCKET)
      .getPublicUrl(file.name);
    return { id: file.name, url: urlData.publicUrl, name: file.name };
  });
}

/** Uploads a File/Blob to the videos bucket. Returns { id, url, name }. */
export async function uploadVideo(file) {
  const ext = file.name.split('.').pop();
  const id = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage
    .from(VIDEOS_BUCKET)
    .upload(id, file, { contentType: file.type, upsert: false });
  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from(VIDEOS_BUCKET)
    .getPublicUrl(id);
  return { id, url: urlData.publicUrl, name: file.name };
}

/** Deletes a video by its storage id (the filename). */
export async function removeVideo(id) {
  const { error } = await supabase.storage.from(VIDEOS_BUCKET).remove([id]);
  if (error) throw error;
}
