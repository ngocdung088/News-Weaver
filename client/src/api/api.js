import axios from 'axios';
import {
    Notification
} from 'element-ui';

import store from './../store';
import router from './../router/index';

const ERROR_MSG = 'Something happened. Please try again.';

function handleError(error, message) {
    if (error)
        if (error.response.status === 403) {
            Notification.warning({
                title: 'Authentication Error',
                message: 'You need to login to continue...'
            });

            store.commit('removeUser');
            router.push({
                path: '/'
            });
            return;
        }

    Notification.error({
        title: 'Error Occurred',
        message: message
    });
}

function displayMessage(message) {
    Notification.info({
        title: 'Info',
        message: message
    });
}


function loginUser(userData) {
    return axios.post(`${store.getters.getBaseURL}/auth/login`, userData)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            handleError(error, ERROR_MSG);
        });
}

function registerUser(userData) {
    return axios.post(`${store.getters.getBaseURL}/auth/register`, userData)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            handleError(error, ERROR_MSG);
        });
}

function getAllFeeds(indexCount) {
    let token = store.getters.getToken;
    let feedURL = `${store.getters.getBaseURL}` +
        `/user/all_feed_news?token=${token}&index=${indexCount}`;
    return axios.get(feedURL)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            handleError(error, ERROR_MSG);
        });
}

function getSpecificFeed(indexCount, hash) {
    let token = store.getters.getToken;
    let feedURL = `${store.getters.getBaseURL}` +
        `/user/feed_news?token=${token}&hash=${hash}&index=${indexCount}`;
    return axios.get(feedURL)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            handleError(error, ERROR_MSG);
        });
}

function addToFavourites(news) {
    let URL = news.URL;
    let category = news.category;
    let date = news.date;
    let description = news.description;
    let image = news.image;
    let summary = news.summary;
    let title = news.title;
    let hash = news.hash;

    let favouriteNews = {
        URL: URL,
        title: title,
        description: description,
        image: image,
        category: category,
        summary: summary,
        date: date,
        hash: hash
    };

    let token = store.getters.getToken;
    return axios.post(`${store.getters.getBaseURL}/user/save_favourite?token=${token}`, {
            feedNews: favouriteNews
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            handleError(error, ERROR_MSG);
        });
}

function getFavourites(indexCount) {
    let token = store.getters.getToken;
    return axios.get(`${store.getters.getBaseURL}` +
            `/user/favourites?token=${token}&index=${indexCount}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            handleError(error, ERROR_MSG);
        });
}

function deleteFavourite(hash, newsHash) {
    let token = store.getters.getToken;
    return axios.delete(`${store.getters.getBaseURL}` +
            `/user/delete_favourite?token=${token}&hash=${hash}&newsHash=${newsHash}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            handleError(error, ERROR_MSG);
        });
}

function saveEditedFavourite(favourite) {
    console.log(favourite);
    let token = store.getters.getToken;
    return axios.patch(`${store.getters.getBaseURL}/user/edit_favourite?token=${token}`, favourite)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            handleError(error, ERROR_MSG);
        });
}

function getAllFeedSources() {
    let token = store.getters.getToken;
    return axios.get(`${store.getters.getBaseURL}/user/all_feed_sources?token=${token}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            handleError(error, ERROR_MSG);
        });
}

function fetchFeedSource(feedURL) {
    let token = store.getters.getToken;
    return axios.get(`${store.getters.getBaseURL}/user/get_feed?url=${feedURL}&token=${token}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            handleError(error, ERROR_MSG);
        });
}

function saveFeedSource(feedObject) {
    let token = store.getters.getToken;
    return axios.post(`${store.getters.getBaseURL}/user/save_feed?token=${token}`, feedObject)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            handleError(error, ERROR_MSG);
        });
}

function deleteFeedSource(hash) {
    let token = store.getters.getToken;
    return axios.delete(`${store.getters.getBaseURL}/user/delete_feed?token=${token}&hash=${hash}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            handleError(error, ERROR_MSG);
        });
}

export {
    handleError,
    displayMessage,
    loginUser,
    registerUser,
    getAllFeeds,
    getSpecificFeed,
    addToFavourites,
    getFavourites,
    deleteFavourite,
    saveEditedFavourite,
    getAllFeedSources,
    fetchFeedSource,
    saveFeedSource,
    deleteFeedSource
};