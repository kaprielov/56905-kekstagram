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
  var fragment = document.createDocumentFragment();
  var cards = window.data.getPreviewCards();
  var pictureContainer = document.querySelector('.pictures');
  for (var i = 0; i < cards.length; i++) {
    fragment.appendChild(getPictureTemplate(cards[i]));
  }
  pictureContainer.appendChild(fragment);
})();
