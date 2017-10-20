'use strict';

(function () {
  window.initializeFilters = function (initializeElement, adjustEffect, resetSlider) {
    initializeElement.addEventListener('change', function () {
      var target = event.target;
      var effect = 'effect-' + target.value;
      adjustEffect(effect);
      resetSlider();
    });
  };
})();
