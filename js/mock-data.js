import {getRandomIntInclusive, getRandom} from './util.js';

// Число сгенерированных объектов:
const COUNT_FOTO_CARDS = 25;

const MESAGGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const AUTHORS = [
  'Вася Пупкин',
  'Дюша Метёлкин',
  'Иван Василич',
  'Товарищ Саахов',
  'Шурик',
  'Тапок Убийца'
];

// Ф-я создания массива-объекта коментариев:
function getComments () {
  const comment = [];
  for(let j = 1; j < getRandomIntInclusive(0, 6); j++) {
    comment.push({
      id: j,
      avatar: `img/avatar-${ j }.svg`,
      message: getRandom(MESAGGES),
      name: getRandom(AUTHORS),
    });
  }
  return comment;
}

// Ф-я создания объекта фотокарточки
function createCard(i) {
  return {
    id: i,
    url: `photos/${  i  }.jpg`,
    description: 'Какое то фото..',
    likes: getRandomIntInclusive(15, 200),
    comments: getComments(),
  };
}

// Создания массива из 25 объектов фотокарточки:
const mocks = function getMockPhotos(){
  const photoElements = [];
  for(let i = 1; i <= COUNT_FOTO_CARDS; i++){
    photoElements.push(createCard(i));
  }
  return photoElements;
};

export {mocks};
