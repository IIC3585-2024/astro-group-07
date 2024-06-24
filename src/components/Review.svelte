<script>
    export let review
</script>

<div class="comment-item">
    <div class="comment-content">
        <div class="comment-meta">
            <h3 class="comment-by">{review.username}</h3>
            <span class="comment-rating">
                {#each Array(Math.floor(review.rating)) as _, index}
                    <span class="star">&#9733;</span>
                {/each}
                {#each Array(10 - Math.floor(review.rating)) as _, index}
                    <span class="star">&#9734;</span>
                {/each}
            </span>
        </div>
        <p class="comment-text">{review.comment}</p>
    </div>
</div>

<style>
    .comment-item {
        margin-bottom: 20px;
        border-radius: 5px;
        padding: 10px;
        background-color: #2f2f2f;
        color: rgb(235, 235, 235);
    }

    .comment-text {
        margin-bottom: 8px;
    }

    .comment-meta {
        display: flex;
        justify-content: space-between;
        color: #888;
        margin-bottom: 0.5rem;
    }

    .comment-rating {
        color: #f5c518;
    }

    .comment-by {
        font-weight: 500;
    }
</style>