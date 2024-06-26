<script>
    import { onMount } from 'svelte';
    import SeriesCard from './SeriesCard.svelte';
    import { search } from '../lib/db/search.js';
    import getGenres from '../lib/getGenres.js';
    import getAllProviders from '../lib/getAllProviders.js';

    let searchText = '';
    let results = [];
    let searchBy = 'title';
    let rating = '';
    let order = 'asc';
    let genres = [];
    let providers = [];

    function searchReviews() {
        search(searchText, searchBy, rating, order).then((data) => {
            results = data;
        }).catch((error) => {
            console.error(error);
        });
    }

    function handleEnterSearch(event) {
        if (event.key === 'Enter') {
            searchReviews();
        }
    }

    onMount(async () => {
        genres = await getGenres();
        providers = await getAllProviders();
    });
</script>

<div>
    {#if searchBy === 'title'}
        <input 
            class="input-text-field margin-5" 
            type="text" bind:value={searchText} 
            placeholder={`Search for a ${searchBy}`}
            on:keydown={handleEnterSearch} 
        />
    {:else if searchBy === 'genre'}
        <select class="input-dropdown" bind:value={searchText}>
            <option value="" disabled selected>Select a genre</option>
            {#each genres as genre}
                <option value={genre.name}>{genre.name}</option>
            {/each}
        </select>
    {:else if searchBy === 'service'}
        <select class="input-dropdown" bind:value={searchText}>
            <option value="" disabled selected>Select a provider</option>
            {#each providers as provider}
                <option value={provider.provider_name}>{provider.provider_name}</option>
            {/each}
        </select>
    {/if}
    <select class="input-dropdown" bind:value={searchBy} on:input={() => searchText = ''}>
        <option value="title">Title</option>
        <option value="genre">Genre</option>
        <option value="service">Service</option>
    </select>
    <input class="input-text-field margin-5" type="number" bind:value={rating} min="1" max="10" placeholder="Rating" />
    <select class="input-dropdown" bind:value={order}>
        <option value="asc" selected>Ascending</option>
        <option value="desc">Descending</option>
    </select>
    <button class="btn" on:click={searchReviews}>Search</button>
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