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

var getPictureTemplate = function (card) {
  var pictureTemplateClone = document.querySelector('#picture-template').content.cloneNode(true);
  pictureTemplateClone.querySelector('img').setAttribute('src', card.url);
  pictureTemplateClone.querySelector('.picture-likes').textContent = card.likes;
  pictureTemplateClone.querySelector('.picture-comments').textContent = card.comments.length;
  return pictureTemplateClone;
};

var renderPictureTemplate = function () {
  var fragment = document.createDocumentFragment();
  var cards = getCardsArray();
  var pictureContainer = document.querySelector('.pictures');
  for (var i = 0; i < cards.length; i++) {
    fragment.appendChild(getPictureTemplate(cards[i]));
  }
  pictureContainer.appendChild(fragment);
};

var onPictureClick = function (event) {
  var target = event.target;
  while (target !== document.querySelector('.pictures')) {
    if (target.className === 'picture') {
      var galleryOverlay = document.querySelector('.gallery-overlay');
      galleryOverlay.classList.remove('hidden');
      galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', target.querySelector('img').getAttribute('src'));
      galleryOverlay.querySelector('.likes-count').textContent = target.querySelector('.picture-likes').textContent;
      galleryOverlay.querySelector('.comments-count').textContent = target.querySelector('.picture-comments').textContent;
    }
    target = target.parentNode;
  }
};

var onOverlayCloseClick = function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  galleryOverlay.classList.add('hidden');
};

document.querySelector('.pictures').addEventListener('click', onPictureClick);
document.querySelector('.gallery-overlay-close').addEventListener('click', onOverlayCloseClick);
document.querySelector('.gallery-overlay-close').addEventListener('click', onOverlayCloseClick);
renderPictureTemplate();
