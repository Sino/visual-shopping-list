require('dotenv').config();
const request = require('request');
const draw = require('iterm2-image');
const https = require('https');
const argv = require('yargs').argv;

const url = 'https://api.unsplash.com/search/photos/';
const unsplashKey = process.env.API_ACCESS_KEY_UNSPLASH;
const keyStr = 'client_id=' + unsplashKey;
const itemList = argv._;
const urlWithKey = url + '?' + keyStr + '&query=';

function getPicturesFromList(list) {
    const images = [];
    list.forEach( (item) => {
        request({url: (urlWithKey + item), json: true}, (error, response) => {
            if (error) {
                console.log(error);
            } else {
                images.push(response.body.results[0].urls.thumb);
            }
        });
    });
    return images;
}

const images = getPicturesFromList(itemList);

setTimeout( () => {
    images.forEach((image) => {
        if (process.env.TERM_PROGRAM === 'iTerm.app') {
            https.get(image, function(res, err) {
                if (res.statusCode === 200) {
                    draw(res, function (err) {
                    if (err) { throw err; }
                    });
                }
            });
        } else {
            console.log(image);
        }
    });
},1000);