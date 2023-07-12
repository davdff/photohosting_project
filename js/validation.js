import { successMessage, errorMessage } from "./requestMessages.js";
const uploadForm = document.querySelector('.img-upload__form')
const hashtagInput = uploadForm.querySelector(".text__hashtags");
const maxQuantityOfHashtags = 5;
const maxQuantitySymbInHashtag = 20;
const validityMessage = {
    maxCountHashtags: 'Количество хештегов не должно быть больше 5',
    differentHashtags: 'Хештеги должны быть разными',
    maxLengthOfHashtag: 'Длина хештега не должна быть более 20 символов',
    onlyNumOrLetters: 'Введите только цифры или буквы',
    firstSymbolofHashtag: 'Первым символом Хештега должна быть #',
    notOnlyLattice: 'Хештег не может состоять только из #'
}

hashtagInput.addEventListener('input', (evt) => {
    const event = evt.target.value.toLowerCase();
    const arrayOfHashtags = event.split(' ');
    const hasDuplicates = arrayOfHashtags.some(
        (value, index) => arrayOfHashtags.indexOf(value) !== index
    );
    arrayOfHashtags.forEach(hashtag => {
        const validHashtag = /^[A-Za-z0-9#]+$/.test(hashtag);
        switch (true) {
            case hashtag.length > maxQuantitySymbInHashtag:
                hashtagInput.setCustomValidity(validityMessage.maxLengthOfHashtag)
                hashtagInput.reportValidity()
                break;
            case hashtag[0] !== '#':
                hashtagInput.setCustomValidity(validityMessage.firstSymbolofHashtag)
                hashtagInput.reportValidity()
                break;
            case !validHashtag:
                hashtagInput.setCustomValidity(validityMessage.onlyNumOrLetters)
                hashtagInput.reportValidity()
                break;
            case hasDuplicates:
                hashtagInput.setCustomValidity(validityMessage.differentHashtags);
                hashtagInput.reportValidity();
                break;
            case arrayOfHashtags.length > maxQuantityOfHashtags:
                hashtagInput.setCustomValidity(validityMessage.maxCountHashtags);
                hashtagInput.reportValidity();
                break
            case hashtag === "#":
                hashtagInput.setCustomValidity(validityMessage.notOnlyLattice);
                hashtagInput.reportValidity();
                break;
            default:
                hashtagInput.setCustomValidity("");
                hashtagInput.reportValidity();
                break;
        }
    })
})

const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:4001/upload", {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            if (response.ok) {
                successMessage();
                return response.text();
            } else {
                errorMessage();
                throw new Error("Request failed with status: " + response.status);
            }
        })
}

uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    uploadFile()
});