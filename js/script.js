function shoWHide(el) { // string id
    var e = document.getElementById(el);
    switch (true) {
        case e.classList.contains("hide"):
            e.classList.add("show");
            e.classList.remove("hide");
            break;

        case e.classList.contains("show"):
            e.classList.add("hide");
            e.classList.remove("show");
            break;

        default:
            e.classList.add("hide");
            break;
    }
}


var mess= document.getElementById('upozorenje');

var reci = ["CAT", "DOG", "TIGER", "ANTILOPA", "LEOPARD", "CROCODILE", "COW", "LION", "CHICKEN", "FOX"];

var rec="";

var pokusajiSlova = ['']; //id pokusaji
var pokusajiReci = ['']; //id pokusaji1

function ispisiPokusaje(niz,id) {
    document.getElementById(id).innerHTML = "";
    for (let i = 0; i < niz.length; i++) {
        document.getElementById(id).innerHTML += niz[i] +"  ";
    }
}

function createSpans(rec) {
    var span;
    for (let i = 0; i < rec.length; i++) {
        span = document.createElement("SPAN");
        var t = document.createTextNode("_");
        span.setAttribute("id", "span"+i);
        span.setAttribute("class", "span");
        span.setAttribute("data-slovo", rec[i]);
        document.getElementById("rec").appendChild(span);
        span.appendChild(t);
    }
}

function chooseWord() {
    var r = Math.floor(Math.random()*10)+1;
    rec = reci[r-1];
    return rec;
}


function start() {
    shoWHide("play");
    shoWHide("game");
    shoWHide("reset");
    shoWHide("h1");
    shoWHide("pp");
}

function removeSpans(id) {
    const p = document.getElementById(id);
    p.innerHTML = '';
}

function reset() {
    window.location.reload();
}

function play() {
    start();
    rec = chooseWord();
    createSpans(rec);
    return rec;
}

function beleska(unos,niz){
    if(niz.indexOf(unos) < 0){
        niz.push(unos);
        console.log(niz);
    }
}

function ubaciSlovo(unos) {
    var duzina = document.getElementById("rec").childElementCount;
    for (let i = 0; i < duzina; i++) {
        var data = document.getElementById("span"+i).getAttribute('data-slovo');
        if(data == unos ) document.getElementById("span"+i).innerHTML = unos;
        beleska(unos,pokusajiSlova);
        
    }
}

function goodEnd(unos) {
    document.getElementById('igra').innerHTML="<p id='good'>Your man is saved! <br> Word : "+ rec+"</p> ";
    document.getElementById('wrapper').style.backgroundColor = "green";
}

function badEnd(unos) {
    document.getElementById('igra').innerHTML="<p id='bad'>You hanged man! <br> The word was : "+ rec + "</p>";
    document.getElementById('wrapper').style.backgroundColor = "red";
}

function ubaciRec(unos) {
    var duzina = unos.length;
    for (let i = 0; i < duzina; i++) {
        document.getElementById("span"+i).innerHTML = unos[i];
        goodEnd(unos);
        
    }
}

function pokusano(pokusaji,unos){
    if(pokusaji.indexOf(unos)>=0) 
    return true;
}

var i = 10;
var bul = true;
function greska(bul){
    if(!bul) {
        document.getElementById('img').setAttribute("src", "img/s"+ (i-1) + ".png");
        i--;
    }
    if(i==0) badEnd(unos);
}

var niz =[];
function stanje() {
    var duzina = document.getElementById("rec").childElementCount;
    var html = document.getElementsByClassName("span");
    for (let i = 0; i < duzina; i++) {
        niz[i] = html[i].innerHTML;
    }
    return niz;
}

function proveraSlova(unos) {
    if(rec.indexOf(unos)> -1){
        mess.innerHTML = "Good work! The letter is in the word! <br>Keep going!";
        ubaciSlovo(unos);
        beleska(unos,pokusajiSlova);  
        bul = true;
        return bul;

    } else{
        mess.innerHTML = "Too bad! The letter isn't in the word! <br>Keep going!";
        beleska(unos,pokusajiSlova);  
        bul = false;
        return bul;
        
    }
}

function proveraReci(unos){
    if(rec == unos){
        mess.innerHTML = "Well done! You found the word !!!";
        ubaciRec(unos);
        bul = true;
        return bul;
    }
    else{
        mess.innerHTML = "To bad! That's not the word that you need!<br> Keep going!";
        beleska(unos,pokusajiReci); 
        bul = false;
        return bul;
    }
}

function checkIt(){
    var unos = document.getElementById('unos').value;
    mess.innerHTML = "";
    unos = unos.trim();
    unos = unos.toUpperCase();
    if(unos.indexOf(" ")>0){
        mess.innerHTML = "The attempt must be without space! <br> Try again!";
    }

    if(unos.length > 0 ){
        if(unos.length == 1){
            if(pokusano(pokusajiSlova,unos))
            mess.innerHTML = "You've already tried this! Try something else!";
            else {
                pokusajiSlova.push(unos);
                proveraSlova(unos);
                niz=stanje();
                if(niz.indexOf("_")==-1)goodEnd(unos);
                ispisiPokusaje(pokusajiSlova,"pokusaji");
                greska(bul);
                
            }
        } else if(unos.length == rec.length){
            if(pokusano(pokusajiReci,unos))
            mess.innerHTML = "You've already tried this! Try something else!";
            else {
                pokusajiReci.push(unos);
                proveraReci(unos);
                ispisiPokusaje(pokusajiReci,"pokusaji1");
                greska(bul);
               
            }
        } else {
            mess.innerHTML = "Try ONE letter or try the ENTIRE word (then the length of the entry has the number of dashes)";
        }
    } else {
        mess.innerHTML = "You didn't enter anything!";
    }

}