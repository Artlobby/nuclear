import { getOption } from '../persistence/store';

const baseUrl = getOption('invidious.url');

export const trackSearch = async (query, currentStream) => {
  const response =  await fetch(`${baseUrl}/api/v1/search?q=${query}&sortBy=relevance&page=1`);
  if (!response.ok) {
    throw new Error('invidious search failed');
  }
  const result = await response.json();

  const track = currentStream
    ? result.find(({ videoId }) => currentStream.id !== videoId)
    : result[0];

  const trackInfo = await getTrackInfo(track.videoId);

  return trackInfo;
};

const getTrackInfo = async (videoId) => {
  const response = await fetch(`${baseUrl}/api/v1/videos/${videoId}`);
  if (!response.ok) {
    throw new Error('invidious track info failed');
  }

  return response.json();
};
