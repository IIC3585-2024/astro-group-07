<script>
    import SeriesCard from './SeriesCard.svelte';
    import getSeriesByName from '../lib/getSeriesByName.js';
    import Review from './Review.svelte';

    let search = '';
    let results = [];
    let searchBy = 'series';
    let rating = null;
    let order = 'ascending';

    function searchReviews() {
        const getFunction = getFunctionBySearchBy();
        getFunction(search).then((data) => {
            console.log(data)
            results = data
        }).catch((error) => {
            console.log(error)
        })
    }

    // TODO: Implement getReviewsByName to call the API
    function getReviewsByName(name) {
        return new Promise((resolve, reject) => {
            resolve([{
                username: 'Pedro',
                seriesName: 'Breaking Bad',
                rating: 10,
                content: 'This is a great series!'
            }])
        })
    }

    function getFunctionBySearchBy() {
        switch (searchBy) {
            case 'series':
                return getSeriesByName;

            case 'review':
                return getReviewsByName;
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
                    genres={result.genre_names}
                />
            {:else if searchBy === 'review'}
                <Review
                    review={result}
                />
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