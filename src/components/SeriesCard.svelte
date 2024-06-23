<script>
    export let name;
    export let year;
    export let posterPath;
    export let id;

    $: if (year) {
        year = year.split('-')[0];
    }
</script>

<li>
    <a href={`/series/${id}`}>
        <img src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={name} />
        <h3>{name}</h3>
        <p>{year}</p>
    </a>
</li>

<style>
    li {
        list-style: none;
    }
    
    a {
        text-decoration: none;
        color: black;
    }
    a:hover {
        text-decoration: underline;
    }

</style>