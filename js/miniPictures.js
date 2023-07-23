import { userPhotos } from './main.js'
import { getRandomNumber } from './utils.js'
const picturesBlock = document.querySelector('.pictures')
const picturesTemplate = document.querySelector('#picture')
const filterButtons = document.querySelectorAll('.img-filters__button')
const allPhotosButton = document.getElementById('filter-default')
const randomPhotosButton = document.getElementById('filter-random')
const popularPhotosButton = document.getElementById('filter-discussed')
const documentFragment = document.createDocumentFragment()
const randomCommentsCount = {
    min: 0,
    max: 25
};
const debounceTime = 500;
let generatedComments = [];

export function checkActiveButton() {
    filterButtons.forEach(button => {
        if (button.classList.contains('img-filters__button--active')) {
            if (button === allPhotosButton) {
                showMiniPictures();
            } else if (button === randomPhotosButton) {
                showRandomPictures();
            } else if (button === popularPhotosButton) {
                showPopularPictures();
            }
        }
    });
}


function debounce(func, wait, immediate) {
    let timeout;

    return function executedFunction() {
        const context = this;
        const args = arguments;

        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
}
export const showMiniPictures = debounce(function () {
    clearPictures();
    generatedComments = [];

    userPhotos.forEach((photo) => {
        const commentsCount = getRandomNumber(
            randomCommentsCount.min,
            randomCommentsCount.max
        );
        generatedComments.push(commentsCount);

        const pictureClone = picturesTemplate.content.cloneNode(true);
        const image = pictureClone.querySelector('.picture__img');
        const likes = pictureClone.querySelector('.picture__likes');
        const comments = pictureClone.querySelector('.picture__comments');
        image.src = `${photo.url}`;
        likes.textContent = `${photo.likes}`;
        comments.textContent = commentsCount;
        image.dataset.id = photo.id;
        image.dataset.commentsCount = commentsCount;
        documentFragment.appendChild(pictureClone);
    });

    picturesBlock.appendChild(documentFragment);
}, debounceTime);


filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(b => {
            b.classList.remove('img-filters__button--active');
        })
        button.classList.add('img-filters__button--active');
        checkActiveButton()
    })
})

function clearPictures() {
    const elements = picturesBlock.querySelectorAll('a')
    const arrayOfElements = Array.from(elements)
    arrayOfElements.forEach(function (element) {
        element.parentNode.removeChild(element);
    });
}

const showRandomPictures = debounce(function () {
    clearPictures()
    const randomPhotos = getRandomPhotos(userPhotos, 10);
    const documentFragment = document.createDocumentFragment();

    randomPhotos.forEach((photo) => {
        const commentsCount = getRandomNumber(
            randomCommentsCount.min,
            randomCommentsCount.max
        );
        const pictureClone = picturesTemplate.content.cloneNode(true);
        const image = pictureClone.querySelector('.picture__img');
        const likes = pictureClone.querySelector('.picture__likes');
        const comments = pictureClone.querySelector('.picture__comments');
        image.src = `${photo.url}`;
        likes.textContent = `${photo.likes}`;
        comments.textContent = commentsCount;
        image.dataset.id = photo.id;
        image.dataset.commentsCount = commentsCount;
        documentFragment.appendChild(pictureClone);
    });

    picturesBlock.appendChild(documentFragment);
}, debounceTime)

const showPopularPictures = debounce(function () {
    clearPictures();
    const sortedPhotos = userPhotos.slice().sort((a, b) => {
        const indexA = userPhotos.indexOf(a);
        const indexB = userPhotos.indexOf(b);
        return generatedComments[indexB] - generatedComments[indexA];
    });

    sortedPhotos.forEach((photo) => {
        const commentsCount = generatedComments[userPhotos.indexOf(photo)];

        const pictureClone = picturesTemplate.content.cloneNode(true);
        const image = pictureClone.querySelector('.picture__img');
        const likes = pictureClone.querySelector('.picture__likes');
        const comments = pictureClone.querySelector('.picture__comments');
        image.src = `${photo.url}`;
        likes.textContent = `${photo.likes}`;
        comments.textContent = commentsCount;
        image.dataset.id = photo.id;
        image.dataset.commentsCount = commentsCount;
        documentFragment.appendChild(pictureClone);
    });

    picturesBlock.appendChild(documentFragment);
}, debounceTime);

function getRandomPhotos(photos, count) {
    const randomPhotos = [];
    const photoIndex = [];

    while (photoIndex.length < count) {
        const randomIndex = getRandomNumber(0, photos.length - 1);
        if (!photoIndex.includes(randomIndex)) {
            photoIndex.push(randomIndex);
            randomPhotos.push(photos[randomIndex]);
        }
    }
    return randomPhotos;
}
