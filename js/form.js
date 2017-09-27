'use strict';
(function () {

  var closeUploadOverlay = function () {
    var uploadOverlay = document.querySelector('.upload-overlay');
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onUploadOverlayEsc);
    uploadOverlay.querySelector('.upload-form-cancel').removeEventListener('keydown', onUploadCancelKeydown);
    uploadOverlay.querySelector('.upload-form-cancel').removeEventListener('click', closeUploadOverlay);
    // uploadOverlay.querySelector('.upload-resize-controls').removeEventListener('click', uploadResizeControls);
    // uploadOverlay.querySelector('.upload-effect-controls').removeEventListener('change', uploadEffectControls);
    uploadOverlay.querySelector('.upload-form-hashtags').removeEventListener('input', tagsInputValid);
    uploadOverlay.querySelector('.upload-effect-level-pin').removeEventListener('mousedown', sliderMove);
  };

  var showUploadOverlay = function () {
    var uploadOverlay = document.querySelector('.upload-overlay');
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onUploadOverlayEsc);
    uploadOverlay.querySelector('.upload-form-cancel').addEventListener('keydown', onUploadCancelKeydown);
    uploadOverlay.querySelector('.upload-form-cancel').addEventListener('click', closeUploadOverlay);
    uploadOverlay.querySelector('.upload-resize-controls-value').setAttribute('value', 100 + '%');
    // uploadOverlay.querySelector('.upload-resize-controls').addEventListener('click', uploadResizeControls);
    // uploadOverlay.querySelector('.upload-effect-controls').addEventListener('change', uploadEffectControls);
    uploadOverlay.querySelector('.upload-form-hashtags').addEventListener('input', tagsInputValid);
    uploadOverlay.querySelector('.upload-effect-level-pin').addEventListener('mousedown', sliderMove);
  };

  var onUploadCancelKeydown = function () {
    if (event.keyCode === window.CONSTANTS.ENTER_KEYCODE) {
      closeUploadOverlay();
    }
  };

  var onUploadOverlayEsc = function (event) {
    if (event.keyCode === window.CONSTANTS.ESC_KEYCODE && !event.target.classList.contains('upload-form-description')) {
      closeUploadOverlay();
    }
  };

  document.querySelector('#upload-file').onchange = function () {
    showUploadOverlay();
    document.querySelector('.upload-effect-level').classList.add('hidden');
  };
// ===========Всё что касается филтров===========

  var initializeElement = document.querySelector('.upload-effect-controls');
  var imageEffect = document.querySelector('.effect-image-preview');

  var adjustEffect = function (effect) {
    if (imageEffect.classList.length > 1) {
      imageEffect.classList.remove(imageEffect.classList[1]);
    }
    imageEffect.classList.add(effect);
  };

  var adjustSlider = function () {
    imageEffect.setAttribute('style', '');
    document.querySelector('.upload-effect-level-pin').style.left = window.CONSTANTS.MAX_FILTER_SATURATION / 100 * 20 + 'px';
    document.querySelector('.upload-effect-level-val').style.width = window.CONSTANTS.MAX_FILTER_SATURATION / 100 * 20 + 'px';
    if (imageEffect.classList.contains('effect-none')) {
      document.querySelector('.upload-effect-level').classList.add('hidden');
    } else {
      document.querySelector('.upload-effect-level').classList.remove('hidden');
    }
  };

  window.initializeFilters(initializeElement, adjustEffect, adjustSlider);

  var sliderMove = function (event) {
    var sliderPin = document.querySelector('.upload-effect-level-pin');
    var sliderVal = document.querySelector('.upload-effect-level-val');

    var startCoords = {
      x: event.clientX,
    };

    var onMouseMove = function (moveEvent) {
      var shift = {
        x: startCoords.x - moveEvent.clientX,
      };

      startCoords = {
        x: moveEvent.clientX,
      };

      var actualCoords = sliderPin.offsetLeft - shift.x;

      if (actualCoords >= 0 && actualCoords <= window.CONSTANTS.MAX_FILTER_SATURATION) {
        sliderPin.style.left = (actualCoords) + 'px';
        sliderVal.style.width = (actualCoords) + 'px';
        filterControl(actualCoords);
      }

    };

    var filterControl = function (actualCoords) {
      var image = document.querySelector('.effect-image-preview');
      if (image.classList.contains('effect-chrome')) {
        image.setAttribute('style', 'filter: grayscale(' + (actualCoords / window.CONSTANTS.MAX_FILTER_SATURATION) + ')');
      } else if (image.classList.contains('effect-sepia')) {
        image.setAttribute('style', 'filter: sepia(' + (actualCoords / window.CONSTANTS.MAX_FILTER_SATURATION) + ')');
      } else if (image.classList.contains('effect-marvin')) {
        image.setAttribute('style', 'filter: invert(' + (actualCoords / window.CONSTANTS.MAX_FILTER_SATURATION) * 100 + '%)');
      } else if (image.classList.contains('effect-phobos')) {
        image.setAttribute('style', 'filter: blur(' + (actualCoords / window.CONSTANTS.MAX_FILTER_SATURATION) * 5 + 'px)');
      } else if (image.classList.contains('effect-heat')) {
        image.setAttribute('style', 'filter: brightness(' + (actualCoords / window.CONSTANTS.MAX_FILTER_SATURATION) * 3 + ')');
      }
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

// ===========/Всё что касается филтров===========

// ===========РЕСАЙЗ===========
  var scaleElement = document.querySelector('.upload-resize-controls');
  var pictureElement = document.querySelector('.effect-image-preview');
  var decElement = 'upload-resize-controls-button-dec';
  var incElement = 'upload-resize-controls-button-inc';
  var maxValue = 100;
  var step = 25;

  var adjustScale = function (scale) {
    pictureElement.style.transform = 'scale(' + scale / maxValue + ')';
  };

  window.initializeScale(scaleElement, adjustScale, decElement, incElement, maxValue, step);
// ===========/РЕСАЙЗ===========

  var tagsInputValid = function (event) {
    var target = event.target;
    var hashTags = target.value.trim().split(' ');
    var maxTags = 5;
    var maxSymbols = 20;

    target.setCustomValidity('');

    var isStartWithHash = function (tags) {
      return tags.every(function (tag) {
        return tag[0] === '#';
      });
    };

    if (!isStartWithHash(hashTags)) {
      target.setCustomValidity('хэш-теги начинаются с символа `#` (решётка) и состоят из одного слова');
    }

    var hasOneHash = function (tags) {
      return tags.every(function (tag) {
        var countHash = 0;
        for (var i = 0; i < tag.length; i++) {
          if (tag[i] === '#') {
            countHash++;
          }
        }
        return countHash === 1;
      });
    };

    if (!hasOneHash(hashTags)) {
      target.setCustomValidity('хэш-теги разделяются пробелами');
    }

    var hasDuplicates = function (tags) {
      for (var i = 0; i < tags.length; i++) {
        for (var j = i + 1; j < tags.length; j++) {
          if (tags[i] === tags[j]) {
            return true;
          }
        }
      }
      return false;
    };

    if (hasDuplicates(hashTags)) {
      target.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
    }

    if (hashTags.length > maxTags) {
      target.setCustomValidity('нельзя указать больше пяти хэш-тегов');
    }

    var maxTagsSymbols = function (tags) {
      return tags.every(function (tag) {
        return tag.length > maxSymbols;
      });
    };

    if (maxTagsSymbols(hashTags)) {
      target.setCustomValidity('максимальная длина одного хэш-тега 20 символов');
    }
  };
})();
