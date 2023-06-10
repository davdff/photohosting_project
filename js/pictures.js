import { photos } from './main.js'
const picturesBlock = document.querySelector('.pictures')
const picturesTemplate = document.querySelector('#picture')
const documentFragment = document.createDocumentFragment()

photos.forEach((photo) => {
    const picture = picturesTemplate.content.cloneNode(true)
    const image = picture.querySelector('.picture__img');
    const likes = picture.querySelector('.picture__likes');
    const comments = picture.querySelector('.picture__comments');
    image.src = `${photo.url}`;
    likes.textContent = `${photo.likes}`;
    comments.textContent = `${photo.comments.length}`;
    documentFragment.appendChild(picture)
})

picturesBlock.appendChild(documentFragment)
