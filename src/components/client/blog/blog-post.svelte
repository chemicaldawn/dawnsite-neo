<script lang="ts">
    import { navigate } from "astro/virtual-modules/transitions-router.js";
    import { navigateTo } from "../../navigation";
    const { post } = $props()
</script>

<div onclick={() => {navigateTo("blog", post.id)}} class="blog-post">
    <div class="blog-post-info">
        <h1 class="blog-post-title">{ post.data.title }</h1>
        <h2>{ post.data.description }</h2>
        <h3 class="blog-post-date">{ (post.data.date).toDateString() }</h3>
    </div> 
</div>