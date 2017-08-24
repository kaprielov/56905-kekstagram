'use strict';

var pictures = [];
var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var commetnsIndividual = [];
var likesMax = 256;
var likesMin = 15;
var fragment = document.createDocumentFragment();
var pictureContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
var pictureTemplateClone;
var uploadOverlay = document.querySelector('.upload-overlay');
var galleryOverlay = document.querySelector('.gallery-overlay');

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

var commetnsGen = function () {
  commetnsIndividual = [];
  for (var i = 0; i <= getRandomArbitrary(0, 1); i++) {
    commetnsIndividual[i] = comments[getRandomArbitrary(0, comments.length - 1)];
  }
};

var getCards = function () {
  for (var i = 0; i <= 25; i++) {
    commetnsGen();
    pictures[i] = {'url': 'photos/' + (i + 1) + '.jpg', 'likes': getRandomArbitrary(likesMin, likesMax), 'comments': commetnsIndividual};
  }
};

var domFilling = function (i) {
  pictureTemplateClone = pictureTemplate.cloneNode(true);
  pictureTemplateClone.querySelector('img').setAttribute('src', pictures[i].url);
  pictureTemplateClone.querySelector('.picture-likes').insertAdjacentText('afterbegin', pictures[i].likes);
  pictureTemplateClone.querySelector('.picture-comments').insertAdjacentText('afterbegin', pictures[i].comments.length);
};

var domRender = function () {
  getCards();
  for (var i = 0; i <= 25; i++) {
    domFilling(i);
    fragment.appendChild(pictureTemplateClone);
  }
  pictureContainer.appendChild(fragment);
};

domRender();

var openOverlay = function () {
  uploadOverlay.classList.add('hidden');
  galleryOverlay.classList.remove('hidden');
  galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', pictures[0].url);
  galleryOverlay.querySelector('.likes-count').textContent = pictures[0].likes;
  galleryOverlay.querySelector('.comments-count').textContent = pictures[0].comments.length;
};

openOverlay();
