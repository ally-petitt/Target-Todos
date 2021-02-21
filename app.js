//variables
var pos = document.querySelector('.circle').style.top;
const circle = document.querySelector('.circle');
const distMoved = 1;

//classes
class Movecircle {
    constructor(e) {
        this.e = e;
    }
    moveUp() {
        pos -= distMoved;
    }
}

const moveCirc = new Movecircle();
//event listeners
document.addEventListener('keydown', function(event) {
    checkKey(event.key);
});



//functions
function checkKey(key) {
    //checks which key was pressed
    switch(key) {
        case "ArrowUp":
            moveCirc.moveUp();
            break;
    }
}





