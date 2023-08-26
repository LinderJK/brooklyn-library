const itemBook = document.querySelectorAll('.favorites__item');
console.log(itemBook);
const  radioFavorites = document.querySelectorAll('input[type="radio"]');
console.log(radioFavorites);

let numberOfCheck = 0

const booksArray = Array.from(itemBook);
const groups = [];

while (booksArray.length >= 1) {
  groups.push(booksArray.splice(0, 4));
}

console.log(groups);
console.log (typeof groups);
console.log(groups[0]);

function hideBooks () {
    itemBook.forEach ((elem, index) => {
        console.log (elem, index);
        elem.style.display = 'none';
    })
}

function showBooks () {
    groups[numberOfCheck].forEach ((elem, index) => {
        elem.style.display = 'block';
    })

}


function updateRadio () {
    radioFavorites.forEach
}

radioFavorites.forEach ((elem, index)=>{
    elem.addEventListener('click', ()=>{
        if (elem.checked) {
            console.log(index);
            numberOfCheck = index;
            hideBooks();
            showBooks();
            
        }
        
    })
    
})

hideBooks();
showBooks();

