<script lang="ts">
    import jQuery from "jquery";
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

        jQuery.get("/partials/" + selectedText, (data) => {
            document.getElementById("content")!.innerHTML = data
            history.pushState("", "", "/" + selectedText);
        })
        console.log(selectedText)
    }

    onMount(() => {
        console.log(page)
        selected = navitems.querySelector<HTMLButtonElement>(`button#page-${page}`)!
    })
</script>

<div id="navigation">
    <div id="selector">
        <p style="transform: translateY({arrow_pos}px)" id="selector-arrow">></p>
    </div>
    <div bind:this={navitems} id="nav-items">
        {#each nav_items as nav_item}
            <button id="page-{nav_item}" onclick={select} class={nav_item == selectedText ? "nav-item selected" : "nav-item"}>
                {nav_item}
            </button>
        {/each}
    </div>
</div>

<style>
    #navigation {
        display: flex;
        flex-direction: row;
        gap: 1rem;

        color: #a89984;

        #selector {
            flex-grow: 0;

            #selector-arrow { 
                margin: 0;

                transition: transform 75ms ease-out;
            }
        }

        #nav-items {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            gap: 4px;

            .nav-item {
                background: none;
                border: none;
                text-align: left;

                color: #6d5e50;

                font-family: "Ubuntu Mono", monospace;
                font-size: 1.3rem;

                transition: all 100ms;
            }

            .nav-item:hover {
                text-decoration: underline;
            }
            
            .nav-item.selected {
                font-weight: 700;

                margin-left: 4px;
                color: rgb(90, 74, 57);
            }
        }
    }
</style>