import {scroll}               from './scroll';
import {detectTransitionEnd}  from './transition-end';
import Handlebars             from 'handlebars';
import Masonry                from 'masonry-layout';

const main        = document.querySelector('.main');
const clostBtn    = document.querySelector('.close');
const hideOpts    = ['left', 'right', 'top', 'bottom'];
const minWidthLrg = 880;

let msnry,
    projectsJson,
    tpl,
    currentProject,
    stage,
    transitionEnd,
    curWidth,
    stickyCloseBreakpointHeight;

const AFS = (function() {

    function init() {
        getProjectsJson();
        msnry = new Masonry( main, {
            itemSelector: '.item',
            columnWidth: '.sizer',
            transitionDuration: 0,
            percentPosition: true,
        });

        msnry.once('layoutComplete', function(els){
            els.forEach(function(el){
                activateEl(el.element);
            });
        });
        msnry.layout();
        tpl = Handlebars.compile(document.querySelector('#projects-template').innerHTML);
        stage = document.querySelector('.stage');
        transitionEnd = detectTransitionEnd();

        clostBtn.addEventListener('click', hideStage);
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', setBreakpointWidth);
        setBreakpointWidth();
    };

    function setBreakpointWidth() {
        curWidth = window.innerWidth || document.body.clientWidth;
        stickyCloseBreakpointHeight =  (curWidth >= minWidthLrg) ? 70 : 50;
    };

    function hideStage() {
        document.body.classList.remove('item-show');
        stage.style.height = 0;
        currentProject = null;
        transitionEnd && stage.addEventListener(transitionEnd, removeChildStage);
    };

    function removeChildStage() {
        stage.removeChild(stage.querySelector('.featured'));
        stage.removeEventListener(transitionEnd, removeChildStage);
    };

    function handleScroll(e) {
        if (this.scrollY >= stickyCloseBreakpointHeight) {
            clostBtn.classList.add('stuck');
        } else {
            clostBtn.classList.remove('stuck');
        }
    };

    function activateEl(el) {
        if (el.classList.contains('project')) {
            if (el.classList.contains('brd')) {
                el.classList.add(`hide-bottom`);
            } else {
                let hiddenClassToAdd = hideOpts[Math.floor(Math.random() * hideOpts.length)];
                el.classList.add(`hide-${hiddenClassToAdd}`);
            }
            el.addEventListener('click', showProject);
        }
        el.classList.add('show');
    };

    function getProjectsJson() {
        const req = new XMLHttpRequest();
        req.overrideMimeType('application/json');
        req.open('GET', '/projects.json', true);
        req.addEventListener('readystatechange', function(){
            if (this.readyState === 4 && this.status === 200) {
                projectsJson = JSON.parse(this.responseText);
            }
        });

        req.send(null);
    };

    function showProject(e) {
        const selectedProject = e.currentTarget.dataset.project;
        if (!projectsJson || selectedProject === currentProject) return;
        scroll(0, 20);
        currentProject = selectedProject;
        const projData = projectsJson[selectedProject];
        const projectDom = tpl(projData);
        stage.innerHTML = projectDom;
        const featuredImages = stage.querySelectorAll('img');
        document.body.classList.add('item-show');

        /**
        * HOLY FUCK THIS IS FUCKING INSANITY
        * But need a way to listen for each image to load so height isnt an incorrect value :/
        */
        let loaded = 0,
            imgsNeeded = featuredImages.length;
        function addImgComplete() {
            loaded++;
            if (loaded >= imgsNeeded) {
                setHeight();
            }
        }
        Array.prototype.slice.call(featuredImages).forEach(function(img){
            if (img.complete) {
                addImgComplete();
            } else {
                img.addEventListener('load', addImgComplete);
                img.addEventListener('error', addImgComplete);
            }
        });
    };

    function setHeight() {
        const height = document.querySelector('.featured').clientHeight;
        stage.style.height = `${height}px`;
    };

    return {
        init: init
    };

})();

document.addEventListener('DOMContentLoaded', AFS.init);


