// import {questionsArray} from './questions.js';
// console.log(questionsArray);

console.log("sachin");
const start_btn = document.querySelector(".start__game button");
const info_box = document.querySelector(".info__rules");
const exit_btn = info_box.querySelector(".buttons .exit__Quiz");
const continue_btn= info_box.querySelector(".buttons .continue__Quiz");
const option_list = document.querySelector(".option__list");
const quiz_box = document.querySelector(".quiz__box");

const timeCount = quiz_box.querySelector(".timer .second");
const timeLine = quiz_box.querySelector("header .time_line");
    
// if start button clicked
start_btn.onclick = ()=>{
    console.log("start button were clicked");
    info_box.classList.add("activeInfo");
    
}

// if exit button clicked
exit_btn.onclick = ()=>{
    console.log("exit button were clicked");
    info_box.classList.remove("activeInfo");
    
}

// if continue button clicked
continue_btn.onclick = ()=>{
    console.log("continue button were clicked");
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestion(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let que_count = 0;

let que_num = 1;
let counter;
let timeValue = 15;

let widthValue = 0;

const next_btn = quiz_box.querySelector(".next__btn");

// if the next button were clicked 
next_btn.onclick = ()=>{
    if(que_count < question.length - 1){
        que_count++;
        que_num++;
        showQuestion(que_count);
        queCounter(que_num);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(timeValue);
    }
    else{
        alert("Question Completed");
    }
}
 
function showQuestion(index){
    const que_text = document.querySelector(".question__");
   
    
    let que_tag = `<span>`+ question[index].id +"."+ question[index].question +`</span>`

    let option_tag = ` <div class="options"><span>`+question[index].options[0] +`</span> </div>`
                    +`<div class="options"><span>`+question[index].options[1] +`</span> </div> `
                    +  `<div class="options"><span>`+question[index].options[2] +`</span> </div>`
                    +`<div class="options"><span>`+ question[index].options[3]+`</span> </div>`;
    
    

    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".options");
    for(let i = 0;i<option.length;i++){
        option[i].setAttribute("onclick","optionSelected(this)");
    }
    
    
}

let tickIcon = `<div class="icon tick"><i class="fas fa-clock"></i></div>`;
let crossIcon = ` <div class="icon cross"><i class="fas fa-times"></i></div>`;


function optionSelected(ans){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = ans.textContent;
    let correctAns = question[que_count].answer;
    let allOptions = option_list.children.length;
    if(correctAns == userAns)
    {
        console.log("correct answer");
        ans.classList.add("correct");
        ans.insertAdjacentHTML("beforeend",tickIcon); 
    } 
    else{
        ans.classList.add("incorrect");
        ans.insertAdjacentHTML("beforeend",crossIcon);
        console.log("Answer is incorrect");
        
        for(let i = 0;i<allOptions;i++){
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class","options correct");
                option_list.children[i].insertAdjacentHTML("beforeend",tickIcon); 
            }
        }
    }
    
    for(let i = 0 ;i<allOptions ;i++){
        option_list.children[i].classList.add("disable");
    }
   
}






function queCounter(index){
    const total_que = document.querySelector(".total__ques");
    let total_tag = `<span><p> `+ (index) +`</p>of<p>`+ question.length +`</p>Questions</span>`;
    total_que.innerHTML = total_tag;                
}

function startTimer(time){
    counter = setInterval(timer,1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time<9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time<0){
            clearInterval(counter);
            timeCount.textContent = "00";
            
        }
    }
}


function startTimerLine(time){
    counterLine = setInterval(timer,25);
    function timer(){
        time+=1;
        timeLine.style.width = time + "px";
        if(time>600){
            clearInterval(counter);
         }
    }
}