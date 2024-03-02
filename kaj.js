const myBtn = document.querySelector(".MyBtn");
const RulesBox = document.querySelector(".RulesBox");
const exitBtn = document.querySelector(".ExitButton");
const continueBtn = document.querySelector(".ContinueButton");
const Questions = document.querySelector(".Questions");
const timeCount = document.querySelector(".secondscount");
const timeCountLine = document.querySelector(".line");
const reslut_box = document.querySelector(".reslut_box");

myBtn.onclick = ()=>{
    RulesBox.classList.add("activeInfo")
}
exitBtn.onclick = ()=>{
    RulesBox.classList.remove("activeInfo")
}
continueBtn.onclick = ()=>{
    RulesBox.classList.remove("activeInfo");
    Questions.classList.add("activeQuiz")
    showQuestions(0)
    startTimer(15)
    startTimerLine(0)
}
const nextBtn = document.querySelector(".next_que");
const replayBtn = document.querySelector(".restart1");
const quitBtn = document.querySelector(".quit")

let que_count = 0;
let counter;
let countValue = 15;
let counterLine;
let widthValue =0;
let userScore = 0;

replayBtn.onclick = ()=>{
    Questions.classList.add("activeQuiz");
    reslut_box.classList.remove("activeResult")

    let que_count = 0;
    let timeValue = 15;

    let widthValue = 0;
    let userScore =0;
    showQuestions(que_count);
    clearInterval(counter);
    startTimer(timeValue)
    clearInterval(counterLine);
    startTimerLine(widthValue);
    nextBtn.style.display = "none";
    timeOff.textContent = "Time Left";
}

quitBtn.onclick = ()=>{
    window.location.reload()
}
nextBtn.onclick = ()=>{
    if(que_count < questions.length -1){
        que_count++
        showQuestions(que_count)
        clearInterval(counter)
        startTimer(countValue)
        clearInterval(counterLine)
        startTimerLine(widthValue)

    }else{
        console.log("You are completed your task")
        showResultBox()
    }
    nextBtn.style.display = "none";
}

function showQuestions(index){
    let que_text = document.querySelector(".text");
    let que_option = document.querySelector(".MyOptions");
    const que_total = document.querySelector(".total_que");
    let que_tag = "<span>"+ questions[index].numb+"."+ questions[index].question+"</span>";
    let option_tag = "<div class = option>"+questions[index].option[0]+"</div>"
                     +"<div class = option>"+questions[index].option[1]+"</div>"
                     +"<div class = option>"+questions[index].option[2]+"</div>"
                     +"<div class = option>"+questions[index].option[3]+"</div>"
    let total_tag = "<p>"+ questions[index].numb  +" of 5 Questions" +"</p>"
    que_text.innerHTML = que_tag;
    que_option.innerHTML = option_tag;
    que_total.innerHTML = total_tag;
    const options = que_option.querySelectorAll(".option");
    for(let i=0; i<options.length; i++ ){
          options[i].setAttribute("onclick", "optionSelected(this)")
    }
}

let tickIcon = `<div class="tick icon"><i class="fas fa-check"></i></div>`
let timesIcon = `<div class="cross icon"><i class="fas fa-times"></i></div>`

function optionSelected(answer){
    clearInterval(counter)
    clearInterval(counterLine)
    let userAns = answer.textContent ;
    let correctAns = questions[que_count].answer;
    let que_option = document.querySelector(".MyOptions")
    let alloptions = que_option.children.length;
    if(userAns == correctAns){
        userScore += 1;
        console.log(userScore)
        answer.classList.add("correct")
        console.log("Answer is correct")
        answer.insertAdjacentHTML("beforeend", tickIcon)
    }else{
        answer.classList.add("Incorrect")
        console.log("Answer is wrong")
        answer.insertAdjacentHTML("beforeend", timesIcon)
        for(let i=0; i<alloptions; i++){
            if(que_option.children[i].textContent == correctAns){
                que_option.children[i].setAttribute("class", "option correct")
                que_option.children[i].insertAdjacentHTML("beforeend", tickIcon)
            }
        }
    }
    for(let i=0; i<alloptions; i++){
        que_option.children[i].classList.add("disabled")
    }
    nextBtn.style.display = "block";


}

function showResultBox(){
    RulesBox.classList.remove("activeInfo");
    Questions.classList.remove("activeQuiz");
    reslut_box.classList.add("activeResult")
    const score_text = document.querySelector(".score_text")
    if(userScore > 3){
        let score_tag = "<span>Congratulation 👍 You Got <p>"+ userScore+"</p> Out Of <p>"+questions.length+"</p></span>";
        score_text.innerHTML = score_tag;
    }else if(userScore > 1){
        let score_tag = "<span>Carry On 👍 You Got <p>"+ userScore+"</p> Out Of <p>"+questions.length+"</p></span>";
        score_text.innerHTML = score_tag;
    }else{
        let score_tag = "<span>I Am Sorry 👍 You Got <p>"+ userScore+"</p> Out Of <p>"+questions.length+"</p></span>";
        score_text.innerHTML = score_tag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000)
    function timer(){
        timeCount.textContent = time;
        time--
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }if(time < 0){
            clearInterval(counter)
            timeCount.textContent= "00";
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 50)
    function timer(){
        time += 1;
        timeCountLine.style.width = time + "px";
        if(time > 319){
            clearInterval(counterLine)
        }
    }
}