const userPhotos = await fetch("http://localhost:4001/photos")
    .then((response) => response.json())
    .then((json) => {
        return json;
    })
    .catch(() => alert("Ошибка при получении данных!"));

const userComments = await fetch("http://localhost:4001/comments")
    .then((response) => response.json())
    .then((json) => {
        return json;
    })
    .catch(() => alert("Ошибка при получении данных!"));

for (let i = 0; i < userPhotos.length; i++) {
    userPhotos[i].comments = userComments;
}

console.log(userPhotos)
export { userPhotos }
export { userComments } 