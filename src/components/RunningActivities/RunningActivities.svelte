<script>
  import { onMount } from 'svelte';
  import ActivityList from '$components/ActivityList/ActivityList.svelte';
  import { getAccessToken, getActivities, authorizeLink } from '$services/strava';

  export let athleteId;
  let accessToken;
  let activities = [];

  onMount(async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      accessToken = await getAccessToken(code);
      activities = await getActivities(accessToken);
      history.pushState({}, null, window.location.origin + window.location.pathname);
    }
  });
</script>

<h3>Atividades de corrida:</h3>
{#if !accessToken}
  <a href={authorizeLink('http://127.0.0.1:5173')}>Autorizar acesso</a>
{:else}
  <ActivityList activities={activities} type="Run" />
{/if}
