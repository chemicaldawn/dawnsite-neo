<script>
    let { id, text } = $props()
</script>

<div class="fun-text">
    {#each [...text] as c}
    <div id={id} class="letter">{c}</div>
    {/each}
</div>

<style>
    .fun-text {
        display: flex;
        flex-direction: row;

        cursor: default;
    }

    .letter {
        transform: translateY(0px);
        transition: transform 75ms ease-out;
        user-select: none;
    }

    .letter:hover {
        transform: translateY(-6px);
    }
</style>