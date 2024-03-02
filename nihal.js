const MyBtn = document.querySelector(".MyBtn");
const RulesBox = document.querySelector(".RulesBox");
const ExitButton = document.querySelector(".ExitButton");
const ContinueButton = document.querySelector(".ContinueButton");
const Questions = document.querySelector(".Questions");
const NextBtn = document.querySelector(".next_que");
const timeCount = document.querySelector(".secondscount")


MyBtn.onclick = ()=>{
    RulesBox.classList.add("activeInfo")
}

ExitButton.onclick = ()=>{
    RulesBox.classList.remove("activeInfo")
}

ContinueButton.onclick = ()=>{
    RulesBox.classList.remove("activeInfo");
    Questions.classList.add("activeQuiz")
    showQuestions(0)
    startTimer(15)
}

let que_count = 0;
let counter;
let timeValue = 15;

NextBtn.onclick = ()=>{
    if(que_count < questions.length -1){
        que_count++
        showQuestions(que_count)
        clearInterval(counter)
        startTimer(timeValue)
    }else{
        console.log("You Have Completed Your Task")
    }
}

function showQuestions(index){
    let que_text = document.querySelector(".text");
    let que_option = document.querySelector(".MyOptions");
    let total_que = document.querySelector(".total_que");
    let que_tag = '<span>'+questions[index].numb+"."+questions[index].question+'</span>';
    let option_tag =  `<div class =option>`+questions[index].option[0]+`</div>`
                     + `<div class =option>`+questions[index].option[1]+`</div>`
                     + `<div class =option>`+questions[index].option[2]+`</div>`
                     + `<div class =option>`+questions[index].option[3]+`</div>`;
    let total_tag = '<p>'+questions[index].numb+ " of 5 questions"+'</p>'
    que_text.innerHTML = que_tag;
    que_option.innerHTML = option_tag;
    total_que.innerHTML = total_tag;
    let options = que_option.querySelectorAll(".option");
    for(let i=0; i<options.length; i++){
        options[i].setAttribute("onclick", "optionSelected(this)")
    }
}

let tickIcon = `<div class="tickIcon"><i class="fas fa-check"></i></div>`;
let crossIcon = `<div class="crossIcon"><i class="fas fa-times"></i></div>`;

function optionSelected(answer){
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let que_option = document.querySelector(".MyOptions");
    let alloptions = que_option.children.length;
    if(userAns == correctAns){
        answer.classList.add("correct")
        console.log("Answer is correct")
        answer.insertAdjacentHTML("beforeend", tickIcon)
    }else{
        answer.classList.add("Incorrect")
        console.log("Answer is wrong")
        answer.insertAdjacentHTML("beforeend", crossIcon)
        for(let i=0; i<alloptions; i++){
            if(que_option.children[i].textContent == correctAns){
               que_option.children[i].setAttribute("class", "option correct")
               que_option.children[i].insertAdjacentHTML("beforeend", tickIcon)
            }
       }
    }
     for(let i=0; i<alloptions ; i++){
        que_option.children[i].classList.add("disabled")
     }


}


function startTimer(time){
      counter = setInterval(timer, 1000)
      function timer(){
        timeCount.textContent = time;
        time--
        if(time<9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }if(time < 0){
            clearInterval(counter)
            timeCount.textContent = "00"
        }
      }
}
