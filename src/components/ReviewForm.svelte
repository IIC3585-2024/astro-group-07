<script>
    import SeriesSearch from "./SeriesSearch.svelte";
    import { addComment } from "../lib/db/series.js"
    import '../styles/global.css';

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
            ).then(() => {
                window.location.href = '/';
            })
        } catch (error) {
            console.log(error)
        }

    }
    
</script>

<main class="align-left">
    <h1>Add a Review</h1>

    <form on:submit={submitForm}>
        <SeriesSearch setSeries={setSeries}/>
        <label for="stars">
            Rating
            <input class="input-text-field" id="stars" name="stars" type="number" min="1" max="10" />
        </label>
        <textarea class="input-text-field textarea" id="review" name="review" placeholder="What are your thoughts about the series?"></textarea>
        <button class="btn" type="submit">Submit</button>
    </form>
</main>
<style>
    main {
        width: 80vw;
        margin: 0 10vw;
        margin-top: 80px;
    }

    h1 {
        margin-bottom: 1rem;
    }

    .align-left {
        text-align: left;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    label {
        font-weight: bold;
    }

    .textarea {
        width: 80vw;
        min-height: 4rem;
    }
</style>