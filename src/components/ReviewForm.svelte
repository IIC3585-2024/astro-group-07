<script>
    import SeriesSearch from "./SeriesSearch.svelte";
    import { addComment } from "../lib/db/series.js"

    export let username
    export let email 

    let selectedSeries = null
    
    function setSeries(serie) {
        selectedSeries = serie
    }

    function submitForm(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            addComment(
                selectedSeries.id,
                formData.get("review"),
                formData.get("stars"),
                username,
                email
            );
        } catch (error) {
            console.log(error)
        }

        // window.location.href = '/';
    }
    
</script>

<form on:submit={submitForm}>
    <SeriesSearch setSeries={setSeries}/>
    <label for="stars">
        Rating
        <input id="stars" name="stars" type="number" min="1" max="10" />
    </label>
    <textarea id="review" name="review" placeholder="What are your thoughts about the series?"></textarea>
    <button type="submit">Submit</button>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    label {
        font-weight: bold;
    }

    input, textarea {
        padding: 0.5rem;
        border-radius: 0.25rem;
        border: 1px solid #ccc;
    }

    button {
        padding: 0.5rem;
        border-radius: 0.25rem;
        border: 1px solid #ccc;
        background-color: #007bff;
        color: white;
        cursor: pointer;
    }
</style>