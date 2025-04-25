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