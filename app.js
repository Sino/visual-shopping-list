require('dotenv').config();
const request = require('request-promise-native');
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
        let something = request({url: (urlWithKey + item), json: true});
        something.then(() => {
           getImage(something.response.body.results[0].urls.thumb);
        });
    });
}

function getImage(url) {
    if (process.env.TERM_PROGRAM === 'iTerm.app') {
        https.get(url, function(res, err) {
            if (res.statusCode === 200) {
                draw(res, function (err) {
                    if (err) { throw err; }
                });
            }
        });
    } else {
        console.log(image);
    }
}

getPicturesFromList(itemList);