<script lang="ts">
    import jQuery from "jquery";

    import { navigateTo } from "../navigation";

    import { onMount } from "svelte";
    import type { MouseEventHandler } from "svelte/elements";

    let { page, nav_items }: { page: string, nav_items: string[] } = $props()
    
    nav_items.sort((a :string, b: string) => {
        if (a == "home") {
            return -1
        } else if (b == "home") {
            return 1
        }

        return a.localeCompare(b)
    })
    let navitems : HTMLDivElement;
    
    let selected : HTMLButtonElement | undefined = $state();
    let selectedText = $derived(selected ? selected.innerHTML : "")
    let arrow_pos = $derived(selected ? (selected.getBoundingClientRect().y - navitems!.getBoundingClientRect().y) : 0)

    function select(event : MouseEvent) {
        selected = event.target as HTMLButtonElement;
        arrow_pos = selected.getBoundingClientRect().y - navitems.getBoundingClientRect().y

        navigateTo(selectedText,"")
    }

    onMount(() => {
        console.log(page)
        selected = navitems.querySelector<HTMLButtonElement>(`button#page-${page}`)!

        window.addEventListener("popstate", (event) => {
            selected = document.querySelector<HTMLButtonElement>("#page-" + event.state.basePath)!
        })
    })
</script>

<div id="side-navigation">
    <div id="selector">
        <p style="transform: translateY({arrow_pos}px)" id="selector-arrow">></p>
    </div>
    <div id="tree-trunk"></div>
    <div bind:this={navitems} id="nav-items">
        {#each nav_items as nav_item}
            <div class="nav-item">
                <div class="tree-branch"></div>
                <button id="page-{nav_item}" onclick={select} class={nav_item == selectedText ? "nav-button selected" : "nav-button"}>
                    {nav_item}
                </button>
            </div>
        {/each}
    </div>
</div>