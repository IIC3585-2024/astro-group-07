import { db } from "../firebase/config";
import getSeriesInfo from "../getSeriesInfo" 
import { collection, addDoc, getDocs, doc, updateDoc, query, where } from "firebase/firestore";
import getProvidersById from "../getProvidersById";

export const addSeries = async (seriesId, title, rating, rating_count, genres, poster_path) => {
    // separate genres to array
    const genreList = genres.split(", ");

    // search for providers by seriesId in API
    let providers = await getProvidersById(parseInt(seriesId));

    if (providers === null) {
        providers = [];
    }

    providers = providers.map(provider => provider.provider_name);

    await addDoc(collection(db, "series"), {
        seriesId: parseInt(seriesId),
        title,
        rating: parseFloat(rating),
        rating_count: parseInt(rating_count),
        genres: genreList,
        poster_path,
        providers
    });
}


export const fetchSeries = async (id) => {
    // fetch series by seriesId
    const seriesCollection = collection(db, "series");
    const q = query(seriesCollection, where("seriesId", "==", parseInt(id)));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => doc.data());
    // search api for series by id
    const apiData = await getSeriesInfo(id);
    const genreNames = apiData.genres.map((genre) => genre.name);

    if (data.length === 0) {
        await addSeries(id, apiData.name, 0, 0, genreNames.join(", "), apiData.poster_path);
        return {
            title: apiData.name,
            description: apiData.overview,
            rating: 0,
            rating_count: 0,
            genres: genreNames,
            poster_path: apiData.poster_path
        }
    }

    return {
        title: data[0].title,
        description: apiData.overview,
        rating: data[0].rating,
        rating_count: data[0].rating_count,
        genres: data[0].genres,
        poster_path: data[0].poster_path
    }
}

export const fetchComments = async (id) => {
    // fetch comments by seriesId
    const commentsCollection = collection(db, "comments");
    const q = query(commentsCollection, where("seriesId", "==", parseInt(id)));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => doc.data());
    return data;
}

export const addComment = async (id, comment, rating, username, email) => {
    await addDoc(collection(db, "comments"), {
        seriesId: parseInt(id),
        comment,
        rating: parseFloat(rating),
        username,
        email
    });

    // change rating of series
    const seriesCollection = collection(db, "series");
    const q = query(seriesCollection, where("seriesId", "==", parseInt(id)));
    const querySnapshot = await getDocs(q);
    const seriesData = querySnapshot.docs[0].data();
    const seriesRef = doc(seriesCollection, querySnapshot.docs[0].id);
    const newRating = (parseInt(seriesData.rating) * parseInt(seriesData.rating_count) + parseInt(rating)) / (seriesData.rating_count + 1);
    const newRatingCount = seriesData.rating_count + 1;
    await updateDoc(seriesRef, {
        rating: newRating,
        rating_count: newRatingCount
    });
}

