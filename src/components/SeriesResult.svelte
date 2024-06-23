<script>
    export let name;
    export let year;
    export let posterPath;

    $: if (year) {
        year = year.split('-')[0];
    }
</script>

<li>
    <img class="cover" src={`https://image.tmdb.org/t/p/original/${posterPath}`} alt={`${name} cover`} />
    <div class="series-info">
        <h2>{name} <span id="year">({year})</span></h2>
    </div>
</li>

<style>
    li {
        list-style-type: none;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        border-radius: 0.3rem;
    }

    li:hover {
        background-color: #f0f0f0;
    }

    img {
        width: auto;
        height: 6rem;
    }

    .series-info {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-left: 1rem;
    }

    h2 {
        margin-top: 0.1rem;
    }

    .cover {
        border-radius: 0.3rem;
    }

    #year {
        color: gray;
    }
</style>