
let btnNext = document.querySelector('.slider__button-next');
let btnPrev = document.querySelector('.slider__button-prev');

const images = document.querySelectorAll('.slider__image');
const dots = document.querySelectorAll('.slider__navigation-item');
const sliderContainer = document.querySelector('.slider__image-list ');
let currentIndex = 0;
const num = calculatePicsNumber(); // 
console.log(num);


function calculatePicsNumber () {
  console.log(window.innerWidth <= 1024 ? 1 : 3);
  return window.innerWidth <= 1024 ?  1 : 3;

}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
    console.log(dot, index);
    imageSlide(index, num);
    updateStyleDots();
  })
})

function imageSlide(index, num) {
  currentIndex = index;
  let translateXValue = currentIndex * 475; 
  sliderContainer.style.transform = `translateX(-${translateXValue}px)`;
  console.log (`translateX(-${translateXValue}px)` , num, index , currentIndex);

}

function updateStyleDots() {
  dots.forEach((dot, index) => {
    dot.firstElementChild.classList.toggle('slider__dot--active', index === currentIndex);
  });
}
