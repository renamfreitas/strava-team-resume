const STRAVA_CLIENT_ID = import.meta.env.VITE_STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = import.meta.env.VITE_STRAVA_CLIENT_SECRET;

export const getAccessToken = async (code) => {
  const response = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code'
    })
  });
  const data = await response.json();
  return data.access_token;
}

export const getActivities = async (accessToken) => {
  const response = await fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}&per_page=200`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const activities = await response.json();
  return activities;
}

export const authorizeLink = (redirectUri) => {
  return `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&approval_prompt=auto&scope=read_all,activity:read_all`
}