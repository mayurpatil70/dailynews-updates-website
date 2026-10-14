/**
 * Media Upload Service for TheNewsAdda
 * Uploads images and videos via Multer backend (http://localhost:5000/api/upload)
 * with automatic fallback to local Data URL preview if backend is offline.
 */

export const uploadMediaFile = async (file) => {
  const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|mkv|mov)$/i.test(file.name);
  const mediaType = isVideo ? 'video' : 'image';

  const formData = new FormData();
  formData.append('media', file);

  try {
    const response = await fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        url: data.url,
        mediaType: data.mediaType || mediaType,
        filename: data.filename,
        source: 'multer-server'
      };
    }
  } catch (err) {
    console.warn('Multer server offline or unreachable, using local fallback:', err);
  }

  // Fallback: Read file as Data URL locally so admin can immediately publish
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({
        success: true,
        url: reader.result,
        mediaType: mediaType,
        filename: file.name,
        source: 'local-file'
      });
    };
    reader.readAsDataURL(file);
  });
};
