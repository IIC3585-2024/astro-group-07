<script>
    import { onMount } from 'svelte';
    import Review from './Review.svelte';
    import { fetchComments } from '../lib/db/series';

    export let serieId

    let reviews = []

    onMount(() => {
        fetchComments(serieId).then((data) => {
            reviews = data
            console.log(reviews)
        }).catch((error) => {
            console.error(error)
        })
    })
</script>

{#each reviews as review, index}
    <Review 
        review={review}
    />
{/each}
