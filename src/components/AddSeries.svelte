<script>
    import SeriesSearch from "./SeriesSearch.svelte";
    import { addSeries } from "../lib/db/series";

    let selectedSeries = null

    function submitForm(event) {
        event.preventDefault();
        addSeries(
            selectedSeries.id,
            selectedSeries.name,
            0,
            0,
            selectedSeries.genre_names,
            selectedSeries.poster_path
        ).then(() => {
            window.location.href = "/"
        })

    }

    function setSeries(serie) {
        selectedSeries = serie
    }
</script>

<form on:submit={submitForm}>
    <SeriesSearch setSeries={setSeries}/>
    <button type="submit">Add Series</button>
</form>