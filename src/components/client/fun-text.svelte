<script>
    let { id, text } = $props()
</script>

<div class="fun-text">
    {#each [...text] as c}
    <div id={id} class="letter">{c}</div>
    {/each}
</div>