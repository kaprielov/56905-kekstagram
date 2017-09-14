'use strict';
(function () {
  var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var LIKES_MAX = 256;
  var LIKES_MIN = 15;
  var NUMBER_OF_PHOTOS = 25;

// Отрисовка шаблона

  function getRandomValueFromRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

// возвращаем массив с индивидуальными комментариями

  var getRandomComments = function (min, max) {
    var commetnsIndividual = [];
    for (var i = 0; i <= getRandomValueFromRange(min, max); i++) {
      commetnsIndividual.push(COMMENTS[getRandomValueFromRange(0, COMMENTS.length - 1)]);
    }
    return commetnsIndividual;
  };

// возвращаем готовую карточку в виде словаря

  var genCard = function (i) {
    return {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomValueFromRange(LIKES_MAX, LIKES_MIN),
      comments: getRandomComments(0, 1),
    };
  };

  window.data = {
    // обращаемся к genCard и создаём массив карточек длинной в колличество фото
    getCardsimageNamesArray: function () {
      var pictures = [];
      for (var i = 0; i <= NUMBER_OF_PHOTOS; i++) {
        pictures.push(genCard(i));
      }
      return pictures;
    },
    // Возвращаем тимплейт с переданными данными
    getPictureTemplate: function (card) {
      var pictureTemplateClone = document.querySelector('#picture-template').content.cloneNode(true);
      pictureTemplateClone.querySelector('img').setAttribute('src', card.url);
      pictureTemplateClone.querySelector('.picture-likes').textContent = card.likes;
      pictureTemplateClone.querySelector('.picture-comments').textContent = card.comments.length;
      return pictureTemplateClone;
    }
  };
})();
