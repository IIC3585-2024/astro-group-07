<script>
    import getSeriesByName from '../lib/getSeriesByName'
    
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
    
</script>

<div>
    <input type="text" bind:value={search} placeholder="Search for a series" />
    <button on:click={searchSeries}>Search</button>
    <ul>
        {#each series as serie}
            <li><a href={`/series/${serie.id}`}>{serie.name}</a></li>
        {/each}
    </ul>
</div>