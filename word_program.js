console.log("Main Function");

import {wordcheck,todayword} from './logic.js';
import {dictionary as dic} from './words.js';

var h = 0,hit = 0;
var c = "";
console.log(todayword);

document.onkeydown = async function(e){
    const d = document.getElementById("word"+hit);
    
    var guessedWord = "";

    for(var i=0;i<5;i++){
        guessedWord = guessedWord + d.childNodes[i].innerHTML;
    }
    console.log(guessedWord);

    if(guessedWord.length <= 5){
        if(e.key.match(/^[a-z]$/)){
            d.children[h].innerHTML = (e.key).toLocaleUpperCase();
            d.children[h].setAttribute("data-state","active");
            h++;
        }
        if(e.keyCode == 8){
            if(h <= 0){
                h=0;
            }else{
                h--;
                d.children[h].innerHTML = "";
                d.children[h].setAttribute("data-state","");
            }
        }
        if(e.keyCode == 13){
            check();
        }
    }
};

async function check(){
    var flag = 0;
    const wrd = document.getElementById("word"+hit);
    c=""
    for(var i=0;i<5;i++){
        c = c + wrd.childNodes[i].innerHTML;
    }
    const fill = wordcheck(c);
    if(c.length >= 5){
        if(isIn(c)==true){
            for(var p=0;p<5;p++){
                if(fill[p] == 1){
                    wrd.children[p].setAttribute("data-state","correct");
                }
                if(fill[p] == 2){
                    wrd.children[p].setAttribute("data-state","wrong-position");
                }
                if(fill[p] == 0){
                    wrd.children[p].setAttribute("data-state","wrong");
                }
            }
            hit++;
            h=0;
        }else{
            showAlert("Not is the word list.");
        }
    }else{
        showAlert("Not enough letter.");
    }
    for(var ch=0;ch<5;ch++){
        if(fill[ch] == 1){
            flag = 1;
        }else{
            flag = 0;
        }
    }
    checkhits();
    if(flag == 1){
        showAlert("You Win.");
        hit = 6;
    }
    i=0;
}
function isIn(x){
    if(dic.includes(x.toLocaleLowerCase()) == false){
        return false;
    }
    return true;
}

function checkhits(){
    if(hit == 6){
        showAlert("Today's word: "+todayword);
    }
    return;
}

startInteraction()
  
function startInteraction() {
  document.addEventListener("click", handleMouseClick)
}

function stopInteraction() {
  document.removeEventListener("click", handleMouseClick)
}

function handleMouseClick(e) {
    if (e.target.matches("[data-key]")) {
        if(c.length <= 5){
            pressKey(e.target.dataset.key)
            return
        }
    }
  
    if (e.target.matches("[data-enter]")) {
      check()
      return
    }
  
    if (e.target.matches("[data-delete]")) {
      deleteKey()
      return
    }
}

function pressKey(key) {
    const d = document.getElementById("word"+hit);
    d.children[h].textContent = key.toLocaleUpperCase();
    d.children[h].setAttribute("data-state","active");    
    h++;
    console.log(h);
}

function deleteKey() {
    const d = document.getElementById("word"+hit);
    if(h <= 0){
        h=0;
    }else{
        h--;
        d.children[h].innerHTML = "";
        d.children[h].setAttribute("data-state","");
    }
}

const alertContainer = document.querySelector("[data-alert-container]")
function showAlert(message, duration = 1000) {
    const alert = document.createElement("div")
    alert.textContent = message
    alert.classList.add("alert")
    alertContainer.prepend(alert)
    if (duration == null) return
  
    setTimeout(() => {
      alert.classList.add("hide")
      alert.addEventListener("transitionend", () => {
        alert.remove()
      })
    }, duration)
}