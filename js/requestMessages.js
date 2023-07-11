function successClose() {
    const successBlock = document.querySelector('.success');
    const body = document.querySelector('body');
    const uploadForm = document.querySelector('.img-upload__form');
    successBlock.remove();
    body.classList.remove("modal-open");
    uploadForm.reset();
    document.removeEventListener('keydown', handleKeyDown);
}

function errorClose() {
    const errorBlock = document.querySelector('.error');
    const body = document.querySelector('body');
    const uploadForm = document.querySelector('.img-upload__form');
    errorBlock.remove();
    body.classList.remove("modal-open");
    uploadForm.reset();
    document.removeEventListener('keydown', handleKeyDown);
}

function handleKeyDown(e) {
    if (e.key === 'Escape') {
        successClose();
        errorClose();
    }
}

export function successMessage() {
    const documentFragment = document.createDocumentFragment();
    const successTemplate = document.querySelector('#success');
    const body = document.querySelector(".body");
    const uploadPictureBlock = document.querySelector(".img-upload__overlay");
    uploadPictureBlock.classList.add("hidden");
    const successMessage = successTemplate.content.cloneNode(true);
    const successButton = successMessage.querySelector('.success__button');
    successButton.addEventListener('click', successClose);
    document.addEventListener('keydown', handleKeyDown);

    documentFragment.appendChild(successMessage);
    body.appendChild(documentFragment);
}


export function errorMessage() {
    const documentFragment = document.createDocumentFragment();
    const errorTemplate = document.querySelector("#error");
    const body = document.querySelector(".body");
    const uploadPictureBlock = document.querySelector(".img-upload__overlay");

    uploadPictureBlock.classList.add("hidden");

    const errorMessage = errorTemplate.content.cloneNode(true);
    const errorButton = errorMessage.querySelector('.error__button');
    errorButton.addEventListener('click', errorClose);
    document.addEventListener('keydown', handleKeyDown);

    documentFragment.appendChild(errorMessage);
    body.appendChild(documentFragment);
}
