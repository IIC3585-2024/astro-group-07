<script>
    import SeriesCard from './SeriesCard.svelte';
    import { search } from '../lib/db/search.js';
    import Review from './Review.svelte';

    let searchText = '';
    let results = [];
    let searchBy = 'title';
    let rating = '';
    let order = 'ascending';

    function searchReviews() {
        search(searchText, searchBy, rating, order).then((data) => {
            results = data;
            console.log(results);
        }).catch((error) => {
            console.error(error);
        });
    }
</script>

<div>
    <input type="text" bind:value={searchText} placeholder={`Search for a ${searchBy}`} />
    <select bind:value={searchBy}>
        <option value="title">Title</option>
        <option value="genre">Genre</option>
        <option value="service">Service</option>
    </select>
    <input type="number" bind:value={rating} min="1" max="10" placeholder="Rating" />
    <select bind:value={order}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
    </select>
    <button on:click={searchReviews}>Search</button>
    <ul class="series">
        {#each results as result}
            <SeriesCard
                id={result.id}
                name={result.title}
                posterPath={result.poster_path}
                genres={result.genres}
            />
        {/each}
    </ul>
</div>

<style>
    .series {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>