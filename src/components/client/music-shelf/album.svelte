<script lang="ts">
    import jQuery from "jquery";
    import { Album } from "../../types"
    import { navigateTo } from "../../navigation";
    let { album }: { album : Album } = $props()

    function travel(album : Album) {
        navigateTo("music-shelf",album.id)
    }
</script>

<div class={ album.greenborder ? "album-border greenborder" : "album-border" }>
    <button onclick={() => {travel(album)}} class="album">
        <img src={album.cover} alt="album cover for {album.name}"/>
        <div class="album-name">{album.name}</div>
        <div class="album-artist">by {album.artist}</div>
    </button>
</div>
