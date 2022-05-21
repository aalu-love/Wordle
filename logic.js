import {words as w} from './words.js';

const len = w.length;
const todayword = w[getRandomInt(0,len)];

const res = [0,0,0,0,0];

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

export function wordcheck(word){
    const name = word;
    console.log("Word:",todayword);
    for(var j=0;j<5;j++){
        for(var k=0;k<5;k++){
            if(todayword.toLocaleUpperCase()[j] == name[k]){
                console.log("Present :",k,todayword[j]);
                res[k] = 2;
            }
        }
    }
    for(var i=0;i<5;i++){
        if(todayword.toLocaleUpperCase()[i] == name[i]){
            console.log("Place:",todayword[i]);
            res[i] = 1;
        }
    }
    return res;
}