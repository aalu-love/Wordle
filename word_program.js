console.log("Main Function");

import {wordcheck,todayword} from './logic.js';
import {dictionary as dic} from './words.js';

var h = 0,hit = 0;
var c = "";
document.onkeydown = function(e){
    const d = document.getElementById("word"+hit);
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
    if(e.keyCode == 13 && h == 5){
        check();
    }
    if(hit > 5){
        alert("Today's word: "+todayword);
    }
    console.log(h);
};

async function check(){
    const wrd = document.getElementById("word"+hit);
    for(var i=0;i<5;i++){
        c = c + wrd.childNodes[i].innerHTML;
    }
    const fill = wordcheck(c);
    if(c.length == 5){
        if(isIn(c)==true){
            console.log("Call");
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
            alert("Not is the word list.");
        }
    }else{
        alert("Not enough letter.");
    }
    i=0;
}
function isIn(x){
    if(dic.includes(x.toLocaleLowerCase()) == false){
        return false;
    }
    return true;
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
      submitGuess()
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

function submitGuess() {
    check();
    c="";
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