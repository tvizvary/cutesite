//Scroll event listener for work page effect
window.addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll',window.scrollY / (document.body.offsetHeight - window.innerHeight));
  }, false);

try {
  document.getElementById('homePageGif').src="img/homepage.gif?a="+Math.random();
  setTimeout(function () {
    document.getElementById('homePageGif').src="img/homepage_loop.gif";
  }, 16500)
}
catch (exception) {
  console.log(exception);
}

try {
  document.getElementById('homePageGifMobile').src="img/homepage_mobile.gif?a="+Math.random();
  setTimeout(function () {
    document.getElementById('homePageGifMobile').style.setProperty('display', 'none');
  }, 13700)
}
catch (exception) {
  console.log(exception);
}

//imageViewer functionality
try {
  const eventNames = ['touchend']
  const imgs = document.querySelectorAll('.individualImage img');
  const imageViewer = document.querySelector('#imageViewer');
  const leftArrow = document.querySelector('#leftArrow');
  const rightArrow = document.querySelector('#rightArrow');
  let currentIndex = 0;
  
  for (var i = 0; i < eventNames.length; i++) {
    imgs.forEach((img, index) => {
      if (img.alt !== 'noViewer') {
        img.parentElement.addEventListener(eventNames[i], function (event) {
          event.stopPropagation();
          currentIndex = index;
          showImage(currentIndex);
          scrollToImage(img.parentElement);
        });
      }
    });
  }

  function showImage(index) {
    const selectedImg = imgs[index];
    imageViewer.style.backgroundImage = 'url(' + selectedImg.src + ')';
    imageViewer.style.display = 'block';
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % imgs.length;
    showImage(currentIndex);
    scrollToImage(imgs[currentIndex].parentElement);
  }

  function showPrevImage() {
    currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
    showImage(currentIndex);
    scrollToImage(imgs[currentIndex].parentElement);
  }

  function scrollToImage(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  leftArrow.addEventListener('click', function (event) {
    event.stopPropagation();
    showPrevImage();
  });

  rightArrow.addEventListener('click', function (event) {
    event.stopPropagation();
    showNextImage();
  });

  imageViewer.addEventListener('click', function () {
    this.style.display = 'none';
  });
  }

catch (exception) {
  console.log(exception);
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