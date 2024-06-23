<script>
    import { onMount } from 'svelte';
    import Review from './Review.svelte';

    export let serieId

    let reviews = []

    onMount(() => {
        console.log(serieId)
        // TODO: fetch reviews for the serieId
    })
</script>

<ul>
    {#each reviews as review, index}
        <Review 
            review={review}
            key={index}
        />
    {/each}
</ul>