let cells = document.querySelectorAll('#array td')
let modal = document.querySelector('#modal')
let wrapper = document.querySelector('.wrapper')
let refreshbtn = document.querySelector('.refresbtn')

let refresh = document.querySelector('.refresh')
// refresh.addEventListener('click', ()=>{
//     location.reload()
// })


//значение this - это обьект перед точкой, который используется для вызова метода
function start(cells) {
    let gameover = false;
    let i = 0
    for (let cell of cells) {

        cell.addEventListener('click', function step() {
            if (gameover) {
                return;
            }
            if (i % 2 == 0) {
                this.textContent = '✕'
            } else {
                this.textContent = 'O'
            }

            this.removeEventListener('click', step)

            if (outcome(cells)) {
                gameover = true;
                modal.style.display = 'block'
                modal.textContent = `${this.textContent} won`
                wrapper.style.height = '470px'
                refresh.style.display = 'block'
            } else if(i == 8) {
                modal.style.display = 'block'
                modal.textContent = `tie`
                wrapper.style.height = '470px'
                gameover = true;
            }

            i++;
        })
    }
}
function outcome(cells) {
    let ways = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    //проверяем по очереди в цикле проверяются все возможные комбинации и в результате если есть совпавшие комбинации то функция возвращает true
    for (let way of ways) {
        if (cells[way[0]].textContent == cells[way[1]].textContent &&
            cells[way[1]].textContent == cells[way[2]].textContent &&
            cells[way[0]].textContent != '') {
            return true;
        }

    }
    return false;
}


 


refresh.addEventListener('click', ()=>{
   
    for(let cell of cells) {
        cell.textContent = '';
        
    }
    modal.textContent = ``;
    modal.style.display = 'none'
    wrapper.style.height = '410px'
    start(cells);
})

start(cells);
