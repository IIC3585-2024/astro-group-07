<script>
    import { onMount } from 'svelte';
    import SeriesCard from './SeriesCard.svelte';
    import { search } from '../lib/db/search.js';
    import getGenres from '../lib/getGenres.js';

    let searchText = '';
    let results = [];
    let searchBy = 'title';
    let rating = '';
    let order = 'asc';
    let genres = [];

    function searchReviews() {
        search(searchText, searchBy, rating, order).then((data) => {
            results = data;
            console.log(results);
        }).catch((error) => {
            console.error(error);
        });
    }

    onMount(async () => {
        genres = await getGenres();
    });
</script>

<div>
    {#if searchBy === 'title'}
        <input type="text" bind:value={searchText} placeholder={`Search for a ${searchBy}`} />
    {:else if searchBy === 'genre'}
        <select bind:value={searchText}>
            <option value="" disabled selected>Select a genre</option>
            {#each genres as genre}
                <option value={genre.name}>{genre.name}</option>
            {/each}
        </select>
    {:else if searchBy === 'service'}
        <select bind:value={searchText}>
            <!-- TODO: Add services -->
            <option value="netflix">Netflix</option>
        </select>
    {/if}
    <select bind:value={searchBy} on:input={() => searchText = ''}>
        <option value="title">Title</option>
        <option value="genre">Genre</option>
        <option value="service">Service</option>
    </select>
    <input type="number" bind:value={rating} min="1" max="10" placeholder="Rating" />
    <select bind:value={order}>
        <option value="asc" selected>Ascending</option>
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