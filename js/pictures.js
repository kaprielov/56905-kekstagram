'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var LIKES_MAX = 256;
var LIKES_MIN = 15;
var NUMBER_OF_PHOTOS = 25;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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

var getGalleryOverlay = function (target) {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', target.querySelector('img').getAttribute('src'));
  galleryOverlay.querySelector('.likes-count').textContent = target.querySelector('.picture-likes').textContent;
  galleryOverlay.querySelector('.comments-count').textContent = target.querySelector('.picture-comments').textContent;
};

var openGalleryOverlay = function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  galleryOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onGalleryOverlayEsc);
  document.querySelector('.gallery-overlay-close').addEventListener('keydown', onOverlayCloseKeydown);
};

var closeGalleryOverlay = function () {
  document.querySelector('.gallery-overlay').classList.add('hidden');
  document.removeEventListener('keydown', onGalleryOverlayEsc);
  document.querySelector('.gallery-overlay-close').removeEventListener('keydown', onOverlayCloseKeydown);
};

var onGalleryOverlayEsc = function () {
  if (event.keyCode === ESC_KEYCODE) {
    closeGalleryOverlay();
  }
};

var onPictureClick = function (event) {
  var target = event.target;
  while (target.className !== 'pictures') {
    if (target.className === 'picture') {
      event.preventDefault();
      openGalleryOverlay();
      getGalleryOverlay(target);
    }
    target = target.parentNode;
  }
};


var onOverlayCloseKeydown = function () {
  if (event.keyCode === ENTER_KEYCODE) {
    closeGalleryOverlay();
  }
};

document.querySelector('.pictures').addEventListener('click', onPictureClick);
document.querySelector('.gallery-overlay-close').addEventListener('click', function () {
  closeGalleryOverlay();
});


renderPictureTemplate();
