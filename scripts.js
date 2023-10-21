//Scroll event listener for work page effect
window.addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll',window.scrollY / (document.body.offsetHeight - window.innerHeight));
  }, false);

//maybe change scale so he runs off screen along edge?
try {
  document.getElementById('homePageGif').src="img/homepage.gif?a="+Math.random();
  setTimeout(function () {
    document.getElementById('homePageGif').src="img/homepage_loop.gif";
  }, 16500)
}
catch (exception) {

}

//still needs either tweaking or overhaul LOL

var keywords = ['about', 'work', 'contact'];
var elements = [];
var timeouts = [1700, 1980, 1880];
var isPlaying = [false, false, false];
var isMouseOn = [false, false, false];
var currentTimeout;

keywords.forEach((keyword, index) => {
  let element = document.getElementById(keyword + 'Area');
  element.addEventListener('mouseenter', () => {
    mouseOver(keyword, index, timeouts[index]);
    console.log(keyword + " enter");
  }, false);
  element.addEventListener('mouseleave', () => {
    mouseOut(keyword, index, timeouts[index]);
    console.log(keyword + " leave");
  }, false);
  element.addEventListener('mouseover', () => {
    isMouseOn[index] = !isMouseOn[index];
    console.log(keyword + " over");
  }, false);
  elements.push(element);
});

function mouseOver(id, index, timeout) {
  if (isPlaying[index] == false) {
    isPlaying[index] = true;
    startGif(id, index, timeout);
  };
};

function mouseOut(id, index, timeout) {
  if (isPlaying[index] == false) {
    isPlaying[index] = true;
    clearTimeout(currentTimeout); //add index?
    reverseGif(id, index, timeout);
  };
};

function startGif(id, index, timeout) {
  var gif = document.getElementById(id);

  gif.src = 'img/' + id + '.gif';
  currentTimeout = setTimeout(function() {
    gif.src = 'img/' + id + '_lastFrame.gif';
    isPlaying[index] = false;
    if (isMouseOn[index] === false) {
      reverseGif(id, index, timeout);
    }
  }, timeout);
}

function reverseGif(id, index, timeout) {
  var gif = document.getElementById(id);

  gif.src = 'img/' + id + '_reverse.gif';
  currentTimeout = setTimeout(function() {
    gif.src = 'img/' + id + '_firstFrame.gif';
    isPlaying[index] = false;
  }, timeout);
}