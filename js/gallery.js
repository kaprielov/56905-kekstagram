'use strict';
(function () {

// Галерея
  var openGalleryOverlay = function () {
    var galleryOverlay = document.querySelector('.gallery-overlay');
    galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onGalleryOverlayEsc);
    document.querySelector('.gallery-overlay-close').addEventListener('click', closeGalleryOverlay);
    galleryOverlay.querySelector('.gallery-overlay-close').addEventListener('keydown', onOverlayCloseKeydown);
  };

  var closeGalleryOverlay = function () {
    document.querySelector('.gallery-overlay').classList.add('hidden');
    document.removeEventListener('keydown', onGalleryOverlayEsc);
    document.querySelector('.gallery-overlay-close').removeEventListener('click', closeGalleryOverlay);
    document.querySelector('.gallery-overlay-close').removeEventListener('keydown', onOverlayCloseKeydown);
  };

  var onGalleryOverlayEsc = function () {
    if (event.keyCode === window.CONSTANTS.ESC_KEYCODE) {
      closeGalleryOverlay();
    }
  };

  var onPictureClick = function (event) {
    var target = event.target;
    while (!target.classList.contains('pictures')) {
      if (target.className === 'picture') {
        event.preventDefault();
        openGalleryOverlay();
        window.preview.getGalleryOverlay(target);
      }
      target = target.parentNode;
    }
  };

  var onOverlayCloseKeydown = function () {
    if (event.keyCode === window.CONSTANTS.ENTER_KEYCODE) {
      closeGalleryOverlay();
    }
  };

  document.querySelector('.pictures').addEventListener('click', onPictureClick);
})();

