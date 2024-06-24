<script>
    export let name;
    export let posterPath;
    export let id;
    export let genres;

    const split_genres = genres.split(', ');

</script>

<li>
    <a href={`/series/${id}`}>
        <img src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={name} />
        <h3>{name}</h3>
        <div>
            {#each split_genres as genre}
                <p class="genre">{genre}</p>
            {/each}
        </div>
    </a>
</li>

<style>
    li {
        list-style-type: none;
        background-color: gray;
        margin: 1rem;
        width: 18rem;
        padding: 2rem 0;
        border-radius: 8px;
    }
    
    a {
        text-decoration: none;
        color: black;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h3 {
        margin: 0;
        color: white;
    }

    img {
        width: 12rem;
        height: auto;
    }

    .genre {
        background-color: #333333b1;
        color: white;
        padding: 0 0.5rem;
        border-radius: 5px;
        text-align: center;
    }

</style>