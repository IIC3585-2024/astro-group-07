<script>
    import getSeriesByName from '../lib/getSeriesByName'
    import SeriesResult from './SeriesResult.svelte';
    
    let search = '';
    let series = [];

    function searchSeries() {
        console.log(search);
        getSeriesByName(search).then((data) => {
            series = data  
        }).catch((error) => {
            console.log(error)
        })
    }

    $: if (search.length > 2) {
        searchSeries()
    } else if (search.length === 0) {
        series = []
    }
    
</script>

<div>
    <input type="text" bind:value={search} placeholder="Search for a series" />
    <ul>
        {#each series as serie}
            <SeriesResult 
                id={serie.id}
                name={serie.name} 
                year={serie.first_air_date} 
                posterPath={serie.poster_path} 
            />
        {/each}
    </ul>
</div>

<style>
    ul {
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>