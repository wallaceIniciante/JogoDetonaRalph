const state = {
    view:{
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score')
    },
    values:{
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curreTime:60,
        
    },
    actions:{
        timerId:setInterval(randomSquare,1000),
        countDownTimerId: setInterval(countDown,1000)
    },
    sound:{
        sound_acert: 'sound_acert.mp3'
    }
}
function countDown()
{
    state.values.curreTime--
    state.view.timeLeft.textContent = state.values.curreTime

    if(state.values.curreTime <= 0)
    {
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        alert('Game Over! O seu resultado foi: ' + state.values.result)
        
    }
}
function playSound(name_sound)
{
    let audio = new Audio('src/audios/' + name_sound)
    //audio.volume = 0.2
    audio.play()
}
function randomSquare()
{
    state.view.squares.forEach((square)=>{
        square.classList.remove('enemy')
    })
}
function moveEnemy()
{


    //state.values.timerId = setInterval(randomSquare1,state.values.gameVelocity)
    state.values.timerId = setInterval(()=>{
        let randomNumber = Math.floor(Math.random() * 9)
        let randomSquare1 = state.view.squares[randomNumber]

        state.values.hitPosition = randomSquare1.id
        randomSquare()
        randomSquare1.classList.add('enemy')
    },state.values.gameVelocity)
}



//randomSquare.classList.add('enemy')

function addListenerHitBox()
{
    state.view.squares.forEach((square)=>{
        square.addEventListener('mousedown',()=>{
            if(square.id === state.values.hitPosition)
            {
                state.values.result++
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null

                playSound(state.sound.sound_acert)
          

            }
        })
     })
}
function initialize(){

    moveEnemy()
    addListenerHitBox()
}

initialize()