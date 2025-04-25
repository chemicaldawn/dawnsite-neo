<script lang="ts">
    import jQuery from "jquery";
    import { Album } from "../../types"
    import { navigateTo } from "../../navigation";
    let { album }: { album : Album } = $props()

    function travel(album : Album) {
        navigateTo("music-shelf",album.id)
    }
</script>

<button onclick={() => {travel(album)}} class="album">
    <img src={album.cover} alt="album cover for {album.name}"/>
    <div class="album-name">{album.name}</div>
    <div class="album-artist">by {album.artist}</div>
</button>

<style>
    .album {
        display: flex;
        flex-direction: column;

        width: 32%;
        box-sizing: border-box;
        
        font-family: 'Ubuntu Mono', monospace;
        text-align: left;

        border: 0.5px solid #fbf1c7;

        color: #fbf1c7;
        background-color: #25211f;
        padding: 1rem;

        cursor: pointer;
        transition: transform 100ms;

        img {
            width: 100%;
            margin-bottom: 0.5rem;
        }

        .album-name {
            font-weight: bold;
            font-size: 1rem;
        }

        .album-artist {
            margin-top: 4px;
            font-size: 0.75rem;
        }
    }

    .album:hover {
        transform: translateY(-7.5px) scale(1.025);
    }
</style>