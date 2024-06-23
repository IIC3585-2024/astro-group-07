<script>
    import SeriesCard from './SeriesCard.svelte';
    import getSeriesByName from '../lib/getSeriesByName.js';

    let search = '';
    let results = [];
    let searchBy = 'series';

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
    <input type="text" bind:value={search} placeholder="Search for a series" />
    <button on:click={searchReviews}>Search</button>
    <ul>
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