'use strict';
// отрисовываем миниатюры
(function () {
  // Возвращаем тимплейт с переданными данными
  var getPictureTemplate = function (card) {
    var pictureTemplateClone = document.querySelector('#picture-template').content.cloneNode(true);
    pictureTemplateClone.querySelector('img').setAttribute('src', card.url);
    pictureTemplateClone.querySelector('.picture-likes').textContent = card.likes;
    pictureTemplateClone.querySelector('.picture-comments').textContent = card.comments.length;
    return pictureTemplateClone;
  };
  var pictureContainer = document.querySelector('.pictures');
  // если успех
  var onLoadHandler = function (cards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < cards.length; i++) {
      fragment.appendChild(getPictureTemplate(cards[i]));
    }
    pictureContainer.appendChild(fragment);
  };

  window.backend.load(onLoadHandler, window.error.backend);


})();
