<script>
    import getSeriesByName from '../lib/getSeriesByName'
    import SeriesResult from './SeriesResult.svelte';

    export let setSeries;
    
    let search = '';
    let series = [];
    let areResultsVisible = false;

    function searchSeries() {
        getSeriesByName(search).then((data) => {
            series = data  
        }).catch((error) => {
            console.log(error)
        })
    }

    function selectSeries(serie) {
        search = serie.name
        areResultsVisible = false
        setSeries(serie)
    }

    $: if (search.length > 2) {
        searchSeries()
    } else if (search.length === 0) {
        series = []
    }
    
</script>

<fieldset>
    <input class="input-text-field" type="text" bind:value={search} placeholder="Search for a series" on:input={() => areResultsVisible = true} />
    {#if areResultsVisible}
        <ul>
            {#each series as serie}
            <button on:click={() => selectSeries(serie)}>
                <SeriesResult 
                    id={serie.id}
                    name={serie.name} 
                    year={serie.first_air_date} 
                    posterPath={serie.poster_path} 
                />
            </button>
            {/each}
        </ul>
    {/if}
</fieldset>

<style>
    ul {
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    fieldset {
        border: none;
        padding: 0;
    }
    button {
        border: none;
        background-color: transparent;
        cursor: pointer;
        padding: 0;
    }
</style>