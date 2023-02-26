<script>
  import RunningActivities from '$components/RunningActivities/RunningActivities.svelte';

  const STRAVA_ATHLETE_ID = import.meta.env.STRAVA_ATHLETE_ID;

  const athleteId = STRAVA_ATHLETE_ID;
</script>
<RunningActivities {athleteId} />
