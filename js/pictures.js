'use strict';

var pictures = [];
var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var likesMax = 256;
var likesMin = 15;
var pictureContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
var pictureTemplateImg = pictureTemplate.querySelector('img');
var pictureTemplateComments = pictureTemplate.querySelector('.picture-comments');
var pictureTemplateLikes = pictureTemplate.querySelector('.picture-likes');

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

for (var i = 1; i <= 25; i++) {
  pictures[i] = {'url': 'photos/' + (i + 1) + '.jpg', 'likes': getRandomArbitrary(likesMin, likesMax), 'comment': comments[getRandomArbitrary(0, comments.length - 1)]};
  var pictureTemplateClone = pictureTemplate.cloneNode(true);
  pictureTemplateImg.setAttribute('src', pictures[i].url);
  pictureContainer.appendChild(pictureTemplateClone);
}
