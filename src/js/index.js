const Masonry = require('masonry-layout');
const main = document.querySelector('.main');
let msnry, items;

const AFS = (function() {

    function init() {
        items = document.querySelectorAll('.item');
        msnry = new Masonry( main, {
            itemSelector: '.item',
            columnWidth: '.sizer',
            transitionDuration: 0,
            percentPosition: true,
        });

        msnry.once('layoutComplete', fadeIn);
        msnry.layout();
    };

    function fadeIn(els) {
        els.forEach(function(el){
            el.element.classList.add('show');
        });
    };

    return {
        init: init
    };

})();

document.addEventListener('DOMContentLoaded', AFS.init);
