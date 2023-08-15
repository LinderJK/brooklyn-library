// function hideSliderImage() {
//     const sliderImages = document.querySelectorAll('.slider__image');
//     if (window.innerWidth <= 1024) {
//
//         sliderImages.forEach(function (element, index) {
//             if (index === 0) {
//                 element.style.display = 'block';
//             } else {
//                 element.style.display = 'none';
//             }
//         });
//
//     } else {
//         sliderImages.forEach(function (element) {
//             element.style.display = 'block';
//         });
//     }
// }

// window.addEventListener('load', hideSliderImage);
// window.addEventListener('resize', hideSliderImage);

let items = document.querySelectorAll('.slider__image');
let container = document.querySelector ('.slider__image-list ');
let btnNext =  document.querySelector('.slider__button-next');
let btnPrev = document.querySelector('.slider__button-prev');
let dots = document.querySelectorAll('.slider__navigation-item');

console.log (dots);
console.log(container);

btnPrev.onclick = function () {
  return console.log('prev');
};
btnNext.onclick = function () {
  return console.log('next');
};

dots.forEach( (elem, index)=> {
  elem.addEventListener('click', function (event) {
    console.log('ok');
    console.log(index);
    if (index === 1 ) {
      container.classList.add("trasition-right");
      dots[1].firstElementChild.classList.add('slider__dot--active');
      dots[0].firstElementChild.classList.remove('slider__dot--active');
    }
  })
})

// dots.onclick = function (){
//   // dots.forEach((elem)=>{
//   //
//   //
//   // }
//   return console.log ('ok')
// }





console.log(items);
let position = 0;

const showSlide = 3;
const scrollSlide = 1;

const itemWidth = container.offsetWidth/ showSlide;

console.log (itemWidth);





// slider__item   = track

//slider__image-list  = track

//slider__image = item

