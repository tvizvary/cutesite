//Scroll event listener for work page effect
window.addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll',window.scrollY / (document.body.offsetHeight - window.innerHeight));
  }, false);

//Changes the loaded background gif so it always starts fresh on reload  
try {
  document.getElementById('homePageGif').src="img/homepage.gif?a="+Math.random();
}
catch (exception) {

}

//change homegif so that it caches the loop without him falling but switches to it a second in, need good timing for that, also remove other gifs from the above code lol
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
  }, false);
  element.addEventListener('mouseleave', () => {
    mouseOut(keyword, index, timeouts[index]);
  }, false);
  element.addEventListener('mouseover', () => {
    isMouseOn[index] = !isMouseOn[index];
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
      reverseGif(id);
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