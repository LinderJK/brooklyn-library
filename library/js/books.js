const itemBook = document.querySelectorAll('.favorites__item');
const container = document.querySelector('.favorites-list');
const radioFavorites = document.querySelectorAll('input[type="radio"]');

let numberOfCheck = 0

const booksArray = Array.from(itemBook);
const groups = [];

while (booksArray.length >= 1) {
  groups.push(booksArray.splice(0, 4));
}

function booksVisible () {
    groups.forEach ((group, index) => {
        hideBooks(group);
        showBooks();
        
    })
}

function showBooks () {
    groups[numberOfCheck].forEach ((elem, index) => {
        elem.classList.remove('favorites-item--hide');
        elem.classList.add('favorites-item--active');
    })

}

function hideBooks (group) {
    group.forEach((book, index) => {
        book.classList.remove('favorites-item--active');
        book.classList.add('favorites-item--hide');
    })
}

radioFavorites.forEach ((elem, index)=>{
    elem.addEventListener('click', ()=>{
        if (elem.checked) {
            numberOfCheck = index;
            booksVisible();
        }
        
    })
    
})

booksVisible();
//TODO fix fade in animation