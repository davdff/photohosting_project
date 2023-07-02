import { userPhotos } from './main.js'
const picturesBlock = document.querySelector('.pictures')
const picturesTemplate = document.querySelector('#picture')
const documentFragment = document.createDocumentFragment()

userPhotos.forEach((photo) => {
    const pictureClone = picturesTemplate.content.cloneNode(true)
    const image = pictureClone.querySelector('.picture__img');
    const likes = pictureClone.querySelector('.picture__likes');
    const comments = pictureClone.querySelector('.picture__comments');
    image.src = `${photo.url}`;
    likes.textContent = `${photo.likes}`;
    comments.textContent = `${photo.comments.length}`;
    image.dataset.id = photo.id;
    documentFragment.appendChild(pictureClone)
})

picturesBlock.appendChild(documentFragment)
