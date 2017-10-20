'use strict';

(function () {
  window.error = {
    backend: function (errorMessage) {
      var node = document.createElement('div');
      node.classList.add('error-massage');
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
