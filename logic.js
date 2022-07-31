import {words as w} from './words.js';

const len = w.length;
export const todayword = w[getRandomInt(0,len)];

//console.log("Word:",todayword);


export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

export function wordcheck(word){
    const res = [0,0,0,0,0];
    const name = word;
    for(var j=0,i=0;j<5,i<5;j++,i++){
        if(todayword.toLocaleUpperCase().includes(name[i])){
            //console.log("Present :",k,todayword[j]);
            res[i] = 2;
        }
        if(todayword.toLocaleUpperCase()[j] == name[i]){
            //console.log("Place:",todayword[i]);
            res[i] = 1;
        }
    }
    return res;
}