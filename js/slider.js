let btnNext = document.querySelector('.slider__button-next');
let btnPrev = document.querySelector('.slider__button-prev');

const images = document.querySelectorAll('.slider__image');
const dots = document.querySelectorAll('.slider__navigation-item');
const sliderContainer = document.querySelector('.slider__image-list ');
let currentIndex = 0;

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    imageSlide(index);
    updateStyleDots();
    disableButtons();
  })
})

function imageSlide(index) {
  currentIndex = index;
  let translateXValue = currentIndex * 475;
  sliderContainer.style.transform = `translateX(-${translateXValue}px)`;
  return currentIndex;

}

function updateStyleDots() {
  dots.forEach((dot, index) => {
    dot.firstElementChild.classList.toggle('slider__dot--active', index === currentIndex);
    dot.classList.toggle('slider__navigation-item--active', index === currentIndex);


  });
}

function nextSlide() {
  if (currentIndex < images.length - 1 && currentIndex >= 0) {
    currentIndex += 1;
  } else {
    return currentIndex;
  }
  imageSlide(currentIndex);
  updateStyleDots();
  disableButtons();
  return currentIndex;

}

function prevSlide() {
  if (currentIndex > 0 && currentIndex <= images.length - 1) {
    currentIndex -= 1;
  } else {
    return currentIndex;
  }
  imageSlide(currentIndex);
  updateStyleDots();
  disableButtons();
  return currentIndex;

}

function disableButtons() {
  if (currentIndex === 0) {
    btnPrev.disabled = true;
  } else {
    btnPrev.disabled = false;
  }

  if (currentIndex === images.length - 1) {
    btnNext.disabled = true;
  } else {
    btnNext.disabled = false;
  }
}
disableButtons();
btnNext.addEventListener('click', nextSlide);
btnPrev.addEventListener('click', prevSlide);
