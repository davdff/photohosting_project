const scaleValue = document.querySelector('.scale__control--value')
const imageBlock = document.querySelector(".img-upload__preview");
const scaleSmaller = document.querySelector('.scale__control--smaller')
const scaleBigger = document.querySelector('.scale__control--bigger')
const image = imageBlock.querySelector("img");
const effectsList = document.querySelector(".effects__list");
const slider = document.getElementById('slider')
const rangeScale = {
    min: 25,
    max: 100,
    step: 25
}
const effect = {
    chrome: {
        minValue: 0,
        maxValue: 1,
        step: 0.1
    },
    sepia: {
        minValue: 0,
        maxValue: 1,
        step: 0.1
    },
    marvin: {
        minValue: 0,
        maxValue: 100,
        step: 1
    },
    phobos: {
        minValue: 0,
        maxValue: 3,
        step: 0.1
    },
    heat: {
        minValue: 1,
        maxValue: 3,
        step: 0.1,
    }
}

function scale() {
    let value = parseInt(scaleValue.value);
    scaleSmaller.addEventListener('click', function () {
        if (value > rangeScale.min) {
            value -= rangeScale.step;
            scaleValue.value = value + "%";
            image.style.transform = `scale(${value / rangeScale.max})`;
        } else if (value === parseInt(rangeScale.min)) {
            return;
        }
    });
    scaleBigger.addEventListener('click', function () {
        if (value === parseInt(rangeScale.max)) {
            image.style.transform = `scale(1)`;
        } else {
            value += rangeScale.step;
            scaleValue.value = value + "%";
            image.style.transform = `scale(${value / rangeScale.max})`;
        }
    });
}


function chooseEffect(e) {
    switch (true) {
        case e.target.id === "effect-none":
            image.className = '';
            image.style.filter = '';
            createSlider(`remove`)
            break;
        case e.target.id === "effect-chrome":
            image.className = 'effects__preview--chrome';
            createSlider(`add`, effect.chrome);
            break;
        case e.target.id === "effect-sepia":
            image.className = 'effects__preview--sepia';
            createSlider(`add`, effect.sepia);
            break;
        case e.target.id === "effect-marvin":
            image.className = 'effects__preview--marvin';
            createSlider(`add`, effect.marvin);
            break;
        case e.target.id === "effect-phobos":
            image.className = 'effects__preview--phobos';
            createSlider(`add`, effect.phobos);
            break;
        case e.target.id === "effect-heat":
            image.className = 'effects__preview--heat';
            createSlider(`add`, effect.heat);
            break;


    }
}
export function photoEffects() {
    effectsList.addEventListener('click', chooseEffect)
    scale()
}
export function createSlider(action, effect) {
    if (action === "remove") {
        if (slider.noUiSlider) {
            slider.noUiSlider.destroy();
        }
    } else if (action === "add") {
        if (!slider.noUiSlider) {
            noUiSlider.create(slider, {
                start: effect.maxValue,
                range: {
                    min: effect.minValue,
                    max: effect.maxValue,
                },
                step: effect.step,
                connect: "lower"
            });
        } else {
            slider.noUiSlider.updateOptions({
                start: effect.maxValue,
                range: {
                    min: effect.minValue,
                    max: effect.maxValue,
                },
                step: effect.step,
                connect: "lower"
            });
        }
        slider.noUiSlider.on("update", function (values, handle) {
            const value = values[handle];
            imageWithEffect(value);
        });
    }
}

function imageWithEffect(value) {
    switch (true) {
        default:
            image.style.filter = ``
            break;
        case image.classList.contains("effects__preview--chrome"):
            image.style.filter = `grayscale(${value})`
            break;
        case image.classList.contains("effects__preview--sepia"):
            image.style.filter = `sepia(${value})`
            break;
        case image.classList.contains("effects__preview--marvin"):
            image.style.filter = `invert(${value}%)`
            break;
        case image.classList.contains("effects__preview--phobos"):
            image.style.filter = `blur(${value}px)`
            break;
        case image.classList.contains("effects__preview--heat"):
            image.style.filter = `brightness(${value})`
            break;
    }
}








