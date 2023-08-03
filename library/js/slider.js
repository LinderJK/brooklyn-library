function hideSliderImage() {
    const sliderImages = document.querySelectorAll('.slider__image');
    if (window.innerWidth <= 1024) {

        sliderImages.forEach(function (element, index) {
            if (index === 0) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        });

    } else {
        sliderImages.forEach(function (element) {
            element.style.display = 'block';
        });
    }
}

window.addEventListener('load', hideSliderImage);
window.addEventListener('resize', hideSliderImage);

