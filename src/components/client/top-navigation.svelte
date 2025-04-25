<script lang="ts">
    import { onMount } from "svelte";

    let path : string[] = $state([])

    onMount(() => {
        addEventListener("pushstate", () => {
            console.log("wow")
            path = ["yuh"]
        })
    })
</script>

<div id="top-navigation">
    <div id="squiggle">~/</div>
    <div id="basepath">{path[0]}</div>
</div>  

<style>
    #top-navigation {
        display: flex;
        flex-direction: row2;

        font-family: 'Ubuntu Mono', monospace;
        font-size: 1.15rem;
        padding: 8px;
        background-color: #312d2b;
        box-sizing: border-box;

        width: 100%;
    }
</style>