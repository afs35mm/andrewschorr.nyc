const Masonry = require('masonry-layout');
const main = document.querySelector('.main');
const hideOpts = ['left', 'right', 'top', 'bottom'];
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
            if (el.element.classList.contains('brd')) {
                el.element.classList.add(`hide-bottom`);
            } else if (el.element.classList.contains('project')) {
                let hiddenClassToAdd = hideOpts[Math.floor(Math.random() * hideOpts.length)];
                el.element.classList.add(`hide-${hiddenClassToAdd}`);
            }
            el.element.classList.add('show');
        });
    };

    return {
        init: init
    };

})();

document.addEventListener('DOMContentLoaded', AFS.init);
