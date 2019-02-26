// Урлы
const API =  "https://api.forismatic.com/api/1.0/?method=getQuote&key=random&format=jsonp&lang=ru&jsonp=?";
const shareTwitter = "https://twitter.com/intent/tweet?text=";
// Массив с цветами
const colorsArr = ["#14cc8d", "#1481cc", "#cc3114", "#bb14cc", "#14ccbb", "#5f14cc", "#cc8d14"];
// выборка элементов по ID
const article = document.getElementById('article');
const newArticleButton = document.getElementById("new");
const shareButton = document.getElementById('share');

// Получаем рандомный цвет для фона
function getRandomColor() {
  return colorsArr[Math.round(Math.random()*(6 - 0) + 0)];
}

// напишем функцию getData
function getData() {
  // отправили запрос
  axios.get(API).then(result => {
    // рузультат к тексту
    return result.data;
  }).then(value => {
    // получен формат JSONP то мы обрезаем строку с начала и до конца
    // вернули json
    return JSON.parse(value.slice(2, -1));
  }).then(json => {
    // производим операции с данными
    document.body.style.background = getRandomColor();
    article.innerHTML = `
      <p id="text">${json.quoteText}</p>
      ${json.quoteAuthor ? 
        `<p id="author">${json.quoteAuthor}</p>`
        : "" }
    `;

    // share actions
    shareButton.setAttribute('href',
      shareTwitter + json.quoteText
    );
  }).catch(err => {
    throw err;
  })
}

getData();

newArticleButton.addEventListener('click', () => {
  getData()
})
