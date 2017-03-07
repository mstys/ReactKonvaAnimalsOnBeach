import { PATH } from './path';

// Images
export default function loadImages() {
    return new Promise((resolve, reject) => {

        let assets = {};

        Object.keys(PATH).map(path => {
            load(PATH[path]).then(img => {
                assets[path] = img;
            })
        });

        resolve(assets);
    })
}

function load(path) {
    return new Promise((resolve, reject) => {
        let image = {};

        image = new Image();
        image.src = path;
        image.onload = resolve(image);
        image.onerror = reject("Loading failed");
    })
}