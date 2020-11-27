$(function(){
    const win=$(window);//得到窗口对象
    const selector = $(".scroll-bar");//获取导航对象
    const left = $("#left");
    const right = $("#right");
    var height = 100;//设置距离顶部偏移量
    var line = 600;
    win.scroll(function(){
      if(win.scrollTop()>= height){
        selector.slideDown(80).css('display','block'); 
      }else{
        selector.slideUp(80);
      }
      if(win.scrollTop()>= line){
        left.addClass("left");
        right.addClass("right");
      }else{
        left.removeClass("left");
        right.removeClass("right");
      }
    })  
    })


    var top = $(".top")[0];
    top.onclick = function(){
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    