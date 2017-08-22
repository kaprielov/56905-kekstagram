'use strict';

var pictures = [];
var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var likesMax = 256;
var likesMin = 15;
var fragment = document.createDocumentFragment();
var pictureContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

var uploadOverlay = document.querySelector('.upload-overlay');
var galleryOverlay = document.querySelector('.gallery-overlay');

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

var getCards = function () {
  for (var i = 0; i <= 25; i++) {
    pictures[i] = {'url': 'photos/' + (i + 1) + '.jpg', 'likes': getRandomArbitrary(likesMin, likesMax), 'comment': comments[getRandomArbitrary(0, comments.length - 1)]};
  }
}
var domGen = function () {
  for (var i = 0; i <= 25; i++) {
    var pictureTemplateClone = pictureTemplate.cloneNode(true);
    var pictureTemplateImg = pictureTemplateClone.querySelector('img');
    var pictureTemplateLikes = pictureTemplateClone.querySelector('.picture-likes');
    var pictureTemplateComments = pictureTemplateClone.querySelector('.picture-comments');
    pictureTemplateImg.setAttribute('src', pictures[i].url);
    pictureTemplateLikes.insertAdjacentText('afterbegin', pictures[i].likes);
    pictureTemplateComments.insertAdjacentText('afterbegin', pictures[i].comment);
    fragment.appendChild(pictureTemplateClone);
  }
}
getCards();
domGen();
pictureContainer.appendChild(fragment);
// uploadOverlay.classList.add('hidden');
//
// galleryOverlay.classList.remove('hidden');
// galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', pictures[0].url);
// galleryOverlay.querySelector('.likes-count').insertAdjacentText('afterbegin', pictures[1].likes);
// galleryOverlay.querySelector('.comments-count').insertAdjacentText('afterbegin', pictures[1].likes);
