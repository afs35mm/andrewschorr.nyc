const Masonry = require('masonry-layout');
const main = document.querySelector('.main');
const hideOpts = ['left', 'right', 'top', 'bottom'];
let msnry, items, projects;

const AFS = (function() {

    function init() {
        getProjectsJson();
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
            if (el.element.classList.contains('project')) {
                if (el.element.classList.contains('brd')) {
                    el.element.classList.add(`hide-bottom`);
                } else {
                    let hiddenClassToAdd = hideOpts[Math.floor(Math.random() * hideOpts.length)];
                    el.element.classList.add(`hide-${hiddenClassToAdd}`);
                }
                el.element.addEventListener('click', showProject);
            }
            el.element.classList.add('show');
        });
    };

    function getProjectsJson() {
        const req = new XMLHttpRequest();
        req.overrideMimeType('application/json');
        req.open('GET', '/projects.json', true);
        req.addEventListener('readystatechange', function(){
            if (this.readyState === 4 && this.status === 200) {
                projects = JSON.parse(this.responseText);
                console.log(projects);
            }
        });

        req.send(null);
    };

    function showProject(e) {
        console.log(projects[e.currentTarget.dataset.project]);
    };

    return {
        init: init
    };

})();

document.addEventListener('DOMContentLoaded', AFS.init);
