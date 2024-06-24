<script>
    export let review
</script>

<li>
    <h3>{review.username}</h3>
    <p>Rating: {review.rating}</p>
    <p>{review.comment}</p>
</li>

<style>
    li {
        list-style-type: none;
    }
</style>