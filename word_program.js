console.log("Main Function");

import {wordcheck} from './logic.js';

var h = 0,hit = 0;
document.onkeydown = function(e){
    const d = document.getElementById("word"+hit);
    if(e.keyCode >= 64 && e.keyCode <= 91){
        d.children[h].innerHTML = (e.key).toLocaleUpperCase();
        d.children[h].setAttribute("data-state","active");
        h++;
    }
    if(e.keyCode == 8){
        h--;
        d.children[h].innerHTML = "";
    }
    if(e.keyCode == 13 && h == 5){
        check();
    }
};
async function check(){
    var c = "";
    const word = document.getElementById("word"+hit);
    for(var i=0;i<5;i++){
        c = c + word.childNodes[i].innerHTML;
    }
    console.log(word.children);
    const fill = wordcheck(c);
    console.log(fill);
    for(var p=0;p<5;p++){
        if(fill[p] == 1){
            word.children[p].setAttribute("data-state","correct");
        }
        if(fill[p] == 2){
            word.children[p].setAttribute("data-state","wrong-position");
        }
        if(fill[p] == 0){
            word.children[p].setAttribute("data-state","wrong");
        }
    }
    i=0;
    h=0;
    hit++;
}