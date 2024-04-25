const Keys = {
  DEFAULT_API: import.meta.env.VITE_PUBLIC_DEFAULT_API as string,
  REDIRECT_TO:
    import.meta.env.VITE_REDIRECT_TO || 'skdlkss89292Yuiwe',
  USER_INFO: import.meta.env.VITE_USER_INFO || '839389kdlskioi&223',
  REACT_APP_ACCESS_TOKEN:
    import.meta.env.VITE_REACT_APP_ACCESS_TOKEN ||
    '2389KLLklioie23893&',
};

export const BASE_AUDIO_URL = Keys.DEFAULT_API?.replace(
  'api/v1',
  'uploads',
);

export default Keys;
