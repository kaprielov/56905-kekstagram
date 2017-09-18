'use strict';
(function () {

// Загрузчик

  var closeUploadOverlay = function () {
    var uploadOverlay = document.querySelector('.upload-overlay');
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onUploadOverlayEsc);
    uploadOverlay.querySelector('.upload-form-cancel').removeEventListener('keydown', onUploadCancelKeydown);
    uploadOverlay.querySelector('.upload-form-cancel').removeEventListener('click', closeUploadOverlay);
    uploadOverlay.querySelector('.upload-resize-controls').removeEventListener('click', uploadResizeControls);
    uploadOverlay.querySelector('.upload-effect-controls').removeEventListener('change', uploadEffectControls);
    uploadOverlay.querySelector('.upload-form-hashtags').removeEventListener('input', tagsInputValid);
  };

  var showUploadOverlay = function () {
    var uploadOverlay = document.querySelector('.upload-overlay');
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onUploadOverlayEsc);
    uploadOverlay.querySelector('.upload-form-cancel').addEventListener('keydown', onUploadCancelKeydown);
    uploadOverlay.querySelector('.upload-form-cancel').addEventListener('click', closeUploadOverlay);
    uploadOverlay.querySelector('.upload-resize-controls-value').setAttribute('value', 100 + '%');
    uploadOverlay.querySelector('.upload-resize-controls').addEventListener('click', uploadResizeControls);
    uploadOverlay.querySelector('.upload-effect-controls').addEventListener('change', uploadEffectControls);
    uploadOverlay.querySelector('.upload-form-hashtags').addEventListener('input', tagsInputValid);
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
  };

  var uploadResizeControls = function (event) {
    var target = event.target;
    if (target.tagName.toLowerCase() !== 'button') {
      return;
    }
    var resizeValue = event.currentTarget.querySelector('.upload-resize-controls-value');
    var resizeValueAttribute = parseInt(resizeValue.getAttribute('value'), 10);
    var image = document.querySelector('.effect-image-preview');
    var step = 25;
    var maxValue = 100;

    if (target.classList.contains('upload-resize-controls-button-dec') && resizeValueAttribute > step) {
      resizeDecClick(resizeValue, resizeValueAttribute, image, step, maxValue);
    }
    if (target.classList.contains('upload-resize-controls-button-inc') && resizeValueAttribute < maxValue) {
      resizeIncClick(resizeValue, resizeValueAttribute, image, step, maxValue);
    }
  };

  var resizeDecClick = function (resizeValue, resizeValueAttribute, image, step, maxValue) {
    resizeValue.setAttribute('value', resizeValueAttribute - step + '%');
    var decResizeValueAttribute = parseInt(resizeValue.getAttribute('value'), 10);
    image.setAttribute('style', 'transform: scale(0.' + decResizeValueAttribute + ')');
  };

  var resizeIncClick = function (resizeValue, resizeValueAttribute, image, step, maxValue) {
    resizeValue.setAttribute('value', resizeValueAttribute + step + '%');
    var incResizeValueAttribute = parseInt(resizeValue.getAttribute('value'), 10);
    if (incResizeValueAttribute === maxValue) {
      image.setAttribute('style', 'transform: scale(1)');
    } else {
      image.setAttribute('style', 'transform: scale(0.' + incResizeValueAttribute + ')');
    }
  };

  var uploadEffectControls = function (event) {
    var target = event.target;
    var image = document.querySelector('.effect-image-preview');
    var effect = 'effect-' + target.value;
    if (image.classList.length > 1) {
      image.classList.remove(image.classList[1]);
    }
    image.classList.add(effect);
  };

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
