//Scroll event listener for work page effect
window.addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll',window.scrollY / (document.body.offsetHeight - window.innerHeight));
  }, false);

//Changes the loaded background gif so it always starts fresh on reload  
var page = (window.location.pathname).split("/").pop();
switch (page){
  case 'index.html':
    document.getElementById('homePageGif').src="img/homepage.gif?a="+Math.random();
    break;
  case 'about.html':
    document.getElementById('aboutPageGif').src="img/about_page.gif?a="+Math.random();
    break;
  case 'contact.html':
    document.getElementById('contactPageGif').src="img/contact_page.gif?a="+Math.random();
    break;
}

//Messy code for button hovers. Need to update the timeout to work for all gifs since they're different lengths
var keywords = ['about', 'work', 'contact'];
var elements = [];
var isPlaying = [false, false, false];
var isMouseOn = [false, false, false];
var currentTimeout;

keywords.forEach((keyword, index) => {
  let element = document.getElementById(keyword + 'Area');
  element.addEventListener('mouseenter', () => {
    mouseOver(keyword, index);
  }, false);
  element.addEventListener('mouseleave', () => {
    mouseOut(keyword, index);
  }, false);
  element.addEventListener('mouseover', () => {
    isMouseOn[index] = !isMouseOn[index];
  }, false);
  elements.push(element);
});

function mouseOver(id, index) {
  if (isPlaying[index] == false) {
    isPlaying[index] = true;
    startGif(id, index);
  };
};

function mouseOut(id, index) {
  if (isPlaying[index] == false) {
    isPlaying[index] = true;
    clearTimeout(currentTimeout); //add index?
    reverseGif(id, index);
  };
};

function startGif(id, index) {
  var gif = document.getElementById(id);

  gif.src = 'img/' + id + '.gif';
  currentTimeout = setTimeout(function() {
    gif.src = 'img/' + id + '_lastFrame.gif';
    isPlaying[index] = false;
    if (isMouseOn[index] === false) {
      reverseGif(id);
    }
  }, 1500);
}

function reverseGif(id, index) {
  var gif = document.getElementById(id);

  gif.src = 'img/' + id + '_reverse.gif';
  currentTimeout = setTimeout(function() {
    gif.src = 'img/' + id + '_firstFrame.gif';
    isPlaying[index] = false;
  }, 1500);
}