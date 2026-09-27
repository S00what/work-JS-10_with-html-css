let sec = document.querySelector(".s"),
    min = document.querySelector(".m"),
    hour = document.querySelector(".h"),
    hoursNumber = document.querySelector(".hours"),
    minutesNumber = document.querySelector(".minutes")
now = new Date();
const links = document.querySelectorAll(`.tabsItem`);
const tabs = document.querySelectorAll(`.tabsContentItem`);


let secAngle = now.getSeconds() * 6,
    minAngle = now.getMinutes() * 6 + now.getSeconds() * 0.1,
    hourAngle = (now.getHours() % 12) * 30 + now.getMinutes() * 0.5
//Извините я написал ИИ что-бы он пояснил как это исправить а то идей не было вообще а он просто скинул код
//Но я все прочел внимательно и пытался вникнуть как смог и как я понял он убрал только микро-рывки
//основная работа между плавным скачком делает математика а углы он просто записал в переменные
function clock() {
    let time = new Date();
    secAngle += 6;
    minAngle += 0.1;
    hourAngle += 0.1 / 12;
    sec.style.transition = "transform 1s linear";
    min.style.transition = "transform 1s linear";
    hour.style.transition = "transform 1s linear";
    sec.style.transform = `rotate(${secAngle}deg)`;
    min.style.transform = `rotate(${minAngle}deg)`;
    hour.style.transform = `rotate(${hourAngle}deg)`;
    hoursNumber.innerHTML = time.getHours() < 10 ? `0${time.getHours()}` : `${time.getHours()}`;
    minutesNumber.innerHTML = time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`;
    setTimeout(clock, 1000);
}
clock();

links.forEach((link, i) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        links.forEach((link, i) => {
            link.classList.remove("active");
            tabs[i].classList.remove("active");
        });
        link.classList.add("active");
        tabs[i].classList.add("active");
    });
});
// LOL

let stopWatchBtn = document.querySelector('.stopwatch__btn'),
    stopWatchSec = document.querySelector('.stopwatch__seconds'),
    stopWatchMin = document.querySelector('.stopwatch__minutes'),
    stopWatchHours = document.querySelector('.stopwatch__hours'),
    idk = document.querySelector('.idk'),
    stopWatchSeconds = 0,
    stopWatchMinutes = 0,
    stopWatchHour = 0,
    recursion = false,
    stopWatchBtnStopper = document.querySelector('.stopwatch__btn-stopper'),
    stopWatchBtnFlag = document.querySelector('.stopwatch__btn-flag'),
    stopWatchBtnSetFlag = document.querySelector('.stopwatch__btn-set_flag');

function stopWatch() {
    if (recursion) {
        stopWatchSec.innerHTML = `${stopWatchSeconds}`
        if (stopWatchSeconds >= 60) {
            stopWatchSeconds = 0
            stopWatchMinutes++
            stopWatchMin.innerHTML = `${stopWatchMinutes}`
        } else if (stopWatchMinutes >= 60) {
            stopWatchMinutes = 0
            stopWathcHour++
            stopWatchHours.innerHTML = `${stopWatchHour}`
        } else if (stopWatchHour >= 24) {
            stopWatchHour = 0
            stopWatchMinutes = 0
            stopWatchSeconds = 0
            idk.innerHTML = 'hours > 24'
        }
        stopWatchSeconds++
        setTimeout(() => stopWatch(), 1000)
    }
}
stopWatchBtn.addEventListener('click', () => {
    if (recursion === true) recursion = false
    else recursion = true
    stopWatch()
    stopWatchBtn.toggleAttribute('activated')
    if (stopWatchBtn.hasAttribute('activated')) {
        stopWatchBtn.innerHTML = 'stop'
    } else {
        stopWatchBtnStopper.classList.add('stopwatch__btn')
        stopWatchBtnStopper.innerHTML = 'reset'
        stopWatchBtnStopper.style.display = 'flex'
        stopWatchBtnStopper.addEventListener('click', () => {
            stopWatchSeconds = 0
            stopWatchMinutes = 0
            stopWatchHour = 0
            stopWatchHours.innerHTML = `${stopWatchHour}`
            stopWatchMin.innerHTML = `${stopWatchMinutes}`
            stopWatchSec.innerHTML = `${stopWatchSeconds}`
            stopWatchBtnStopper.classList.remove('stopwatch__btn')
            stopWatchBtnStopper.innerHTML = null
            stopWatchBtnStopper.style.display = 'none'
        })
        stopWatchBtn.innerHTML = 'start'
        stopWatchBtnFlag.innerHTML = 'flag'
        stopWatchBtnFlag.style.display = 'flex'
        stopWatchBtnFlag.classList.add('stopwatch__btn')
        stopWatchBtnFlag.addEventListener('click', () => {
            let flag = {
                stopWatchHour: stopWatchHour,
                stopWatchMinutes: stopWatchMinutes,
                stopWatchSeconds: stopWatchSeconds
            }
            stopWatchBtnSetFlag.style.display = 'flex'
            stopWatchBtnSetFlag.classList.add('stopwatch__btn')
            stopWatchBtnSetFlag.innerHTML = 'set flag'
            stopWatchBtnSetFlag.addEventListener('click', () => {
                stopWatchBtnSetFlag.style.display = 'none'
                stopWatchBtnFlag.style.display = 'none'
                stopWatchHour = flag.stopWatchHour
                stopWatchMinutes = flag.stopWatchMinutes
                stopWatchSeconds = flag.stopWatchSeconds
                stopWatchHours.innerHTML = `${stopWatchHour}`
                stopWatchMin.innerHTML = `${stopWatchMinutes}`
                stopWatchSec.innerHTML = `${stopWatchSeconds}`
            })
        })
    }
})
