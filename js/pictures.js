'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var LIKES_MAX = 256;
var LIKES_MIN = 15;
var NUMBER_OF_PHOTOS = 25;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Отрисовка шаблона

function getRandomValueFromRange(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

var getRandomComments = function (min, max) {
  var commetnsIndividual = [];
  for (var i = 0; i <= getRandomValueFromRange(min, max); i++) {
    commetnsIndividual.push(COMMENTS[getRandomValueFromRange(0, COMMENTS.length - 1)]);
  }
  return commetnsIndividual;
};

var genCard = function (i) {
  return {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomValueFromRange(LIKES_MAX, LIKES_MIN),
    comments: getRandomComments(0, 1),
  };
};

var getCardsimageNamesArray = function () {
  var pictures = [];
  for (var i = 0; i <= NUMBER_OF_PHOTOS; i++) {
    pictures.push(genCard(i));
  }
  return pictures;
};

var getPictureTemplate = function (card) {
  var pictureTemplateClone = document.querySelector('#picture-template').content.cloneNode(true);
  pictureTemplateClone.querySelector('img').setAttribute('src', card.url);
  pictureTemplateClone.querySelector('.picture-likes').textContent = card.likes;
  pictureTemplateClone.querySelector('.picture-comments').textContent = card.comments.length;
  return pictureTemplateClone;
};

var renderPictureTemplate = function () {
  var fragment = document.createDocumentFragment();
  var cards = getCardsimageNamesArray();
  var pictureContainer = document.querySelector('.pictures');
  for (var i = 0; i < cards.length; i++) {
    fragment.appendChild(getPictureTemplate(cards[i]));
  }
  pictureContainer.appendChild(fragment);
};

renderPictureTemplate();

// Галерея

var getGalleryOverlay = function (target) {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', target.querySelector('img').getAttribute('src'));
  galleryOverlay.querySelector('.likes-count').textContent = target.querySelector('.picture-likes').textContent;
  galleryOverlay.querySelector('.comments-count').textContent = target.querySelector('.picture-comments').textContent;
};

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
  if (event.keyCode === ESC_KEYCODE) {
    closeGalleryOverlay();
  }
};

var onPictureClick = function (event) {
  var target = event.target;
  while (!target.classList.contains('pictures')) {
    if (target.className === 'picture') {
      event.preventDefault();
      openGalleryOverlay();
      getGalleryOverlay(target);
    }
    target = target.parentNode;
  }
};

var onOverlayCloseKeydown = function () {
  if (event.keyCode === ENTER_KEYCODE) {
    closeGalleryOverlay();
  }
};

document.querySelector('.pictures').addEventListener('click', onPictureClick);

// Загрузчик

var closeUploadOverlay = function () {
  var uploadOverlay = document.querySelector('.upload-overlay');
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onUploadOverlayEsc);
  uploadOverlay.querySelector('.upload-form-cancel').removeEventListener('keydown', onUploadCancelKeydown);
  uploadOverlay.querySelector('.upload-form-cancel').removeEventListener('click', onUploadOverlayClick);
  uploadOverlay.querySelector('.upload-resize-controls').removeEventListener('click', uploadResizeControls);
  uploadOverlay.querySelector('.upload-effect-controls').removeEventListener('change', uploadEffectControls);
  uploadOverlay.querySelector('.upload-form-hashtags').removeEventListener('input', tagsInputValid);
};

var showUploadOverlay = function () {
  var uploadOverlay = document.querySelector('.upload-overlay');
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onUploadOverlayEsc);
  uploadOverlay.querySelector('.upload-form-cancel').addEventListener('keydown', onUploadCancelKeydown);
  uploadOverlay.querySelector('.upload-form-cancel').addEventListener('click', onUploadOverlayClick);
  uploadOverlay.querySelector('.upload-resize-controls-value').setAttribute('value', 100 + '%');
  uploadOverlay.querySelector('.upload-resize-controls').addEventListener('click', uploadResizeControls);
  uploadOverlay.querySelector('.upload-effect-controls').addEventListener('change', uploadEffectControls);
  uploadOverlay.querySelector('.upload-form-hashtags').addEventListener('input', tagsInputValid);
};

var onUploadCancelKeydown = function () {
  if (event.keyCode === ENTER_KEYCODE) {
    closeUploadOverlay();
  }
};

var onUploadOverlayEsc = function (event) {
  if (event.keyCode === ESC_KEYCODE && !event.target.classList.contains('upload-form-description')) {
    closeUploadOverlay();
  }
};

var onUploadOverlayClick = function () {
  closeUploadOverlay();
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
