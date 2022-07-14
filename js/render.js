import {mocks} from './mock-data.js';
// Константы найденых элеметов разметки index.html:
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
// const bigPictureCommentCount = bigPicture.querySelector('.social__comment-count');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureCurrentCommentsCount = bigPicture.querySelector('.js-comments-current-count');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
const COMMENTS_PER_PAGE = 5;
let counterShowedComments = COMMENTS_PER_PAGE;

// Комментарии к изображению:
const bigPictureCommentsList = bigPicture.querySelector('.social__comments');

// Функция, заполняющая шаблон фотокарточки данными:
function getPictureCardTemplate(cardData) {
  const pictureCard = pictureTemplate.cloneNode(true);
  pictureCard.setAttribute('id', cardData.id);
  pictureCard.querySelector('.picture__img').src = cardData['url'];
  pictureCard.querySelector('.picture__likes').textContent = cardData['likes'];
  pictureCard.querySelector('.picture__comments').textContent = cardData.comments.length;
  return pictureCard;
}

// Ф-я создания комментария и его заполнения данными:
function createElementComment ({avatar, name, message}){
  const item = `<li class="social__comment">
    <img
    class="social__picture"
    src="${avatar}"
    src="${avatar}"
    alt="${name}"
    width="35" height="35">
    <p class="social__text">${message}</p>
  </li>`;
  return item;
}
// Ф-я создания cкрытого комментария и его заполнения данными:
// function createHiddenElementComment ({avatar, name, message}){
//   const item = `<li class="social__comment hidden">
//     <img
//     class="social__picture"
//     src="${avatar}"
//     src="${avatar}"
//     alt="${name}"
//     width="35" height="35">
//     <p class="social__text">${message}</p>
//   </li>`;
//   return item;
// }

// Ф-я отрисовки маленьких карточек:
export function renderPictures(mocksArr){
  for(let j = 0; j < mocksArr.length; j++){
    const pictureData = getPictureCardTemplate(mocksArr[j]);
    pictures.append(pictureData);
  }
  return pictures;
}
// Ф-я отрисовки одного комментария
function rederComment(dataComments, index){
  const {avatar, name, message} = dataComments[index];
  const newComment = createElementComment({avatar, name, message});
  bigPictureCommentsList.insertAdjacentHTML('afterbegin', newComment);
}
// Ф-я отрисовки большой картинки:
function showBigPicture(data) {
  document.querySelector('body').classList.toggle('modal-open');
  bigPicture.classList.toggle('hidden');
  bigPictureCommentsList.textContent = '';
  bigPictureImg.src =  data.url;
  bigPictureLikes.textContent = data.likes;
  bigPictureDescription.textContent = data.description;
  bigPictureCommentsCount.textContent = data.comments.length;

  // Цикл отрисовки первых 5-ти комментариев списка:
  for(let i = 0; i < COMMENTS_PER_PAGE; i++){
    rederComment(data.comments,i);
  }
  // Ф-я отрисовки оставшихся комментариев по 5 и условие скрытия кнопки догрузки
  function onCommentsLoader(){
    const tempComments = data.comments.slice(counterShowedComments, counterShowedComments + COMMENTS_PER_PAGE);
    counterShowedComments += COMMENTS_PER_PAGE;
    if(counterShowedComments >= data.comments.length){
      counterShowedComments = data.comments.length;
      bigPictureCommentsLoader.classList.add('hidden');
    }
    bigPictureCurrentCommentsCount.textContent = counterShowedComments;
    for(let i = 0; i < tempComments.length; i++){
      rederComment(data.comments,i);
    }
  }

  bigPictureClose.addEventListener('click', onCloseClick);
  bigPictureCommentsLoader.addEventListener('click',onCommentsLoader);
}

// Ф-я открытия большого изображения по клику на соотвествующее превью:
function onPicturesClick(evt){
  const currentPicture = evt.target.parentElement;
  if(currentPicture.classList.contains('picture')){
    const pictureData = mocks.find((el)=>+currentPicture.id === +el.id);
    showBigPicture(pictureData);
  }
}

pictures.addEventListener('click', onPicturesClick);

// Ф-я на закрытие большого фото:
function hiddenBigPicture(){
  document.querySelector('.big-picture').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  bigPictureCommentsLoader.classList.remove('hidden');
}

function onCloseClick(){
  hiddenBigPicture();
  bigPictureClose.removeEventListener('click', onCloseClick);
}

function onPicturesKeydown(evt) {
  if(evt.keyCode === 27){
    hiddenBigPicture();
  }
}
pictures.addEventListener('keydown', onPicturesKeydown);


