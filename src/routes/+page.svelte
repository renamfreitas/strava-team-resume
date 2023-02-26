<script>
  import Strava from '$components/Strava/Strava.svelte';

  const STRAVA_ATHLETE_ID = import.meta.env.STRAVA_ATHLETE_ID;

  const athleteId = STRAVA_ATHLETE_ID;
</script>
<Strava {athleteId} />
