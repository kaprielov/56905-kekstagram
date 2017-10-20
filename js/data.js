'use strict';
// (function () {
// // Отрисовка шаблона
//
//   function getRandomValueFromRange(min, max) {
//     return Math.round(Math.random() * (max - min) + min);
//   }
//
// // возвращаем массив с индивидуальными комментариями
//
//   var getRandomComments = function (min, max) {
//     var commetnsIndividual = [];
//     for (var i = 0; i <= getRandomValueFromRange(min, max); i++) {
//       commetnsIndividual.push(window.CONSTANTS.COMMENTS[getRandomValueFromRange(0, window.CONSTANTS.COMMENTS.length - 1)]);
//     }
//     return commetnsIndividual;
//   };
//
// // возвращаем готовую карточку в виде словаря
//
//   var genCard = function (i) {
//     return {
//       url: 'photos/' + (i + 1) + '.jpg',
//       likes: getRandomValueFromRange(window.CONSTANTS.LIKES_MAX, window.CONSTANTS.LIKES_MIN),
//       comments: getRandomComments(0, 1),
//     };
//   };
//
//   window.data = {
//     // обращаемся к genCard и создаём массив карточек длинной в колличество фото
//     getPreviewCards: function () {
//       var pictures = [];
//       for (var i = 0; i <= window.CONSTANTS.NUMBER_OF_PHOTOS; i++) {
//         pictures.push(genCard(i));
//       }
//       return pictures;
//     },
//   };
// })();
