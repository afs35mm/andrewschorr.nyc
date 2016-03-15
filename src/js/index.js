var $ = require('jquery');
var Masonry = require('masonry-layout');

var msnry = new Masonry( '.grid', {
  itemSelector: '.grid-item',
  columnWidth: 200
});

$('body').css('background', 'red');
var a = [
  "Hydrogen",
  "Helium",
  "Lithium",
  "Beryl­lium"
];

var a2 = a.map(function(s){ return s.length });

var a3 = a.map( s => s.length );
console.log(a3);


import { square, diag } from './thing';
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5


