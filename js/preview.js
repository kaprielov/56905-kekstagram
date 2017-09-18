'use strict';
(function () {
  window.preview = {
    getGalleryOverlay: function (target) {
      var galleryOverlay = document.querySelector('.gallery-overlay');
      galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', target.querySelector('img').getAttribute('src'));
      galleryOverlay.querySelector('.likes-count').textContent = target.querySelector('.picture-likes').textContent;
      galleryOverlay.querySelector('.comments-count').textContent = target.querySelector('.picture-comments').textContent;
    }
  };
})();
