const descrArray = ['Сидит важный', 'Это я отдыхаю, сейчас дома уже', 'Что-то', 'Пупупу']
const messagesArray = ['Все відмінно!', 'Загалом все непогано. Але не всі.', 'Коли ви робите фотографію, добре б прибирати палець із кадру. Зрештою, це просто непрофесійно.', 'Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.', 'Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.', 'Обличчя людей на фотці перекошені, ніби їх побивають. Як можна було зловити такий невдалий момент?']
const namesArray = ['Алексей', 'Елена', 'Иван', 'Мария', 'Николай', 'Ольга', 'Петр', 'София', 'Андрей', 'Анна']
function generateId(countId) {
    return parseFloat(countId + 1)
}

function generatePhoto(countPhoto) {
    return `./photos/${countPhoto + 1}`
}

function generateDescrAndMessage(arr) {
    const rand = Math.floor(Math.random() * arr.length);
    return arr[rand]
}
function generateLikes() {
    const minLikes = 15;
    const maxLikes = 200;
    return parseFloat((Math.random() * (maxLikes - minLikes) + minLikes).toFixed(0))
}


function createCommentId() {
    const generatedCommentsId = []
    const minId = 1;
    const maxId = 999;
    const randomId = parseFloat((Math.random() * (maxId - minId) + minId).toFixed(0));
    while (generatedCommentsId.includes(randomId)) {
        randomId = (Math.random() * (maxId - minId) + minId).toFixed(0);
    }
    generatedCommentsId.push(randomId);

    return randomId;
}

function generateAvatar() {
    const minNum = 1;
    const maxNum = 6;
    const randomNum = parseFloat(Math.floor((Math.random() * (maxNum - minNum + 1)) + minNum).toFixed(0))
    return `img/avatar-${randomNum}.svg`
}




function createComment() {
    return {
        id: createCommentId(),
        avatar: generateAvatar(),
        message: generateDescrAndMessage(messagesArray),
        name: generateDescrAndMessage(namesArray)
    }
}
const commentsArray = new Array(5).fill(null).map((el, i) => createComment())


function getObject(i) {
    return {
        id: generateId(i),
        url: generatePhoto(i),
        description: generateDescrAndMessage(descrArray),
        likes: generateLikes(),
        comments: commentsArray

    }
}
const objectArray = new Array(25).fill(null).map((el, i) => getObject(i))

