'use strict';

//==========Global Variables======================

var ctx = document.getElementById("myChart").getContext('2d');

var productImage1 = document.getElementById('image-1');
var productImage2 = document.getElementById('image-2');
var productImage3 = document.getElementById('image-3');

var productImage1Text = document.getElementById('image-1-text');
var productImage2Text = document.getElementById('image-2-text');
var productImage3Text = document.getElementById('image-3-text');

var currentImage1ArrayIndex = 0;
var currentImage2ArrayIndex = 1;
var currentImage3ArrayIndex = 2;

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

//========Test-Running Event======================
//Generate 3 random images
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

  //track votes
  if (event.target.id === 'image-1') {
    allProductImagesArray[currentImage1ArrayIndex].likes++;
  } else if (event.target.id === 'image-2') {
    allProductImagesArray[currentImage2ArrayIndex].likes++;
  } else if (event.target.id === 'image-3') {
    allProductImagesArray[currentImage3ArrayIndex].likes++;
  }

  //track appearances
  allProductImagesArray[currentImage1ArrayIndex].appeared++;
  allProductImagesArray[currentImage2ArrayIndex].appeared++;
  allProductImagesArray[currentImage3ArrayIndex].appeared++;

  //set initial images
  currentImage1ArrayIndex = randomNumberImage1;
  currentImage2ArrayIndex = randomNumberImage2;
  currentImage3ArrayIndex = randomNumberImage3;

  //replace images & text
  productImage1.src = allProductImagesArray[randomNumberImage1].src;
  productImage2.src = allProductImagesArray[randomNumberImage2].src;
  productImage3.src = allProductImagesArray[randomNumberImage3].src;

  productImage1Text.textContent = allProductImagesArray[randomNumberImage1].name;
  productImage2Text.textContent = allProductImagesArray[randomNumberImage2].name;
  productImage3Text.textContent = allProductImagesArray[randomNumberImage3].name;

  //turn off after 25 test rounds
  clickCounter++;
  if (clickCounter === 25) {
    productImage1.removeEventListener('click', busMallClickHandler);
    productImage2.removeEventListener('click', busMallClickHandler);
    productImage3.removeEventListener('click', busMallClickHandler);

    //Save data to local storage
    storeToLocalStorage();
    //render results as bar graph
    renderChart();
  }
};

//turn on event listener
productImage1.addEventListener('click', busMallClickHandler);
productImage2.addEventListener('click', busMallClickHandler);
productImage3.addEventListener('click', busMallClickHandler);

//tester products
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

//====Button: Reset Local Storage========
var resetVoteResults = function(){
  localStorage.clear();
  location.reload();
};
//==========Chart========================
var nameLabelArray = [];
var voteCountArray = [];

var storeToLocalStorage = function () {
  for (var i = 0; i < allProductImagesArray.length; i++) {
    nameLabelArray.push(allProductImagesArray[i].name);
    voteCountArray.push(allProductImagesArray[i].likes);
  }
  localStorage.setItem('xAxisLabels', JSON.stringify(nameLabelArray));
  localStorage.setItem('votes', JSON.stringify(voteCountArray));
};

var renderChart = function () {
  var storedLabelArray = JSON.parse(localStorage.getItem('xAxisLabels'));
  var storedVoteArray = JSON.parse(localStorage.getItem('votes'));

  var chartData = {
    labels: storedLabelArray,
    datasets: [{
      label: 'Voting Results',
      data: storedVoteArray,
      backgroundColor: [
        'rgba(128, 17, 9, 0.3)',
        'rgba(128, 17, 9, 0.3)',
        'rgba(128, 17, 9, 0.3)',
        'rgba(128, 17, 9, 0.3)',
        'rgba(128, 17, 9, 0.3)',
        'rgba(128, 17, 9, 0.3)',
        'rgba(128, 17, 9, 0.3)',
        'rgba(128, 17, 9, 0.3)',
        'rgba(128, 17, 9, 0.3)',
        'rgba(128, 17, 9, 0.3)',
        'rgba(128, 17, 9, 0.3)',
        'rgba(128, 17, 9, 0.3)',
        'rgba(128, 17, 9, 0.3)',
        'rgba(128, 17, 9, 0.3)',
        'rgba(128, 17, 9, 0.3)',
        'rgba(128, 17, 9, 0.3)',
        'rgba(128, 17, 9, 0.3)',
        'rgba(128, 17, 9, 0.3)',
        'rgba(128, 17, 9, 0.3)',
        'rgba(128, 17, 9, 0.3)'
      ],
      borderColor: [
        'rgba(128, 17, 9, 1)',
        'rgba(128, 17, 9, 1)',
        'rgba(128, 17, 9, 1)',
        'rgba(128, 17, 9, 1)',
        'rgba(128, 17, 9, 1)',
        'rgba(128, 17, 9, 1)',
        'rgba(128, 17, 9, 1)',
        'rgba(128, 17, 9, 1)',
        'rgba(128, 17, 9, 1)',
        'rgba(128, 17, 9, 1)',
        'rgba(128, 17, 9, 1)',
        'rgba(128, 17, 9, 1)',
        'rgba(128, 17, 9, 1)',
        'rgba(128, 17, 9, 1)',
        'rgba(128, 17, 9, 1)',
        'rgba(128, 17, 9, 1)',
        'rgba(128, 17, 9, 1)',
        'rgba(128, 17, 9, 1)',
        'rgba(128, 17, 9, 1)',
        'rgba(128, 17, 9, 1)',
      ],
      borderWidth: 2
    }]
  };

  var chartOptions = {
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          fontColor: 'black',
          fontFamily: 'Cormorant Garamond',
          fontSize: 22,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          steps: 10,
          stepValue: 1,
          max: 10,
          fontColor: 'black',
          fontFamily: 'Cormorant Garamond',
          fontSize: 30
        }
      }]
    },
    animation: {
      duration: 2000,
    },
    responsive: true,
    legend: {
      labels: {
        fontColor: 'black',
        fontSize: 40,
        fontFamily: 'Playfair Display'
      }
    },
  };

  var barChart = {
    type: 'bar',
    data: chartData,
    options: chartOptions,
  };

  var myChart = new Chart(ctx, barChart);
};

if (localStorage.getItem('xAxisLabels') && localStorage.getItem('votes')) {
  renderChart();
}



