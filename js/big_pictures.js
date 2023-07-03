import { userPhotos } from './main.js'
import { userComments } from './main.js'

const bigPictureSection = document.querySelector('.big-picture')
const body = document.querySelector('body')
const picturesBlock = document.querySelector('.pictures')
const form = document.querySelector(".img-upload__form");
const commentInput = form.querySelector(".text__description");
const hashtagInput = form.querySelector(".text__hashtags");
const uploadPhotoOverlay = document.querySelector('.img-upload__overlay');
const uploadPhotoInput = document.getElementById('upload-file');

[bigPictureSection, uploadPhotoOverlay].forEach((el) => {
    el.addEventListener("click", closePhoto);
});

const listOfComment = bigPictureSection.querySelector(".social__comments");
const commentsLoadBtn = document.querySelector(".social__comments-loader");
const commentsShown = document.querySelector(".comments-shown");
const commentsCountSection = bigPictureSection.querySelector('.comments-count')
const commentsCountBlock = document.querySelector(".social__comment-count");
const maxShownComments = 5;


picturesBlock.addEventListener('click', openPhoto);

uploadPhotoInput.onchange = uploadPhoto;

document.addEventListener("keydown", closePhoto);


function closePhoto(e) {
    if ((e.key === `Escape` && document.activeElement === commentInput) ||
        (e.key === `Escape` && document.activeElement === hashtagInput)) {
        e.preventDefault()
    } else if (e.key === `Escape` || e.target.type === "reset") {
        bigPictureSection.classList.add("hidden");
        uploadPhotoOverlay.classList.add("hidden");
        body.classList.remove("modal-open");
        resetInput()
    }
}

function uploadPhoto() {
    uploadPhotoOverlay.classList.remove('hidden')
    body.classList.add("modal-open");
}

function openPhoto(e) {
    const id = +e.target.dataset.id
    const commentsCount = +e.target.dataset.commentsCount
    const photoInfo = userPhotos.find((e) => e.id === id);
    const bigPictureImg = bigPictureSection.querySelector('img')
    const bigPictureCountLikes = bigPictureSection.querySelector('.likes-count')

    const bigPictureDescr = bigPictureSection.querySelector('.social__caption')

    if (isNaN(id)) {
        return;
    } else {
        bigPictureSection.classList.remove('hidden')
        body.classList.add("modal-open");
    }

    bigPictureImg.src = photoInfo.url;
    bigPictureImg.alt = photoInfo.description;
    bigPictureDescr.textContent = photoInfo.description
    bigPictureCountLikes.textContent = photoInfo.likes
    getCommentsForLoad(commentsCount)
}

const userCommentsArray = userComments.slice()

function getCommentsForLoad(commentsCount) {
    if (commentsCount <= 0) {
        listOfComment.innerHTML = ``;
        commentsCountBlock.classList.add('hidden')
        commentsLoadBtn.classList.add('hidden')
    } else if (commentsCount <= 5) {
        const comments = userCommentsArray.slice(0, commentsCount);
        listOfComment.innerHTML = ``;
        commentsLoadBtn.classList.add('hidden');
        commentsShown.textContent = commentsCount;
        commentsCountSection.textContent = commentsCount;
        rendComment(comments)
    } else {
        const loadedComments = userCommentsArray.slice(0, maxShownComments);
        const remainingComments = userCommentsArray.slice(5, commentsCount)
        listOfComment.innerHTML = ``;
        commentsLoadBtn.classList.remove('hidden');
        commentsCountBlock.classList.remove('hidden')
        commentsShown.textContent = maxShownComments;
        commentsCountSection.textContent = commentsCount;
        rendComment(loadedComments)
        commentsLoadBtn.addEventListener('click', function () {
            loadRemainingComments(remainingComments, commentsCount)
        })
    }
}

function loadRemainingComments(remainingComments, commentsCount) {
    let commentsToLoad = remainingComments.splice(0, remainingComments.length >= maxShownComments ? maxShownComments : remainingComments.length);
    if (commentsCount - listOfComment.children.length <= 5) {
        commentsLoadBtn.classList.add('hidden')
        rendComment(commentsToLoad)
        commentsShown.textContent = listOfComment.children.length
    } else {
        commentsLoadBtn.classList.remove('hidden')
        rendComment(commentsToLoad)
        commentsShown.textContent = listOfComment.children.length

    }

}

function rendComment(array) {
    const documentFragment = document.createDocumentFragment();
    for (let i = 0; i < array.length; i++) {
        const comment = document.createElement("li");
        comment.className = "social__comment";
        comment.innerHTML = `
    <img
     class="social__picture"
     src=${array[i].avatar}
     alt=${array[i].name}
     width="35" height="35">
   <p class="social__text">${array[i].message}</p>
    `;
        documentFragment.appendChild(comment);
    }
    listOfComment.appendChild(documentFragment);
}



function resetInput() {
    uploadPhotoInput.value = ''
}
