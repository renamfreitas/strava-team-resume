<script>
  import { onMount } from 'svelte';
  
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
<ol>
  <a href={`https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${STRAVA_REDIRECT_URI}&approval_prompt=auto&scope=read_all,activity:read_all`}>Autorizar acesso</a>
  {#each activities.filter(a => a.type === 'Run') as activity}
    <li>{activity.name} / {(activity.distance/1000).toFixed(2)}km</li>
  {/each}
</ol>

{#if activities.filter(a => a.type === 'Run').length > 0}
  <p>Total de corrida: {(activities.filter(a => a.type === 'Run').reduce((total, a) => total + a.distance, 0) / 1000).toFixed(2)}km</p>
{/if}
