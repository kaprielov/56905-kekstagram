'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var LIKES_MAX = 256;
var LIKES_MIN = 15;
var NUMBER_OF_PHOTOS = 25;

function getRandomValueFromRange(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

var getRandomComments = function (min, max) {
  var commetnsIndividual = [];
  for (var i = 0; i <= getRandomValueFromRange(min, max); i++) {
    commetnsIndividual.push(COMMENTS[getRandomValueFromRange(0, COMMENTS.length - 1)]);
  }
  return commetnsIndividual;
};

var genCard = function (i) {
  return {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomValueFromRange(LIKES_MAX, LIKES_MIN),
    comments: getRandomComments(0, 1),
  };
};

var getCardsArray = function () {
  var pictures = [];
  for (var i = 0; i <= NUMBER_OF_PHOTOS; i++) {
    pictures.push(genCard(i));
  }
  return pictures;
};

var getPictureTemplate = function (i) {
  var pictureTemplateClone = document.querySelector('#picture-template').content.cloneNode(true);
  pictureTemplateClone.querySelector('img').setAttribute('src', getCardsArray()[i].url);
  pictureTemplateClone.querySelector('.picture-likes').textContent = getCardsArray()[i].likes;
  pictureTemplateClone.querySelector('.picture-comments').textContent = getCardsArray()[i].comments.length;
  return pictureTemplateClone;
};

var renderPictureTemplate = function () {
  var pictureTemplate = document.createDocumentFragment();
  var pictureContainer = document.querySelector('.pictures');
  for (var i = 0; i <= NUMBER_OF_PHOTOS; i++) {
    pictureTemplate.appendChild(getPictureTemplate(i));
  }
  pictureContainer.appendChild(pictureTemplate);
};

var openOverlay = function () {
  var uploadOverlay = document.querySelector('.upload-overlay');
  uploadOverlay.classList.add('hidden');
  var galleryOverlay = document.querySelector('.gallery-overlay');
  galleryOverlay.classList.remove('hidden');
  galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', getCardsArray()[0].url);
  galleryOverlay.querySelector('.likes-count').textContent = getCardsArray()[0].likes;
  galleryOverlay.querySelector('.comments-count').textContent = getCardsArray()[0].comments.length;
};

// openOverlay();
renderPictureTemplate();
