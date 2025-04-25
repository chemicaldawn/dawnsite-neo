<script lang="ts">
    import AlbumComponent from "./album.svelte";
    import { Album } from "../../types"
    import { onMount } from "svelte";
    import { OutputFileType } from "typescript";
    
    let { albums, genres, vibes } : {albums: Album[], genres: string[], vibes: string[]} = $props()

    let selectedGenres = $state(new Set<string>());
    let selectedVibes = $state(new Set<string>());

    let albumList : Album[] = $state([])

    function filterAlbumList(genres : Set<string>, vibes : Set<string>) : void {
        albumList = []
        albums.forEach(album => {
            let flag = true;

            genres.forEach((genre) => {
                if (!album.genres.has(genre)) {
                    flag=false;
                    return;
                }
            })
            vibes.forEach((vibe) => {
                if (!album.vibes.has(vibe)) {
                    flag=false;
                    return;
                }
            })

            if (flag) { albumList.push(album)}
        })
    }

    function genreToggle(event: MouseEvent, genre : string) {
        const target : HTMLButtonElement = event.target as HTMLButtonElement;

        setToggle(selectedGenres, genre)

        if (selectedGenres.has(genre)) {
            target.classList.add("selected")
        } else {
            target.classList.remove("selected")
        }

        filterAlbumList(selectedGenres, selectedVibes)

    }

    function vibeToggle(event: MouseEvent, vibe : string) {
        const target : HTMLButtonElement = event.target as HTMLButtonElement;

        setToggle(selectedVibes, vibe)

        console.log(target)
        if (selectedVibes.has(vibe)) {
            target.classList.add("selected")
        } else {
            target.classList.remove("selected")
        }

        filterAlbumList(selectedGenres, selectedVibes)
    }

    function setToggle(set : Set<string>, item : string) {
        if (set.has(item)) {
            set.delete(item)
        } else {
            set.add(item)
        }
    }

    onMount(() => {
        filterAlbumList(selectedGenres, selectedVibes)
    })
</script>

<p>Welcome to my music shelf! If you want cool music recommendations, this is the place! Use the filters below to sort through my collection.</p>
<div id="filters">
    <div id="genre">
        <p>I'm in the mood for...</p>
        <div id="filter-collection">
            {#each genres as genre}
                <button onclick={(event) => {genreToggle(event, genre)}} class="filter">{genre}</button>
            {/each}
        </div>
    </div>
    <div id="vibe">
        <p>I want to feel a little...</p>
        <div id="filter-collection">
            {#each vibes as vibe}
                <button onclick={(event) => {vibeToggle(event, vibe)}} class="filter">{vibe}</button>
            {/each}
        </div>
    </div>
</div>
<div id="albums">
    {#each albumList as album}
        <AlbumComponent album={album} />
    {/each}
</div>

<style>
    #filters {
        display: flex;
        flex-direction: row;

        div {
            flex-grow: 1;
            font-weight: 700;
        }
    }

    #filter-collection {
        display: flex;
        flex-direction: row;
        gap: 4px;
    }

    #albums {
        margin-top: 1rem;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        
        gap: 2%;
    }

    button.filter {
        color: white;
        font-family: 'Ubuntu Mono', monospace;
        padding: 4px;

        background-color: #25211f;

        border-radius: 0;
        border: 0.5px solid white;

        transition: background-color 75ms ease-out, color 75ms ease-out;
    }
    
    button.filter:hover {
        color: #25211f;
        background-color: rgb(196, 190, 172);
    }

    :global(button.filter.selected) {
        color: #25211f !important;
        background-color: white !important;
    }
</style>