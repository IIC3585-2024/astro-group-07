<script>
    export let name;
    export let posterPath;
    export let id;
    export let genres;

    const split_genres = genres.split(', ');

</script>
<div class="series-card">
    <a href={`/series/${id}`}>
        {#if posterPath}
            <img class="cover" src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={name} />
        {:else}
            <h4 class="cover missing-cover">Cover Not Found</h4>
        {/if}
        <h3 class="margin-5">{name}</h3>
        <div>
            {#each split_genres as genre}
                <p class="genre">{genre}</p>
            {/each}
        </div>
    </a>
</div>

<style>
    .series-card {
    background-color: #2f2f2f;
    border-radius: 5px;
    color: #fff;
    padding: 10px;
    margin: 10px;
    width: 16rem;
    text-align: center;
    text-wrap: wrap;
    height: auto;
}

.series-card:hover {
    cursor: pointer;
}

.cover {
    width: 100%;
    height: auto;
    object-fit: cover;
}

.missing-cover {
    background-color: #131313;
    height: 22rem;
    align-content: center;
    color: #ffffff6d;
}

</style>