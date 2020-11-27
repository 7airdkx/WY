var tup = document.querySelector(".tup");
var bigimg = document.querySelector(".bigimg");
var img = document.querySelector(".bigimg>img");
var mark = document.querySelector(".mark");
var dianji = document.querySelector("#dianji");
var ul = document.querySelector(".fj");
var a= ul.getElementsByTagName('a');
tup.onmouseover = function(){
    mark.style.display = "block";
    bigimg.style.display = 'block';
}
tup.onmouseout = function(){
    mark.style.display = "none";
    bigimg.style.display = 'none';
}
tup.onmousemove = function(eve){
    var e = eve || event;
    var l = e.clientX - tup.offsetLeft - 100;
    var t = e.clientY - tup.offsetTop - 100;
    if(l <= 0){
        l = 0;
    }
    if(l >= 200){
        l = 200;
    }
    if(t <= 0){
        t = 0;
    }
    if(t >= 200){
        t = 200;
    }
    mark.style.left = l + 'px';
    mark.style.top = t + 'px';
    img.style.left = l * -2 +'px';
    img.style.top = t * -2 +'px';
}
for(var i=0;i<a.length;i++){
    a[i].onclick=function(){
        dianji.src = this.href;
        img.src=this.href;
        return false;
    }
}

var up=document.querySelector(".up");
var down=document.querySelector(".down");
var shu = document.querySelector(".shu")


up.onclick = function(){
    var n = shu.value
    shu.value = Number(n)+1;
    if(shu.value>=99){
        shu.value=99;
    }
}
down.onclick = function(){
    var n = shu.value
    shu.value = Number(n)-1;
    if(shu.value<=1){
        shu.value=1;
    }
}