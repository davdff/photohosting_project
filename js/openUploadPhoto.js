import { photoEffects } from './slider.js'
import { createSlider } from './slider.js'

const body = document.querySelector('body')
const uploadPhotoOverlay = document.querySelector('.img-upload__overlay');
const imageContainer = document.querySelector(".img-upload__preview");
const uploadedImage = imageContainer.querySelector("img");
export let uploadedPhoto;

export function showUploadPhoto() {
    uploadPhotoOverlay.classList.remove('hidden')
    body.classList.add("modal-open");
    createSlider("remove")
    uploadedImage.className = "";
    uploadedImage.style.filter = ``;
    uploadedImage.style.transform = `scale(1)`;
    photoEffects()
}

export function uploadImage(e) {
    const file = e.target.files[0];
    uploadedPhoto = file;
    const reader = new FileReader();
    reader.onload = function (e) {
        uploadedImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
}