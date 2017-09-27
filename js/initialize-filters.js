'use strict';

(function () {
  window.initializeFilters = function (initializeElement, adjustEffect, adjustSlider) {
    initializeElement.addEventListener('change', function () {
      var target = event.target;
      var effect = 'effect-' + target.value;
      adjustEffect(effect);
      adjustSlider();
    });
  };
})();
