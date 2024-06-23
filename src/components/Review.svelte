<script>
    export let review
</script>

<li>
    <h3>{review.username}</h3>
    <p>{review.rating}</p>
    <p>{review.content}</p>
</li>

<style>
    li {
        list-style-type: none;
    }
</style>