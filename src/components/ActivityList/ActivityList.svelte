<!-- ActivityList.svelte -->
<script>
  export let activities = [];
  export let type;
</script>

<ol>
  {#each activities.filter(a => a.type === type) as activity}
    <li>{activity.name} / {(activity.distance/1000).toFixed(2)}km</li>
  {/each}
</ol>
