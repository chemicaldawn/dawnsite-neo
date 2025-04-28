<script>
    import { navigateTo } from "../../navigation";
    const { post } = $props()
</script>

<div class="blog-post-big">
    <div class="blog-post-big-info">
        <h1>{post.data.title}</h1>
        <h2>{post.data.description}</h2>
        <h3>{post.data.date.toDateString()}</h3>
    </div>
</div>