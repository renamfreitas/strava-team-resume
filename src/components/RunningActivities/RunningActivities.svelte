<script>
  import { onMount } from 'svelte';
  import ActivityList from '$components/ActivityList/ActivityList.svelte';
  
  export let athleteId;
  let accessToken;
  let activities = [];

  const STRAVA_CLIENT_ID = import.meta.env.VITE_STRAVA_CLIENT_ID;
  const STRAVA_CLIENT_SECRET = import.meta.env.VITE_STRAVA_CLIENT_SECRET;
  const STRAVA_REDIRECT_URI = import.meta.env.VITE_STRAVA_REDIRECT_URI;

  const getAccessToken = async (code) => {
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
    accessToken = data.access_token;
    history.pushState({}, null, window.location.origin + window.location.pathname);
  }

  const getActivities = async () => {
    const response = await fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    activities = await response.json();
    console.log(activities);
  }

  onMount(async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      await getAccessToken(code);
      await getActivities();
    }
  });
</script>

<h3>Atividades de corrida:</h3>
{#if !accessToken}
  <a href={`https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${STRAVA_REDIRECT_URI}&approval_prompt=auto&scope=read_all,activity:read_all`}>Autorizar acesso</a>
{:else}
  <ActivityList activities={activities} type="Run" />
{/if}
