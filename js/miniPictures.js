import { userPhotos } from './main.js'
const picturesBlock = document.querySelector('.pictures')
const picturesTemplate = document.querySelector('#picture')
const documentFragment = document.createDocumentFragment()
const randomCommentsCount = {
    min: 0,
    max: 25
};

userPhotos.forEach((photo) => {
    const commentsCount = getRandomNumber(
        randomCommentsCount.min,
        randomCommentsCount.max
    );
    const pictureClone = picturesTemplate.content.cloneNode(true)
    const image = pictureClone.querySelector('.picture__img');
    const likes = pictureClone.querySelector('.picture__likes');
    const comments = pictureClone.querySelector('.picture__comments');
    image.src = `${photo.url}`;
    likes.textContent = `${photo.likes}`;
    comments.textContent = commentsCount;
    image.dataset.id = photo.id;
    image.dataset.commentsCount = commentsCount;
    documentFragment.appendChild(pictureClone)
})

picturesBlock.appendChild(documentFragment)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}