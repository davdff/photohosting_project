const body = document.querySelector('body');
const bigPictureSection = document.querySelector('.big-picture');
const uploadPhotoOverlay = document.querySelector('.img-upload__overlay');
const btnUpload = document.getElementById('upload-file');


export function closePhoto(e) {
    if ((e.key === `Escape` && document.activeElement === document.querySelector('.text__description')) ||
        (e.key === `Escape` && document.activeElement === document.querySelector('.text__hashtags'))) {
        e.preventDefault();
    } else if (e.key === `Escape` || e.target.type === "reset") {
        bigPictureSection.classList.add("hidden");
        uploadPhotoOverlay.classList.add("hidden");
        body.classList.remove("modal-open");
        resetInput();
    }
}

function resetInput() {
    btnUpload.value = '';
}