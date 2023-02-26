<script>
  import { onMount } from 'svelte';
  import ActivityList from '$components/ActivityList/ActivityList.svelte';
  import { getAccessToken, getActivities, authorizeLink } from '$services/strava';

  let accessToken;
  let activities = [];

  onMount(async () => {
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const code = params.get('code');
    if (code) {
      accessToken = await getAccessToken(code);
      activities = await getActivities(accessToken);
      if (typeof window !== 'undefined') {
        history.pushState({}, null, window.location.origin + window.location.pathname);
      }
    }
  });
</script>

<h3>Atividades de corrida:</h3>
{#if !accessToken}
  <a href={authorizeLink(typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '')}>Autorizar acesso</a>
{:else}
  <ActivityList activities={activities} type="Run" />
{/if}
