<script>
    import SeriesCard from './SeriesCard.svelte';
    import getSeriesByName from '../lib/getSeriesByName.js';

    let search = '';
    let results = [];
    let searchBy = 'series';
    let rating = null;
    let order = 'ascending';

    function searchReviews() {
        const getFunction = getFunctionBySearchBy();
        getFunction(search).then((data) => {
            results = data
        }).catch((error) => {
            console.log(error)
        })
    }

    function getFunctionBySearchBy() {
        switch (searchBy) {
            case 'series':
                return getSeriesByName;
            default:
                return getSeriesByName;
        }
    }
</script>

<div>
    <input type="text" bind:value={search} placeholder={`Search for a ${searchBy}`} />
    <select bind:value={searchBy}>
        <option value="series">Title</option>
        <option value="review">Review</option>
    </select>
    <input type="number" bind:value={rating} min="1" max="10" placeholder="Rating" />
    <select bind:value={order}>
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
    </select>
    <button on:click={searchReviews}>Search</button>
    <ul class:series={searchBy === 'series'}>
        {#each results as result}
            {#if searchBy === 'series'}
                <SeriesCard
                    id={result.id}
                    name={result.name}
                    posterPath={result.poster_path}
                />
            {:else if searchBy === 'review'}
                <li>
                    <a href={`/review/${result.id}`}>
                        <h3>{result.title}</h3>
                        <p>{result.content}</p>
                    </a>
                </li>
            {/if}
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