'use strict';

(function () {
  window.initializeScale = function (scaleElement, adjustScale, decElement, incElement, maxValue, step) {
    scaleElement.addEventListener('click', function () {
      var target = event.target;
      if (target.tagName.toLowerCase() !== 'button') {
        return;
      }
      var scaleValue = event.currentTarget.querySelector('input');
      var scaleValueAttribute = parseInt(scaleValue.getAttribute('value'), 10);
      var scale;
      if (target.classList.contains(decElement) && scaleValueAttribute > step) {
        scale = scaleValueAttribute - step;
      } else if (target.classList.contains(incElement) && scaleValueAttribute < maxValue) {
        scale = scaleValueAttribute + step;
      } else {
        scale = scaleValueAttribute;
      }
      scaleValue.setAttribute('value', scale + '%');
      adjustScale(scale);
    });
  };
})();
