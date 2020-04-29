const track = document.querySelector('.carousel-container');  
const slides = Array.from(track.children);
console.log(slides);
const nextButton = document.querySelector('.carousel-button-right');
const prevButton = document.querySelector('.carousel-button-left');
const dotsNav = document.querySelector('.carousel-nav');
const dots = Array.from(dotsNav.children);
var currIndex = 0; 
var busy = false;

//create a function that updates slides and dots according to the current slide

function showCurr() {
    for (var i=0; i<slides.length; i++)
      {
        if (i == currIndex) {
          slides[i].style.display = 'block'; 
          dots[i].classList.add('current-slide'); 
    
        } else {
          slides[i].style.display = 'none';
          dots[i].classList.remove('current-slide'); 
        }
      }
    }
    
    showCurr();
    
    
    //when clicking on right button, show the next slide
    
    nextButton.addEventListener('click', function() {
      
      if(busy){
        return;
      } 
      busy = true;
      
      var currSlide = slides[currIndex];
      var nextSlide = slides[(currIndex + 1)%slides.length];
    
      currIndex = (currIndex +1)%slides.length; 
      nextSlide.style.display='block';
      nextSlide.animate([
        {transform: 'translateX(100%)'},
        {transform: 'translateX(0%)'}
      ],{duration: 1000});
      currSlide.animate([
        {transform: 'translateX(0%)'},
        {transform: 'translateX(-100%)'}
      ],{duration: 1000});
    
      setTimeout(showCurr,1000);
      setTimeout(function() { busy = false }, 1000);
      
    } )
    
    
    //when clicking on the left button, show the previous slide
    
    prevButton.addEventListener('click', function() {
      if(busy){
        return;
      } 
      busy = true;
      var currSlide = slides[currIndex];
      var prevSlide = slides[(currIndex + slides.length - 1)%slides.length];
      
      currIndex = (currIndex+slides.length  -1)%slides.length; 
      
      prevSlide.style.display='block';
      prevSlide.animate([
        {transform: 'translateX(-100%)'},
        {transform: 'translateX(0%)'}
      ],{duration: 1000});
      currSlide.animate([
        {transform: 'translateX(0%)'},
        {transform: 'translateX(100%)'}
      ],{duration: 1000});
    
      setTimeout(showCurr,1000);
      setTimeout(function() { busy = false }, 1000);
    } )
    
    
    //when clicking on the dot, go to the corresponding slide
    
    for (var i = 0; i<dots.length; i++) {
      const dotIndex = i;
      dots[i].addEventListener('click', function() { currIndex = dotIndex; 
                                              showCurr();
        
      })
    }