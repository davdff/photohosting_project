import { photos } from './main.js'

const bigPictureSection = document.querySelector('.big-picture')
const body = document.querySelector('body')
const picturesBlock = document.querySelector('.pictures')

picturesBlock.addEventListener('click', openPhoto);


bigPictureSection.addEventListener("click", (e) => {
    closePhoto(e);
});

document.addEventListener("keydown", closePhoto);

function closePhoto(e) {
    if (e.key === `Escape` || e.target.type === "reset") {
        bigPictureSection.classList.add("hidden");
        body.classList.remove("modal-open");
    }
}

function openPhoto(e) {
    const id = +e.target.dataset.id
    const photoInfo = photos.find((e) => e.id === id);
    const bigPictureImg = bigPictureSection.querySelector('img')
    const bigPictureCountLikes = bigPictureSection.querySelector('.likes-count')
    const commentsCount = bigPictureSection.querySelector('.comments-count')
    const bigPictureDescr = bigPictureSection.querySelector('.social__caption')
    const commentsBlock = bigPictureSection.querySelector('.social__comment-count')
    if (isNaN(id)) {
        return;
    } else {
        bigPictureSection.classList.remove('hidden')
        body.classList.add("modal-open");
        commentsBlock.classList.add("hidden");
    }

    bigPictureImg.src = photoInfo.url;
    bigPictureImg.alt = photoInfo.description;
    bigPictureDescr.textContent = photoInfo.description
    bigPictureCountLikes.textContent = photoInfo.likes
    commentsCount.textContent = photoInfo.comments.length
    console.log(photoInfo.comments.length)
    rendCommentsBlock(photoInfo)

}

function rendCommentsBlock(photoInfo) {
    const listOfComment = bigPictureSection.querySelector(".social__comments");
    const documentFragment = document.createDocumentFragment();
    const comments = photoInfo.comments
    comments.forEach((el) => {
        const comment = document.createElement("li");
        comment.className = "social__comment";
        comment.innerHTML = `
    <img
     class="social__picture"
     src=${el.avatar}
     alt=${el.name}
     width="35" height="35">
   <p class="social__text">${el.message}</p>
    `;
        documentFragment.appendChild(comment);
    });
    listOfComment.appendChild(documentFragment);
}
