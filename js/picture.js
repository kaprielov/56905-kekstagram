'use strict';
// отрисовываем миниатюры
(function () {
  var fragment = document.createDocumentFragment();
  var cards = window.data.getCardsimageNamesArray();
  var pictureContainer = document.querySelector('.pictures');
  for (var i = 0; i < cards.length; i++) {
    fragment.appendChild(window.data.getPictureTemplate(cards[i]));
  }
  pictureContainer.appendChild(fragment);
})();
