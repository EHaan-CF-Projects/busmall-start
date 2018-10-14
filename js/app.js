'use strict';

//==========Global Variables======================
// var imageSection = document.getElementById('testing-section');
var rankSection = document.getElementById('rank-results');

var productImage1 = document.getElementById('image-1');
var productImage2 = document.getElementById('image-2');
var productImage3 = document.getElementById('image-3');

var productImage1Text = document.getElementById('image-1-text');
var productImage2Text = document.getElementById('image-2-text');
var productImage3Text = document.getElementById('image-3-text');

var currentImage1ArrayIndex = 0;
var currentImage2ArrayIndex = 2;
var currentImage3ArrayIndex = 3;

var clickCounter = 0;
var allProductImagesArray = [];

//=========Constructor Function==================

var ProductImage = function (name, src) {
  this.name = name;
  this.src = src;

  this.likes = 0;
  this.appeared = 0;

  allProductImagesArray.push(this);
};

ProductImage.prototype.renderProductImage = function() {
  productImage1.src = this.src;
  productImage2.src = this.src;
  productImage3.src = this.src;
};

var busMallClickHandler = function (event) {
  if(event.target.id === 'image-1' || event.target.id === 'image-2' || event.target.id ==='image-3') {
    do {
      var randomNumberImage1 = Math.floor(Math.random() * allProductImagesArray.length);
    } while (randomNumberImage1 === currentImage1ArrayIndex || randomNumberImage1 === currentImage2ArrayIndex || randomNumberImage1 === currentImage3ArrayIndex || randomNumberImage1 === randomNumberImage2 || randomNumberImage1 === randomNumberImage3);

    do {
      var randomNumberImage2 = Math.floor(Math.random() * allProductImagesArray.length);
    } while (randomNumberImage2 === currentImage2ArrayIndex || randomNumberImage2 === currentImage1ArrayIndex || randomNumberImage3 === currentImage3ArrayIndex || randomNumberImage2 === randomNumberImage1 || randomNumberImage2 === randomNumberImage3);

    do {
      var randomNumberImage3 = Math.floor(Math.random () * allProductImagesArray.length);
    } while (randomNumberImage3 === currentImage3ArrayIndex || randomNumberImage3 === currentImage1ArrayIndex || randomNumberImage3 === currentImage2ArrayIndex || randomNumberImage3 === randomNumberImage1 || randomNumberImage3 === randomNumberImage2);
  }

  if (event.target.id === 'image-1') {
    allProductImagesArray[currentImage1ArrayIndex].likes++;
  } else if (event.target.id === 'image-2') {
    allProductImagesArray[currentImage2ArrayIndex].likes++;
  } else if (event.target.id === 'image-3') {
    allProductImagesArray[currentImage3ArrayIndex].likes++;
  }

  allProductImagesArray[currentImage1ArrayIndex].appeared++;
  allProductImagesArray[currentImage2ArrayIndex].appeared++;
  allProductImagesArray[currentImage3ArrayIndex].appeared++;

  currentImage1ArrayIndex = randomNumberImage1;
  currentImage2ArrayIndex = randomNumberImage2;
  currentImage3ArrayIndex = randomNumberImage3;

  productImage1.src = allProductImagesArray[randomNumberImage1].src;
  productImage2.src = allProductImagesArray[randomNumberImage2].src;
  productImage3.src = allProductImagesArray[randomNumberImage3].src;

  productImage1Text.textContent = allProductImagesArray[randomNumberImage1].name;
  productImage2Text.textContent = allProductImagesArray[randomNumberImage2].name;
  productImage3Text.textContent = allProductImagesArray[randomNumberImage3].name;

  clickCounter++;
  if (clickCounter === 25) {
    productImage1.removeEventListener('click', busMallClickHandler);
    productImage2.removeEventListener('click', busMallClickHandler);
    productImage3.removeEventListener('click', busMallClickHandler);

    for (var i = 0; i < allProductImagesArray.length; i++) {
      var liUl = document.createElement('li');
      liUl.textContent = `${allProductImagesArray[i].name}:  ${allProductImagesArray[i].likes} / ${allProductImagesArray[i].appeared}`;
      rankSection.appendChild(liUl);
    }
  }
};

productImage1.addEventListener('click', busMallClickHandler);
productImage2.addEventListener('click', busMallClickHandler);
productImage3.addEventListener('click', busMallClickHandler);

//Charts

//function to render the chart
// var renderChart = function() {
//   //chartjs needs ctx
//   //collect all data
//     //labels, data values, colors

//   //creates a data object that gets passed all our other arrays, based off of the example from chartjs
//   //call a new chart and pass in ctx and our data
// }


new ProductImage('R2D2 Suitcase', './img/bag.jpg');
new ProductImage('Banana Slicer', './img/banana.jpg');
new ProductImage('IPad TP Stand', './img/bathroom.jpg');
new ProductImage('Raincatcher boots', './img/boots.jpg');
new ProductImage('Breakfast Machine Mini', './img/breakfast.jpg');
new ProductImage('Meatball Bubblegum', './img/bubblegum.jpg');
new ProductImage('Ergonomic Chair', './img/chair.jpg');
new ProductImage('Cthulhu Action Figure', './img/cthulhu.jpg');
new ProductImage('Duck-billed Dog', './img/dog-duck.jpg');
new ProductImage('Dragon Meat', './img/dragon.jpg');
new ProductImage('Eating/Writing Utensils', './img/pen.jpg');
new ProductImage('Pet Sweep', './img/pet-sweep.jpg');
new ProductImage('Pizzissors', './img/scissors.jpg');
new ProductImage('Shark Sleeping Bag', './img/shark.jpg');
new ProductImage('Baby Sweep', './img/sweep.png');
new ProductImage('Tauntaun Sleeping Bag', './img/tauntaun.jpg');
new ProductImage('Unicorn in a Can', './img/unicorn.jpg');
new ProductImage('Under the Sea USB', './img/usb.gif');
new ProductImage('Watering Can\'t', './img/water-can.jpg');
new ProductImage('Wine Egg', './img/wine-glass.jpg');

// allProductImagesArray.forEach(function(item) {
//   var liUl = document.createElement('li');
//   liUl.textContent = `The ${item.name} was displayed ${item.appeared} times and got ${item.likes} vote(s).`;
//   rankSection.appendChild(liUl);
// });