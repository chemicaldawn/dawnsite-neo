<script lang="ts">
    import { navigate } from "astro/virtual-modules/transitions-router.js";
    import { navigateTo } from "../../navigation";
    const { post } = $props()
</script>

<div onclick={() => {navigateTo("blog", post.id)}} class="blog-post">
    <div class="blog-post-header">
        <div class="blog-post-title">{ post.data.title }</div>
        <div class="blog-post-date">{ (post.data.date).toDateString() }</div>
    </div>
    <div>{ post.data.description }</div>
</div>