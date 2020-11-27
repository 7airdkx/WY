var show = document.querySelector(".show");
ajax({
    url: 'http://localhost/wykl/data/goodslist.json',
    type: 'get',
    dataType: 'json', // 返回的数据类型 text  json  xml
    cache: true,// 是否使用缓存，默认为false
    success: function (json) {
        var dom = ''
        for (var i = 0, len = json.length; i < len; i++) {
            dom += `<li code="${json[i].code}">
      <img id="bigi" src=${json[i].src} width="230px" height="230px">
      <div class="box">
         <a href=${json[i].src}><img src=${json[i].src} width="30px" height="30px"></a>
         <a href=${json[i].img1}><img src=${json[i].img1} width="30px" height="30px"></a>
         <a href=${json[i].img2}><img src=${json[i].img2} width="30px" height="30px"></a>
         <a href=${json[i].img3}><img src=${json[i].img3} width="30px" height="30px"></a>
      </div>
      <h2>${json[i].price}</h2>
      <h3>${json[i].pri}</h3>
      <p code="${json[i].code}">${json[i].tit}</p>
      <i>自营</i><b>包税</b><br>
      <a href="#">${json[i].shop}</a>
  </li>`
        }
        show.innerHTML = dom
        var bigi = document.getElementById("bigi");
        var box = $(".box")
        var a = document.querySelectorAll(".box>a");
        for (let i = 0; i < a.length; i++) {
            a[i].onmouseover = function () {
                // console.log(this.href);
                a[i].parentNode.previousElementSibling.src = this.href;
                // img.src=this.href;
                return false;
            }
        }
    },
    error: function (code) {
        console.log(code)
    }
})



$('.show').on('click', 'li', function () {
    // 获取当前点击商品的编号
    var code = $(this).attr('code')
    // localStorage  key = value
    //  goods = [{code:'abc1',num:1},{code:'abc2',num:2}]
    // 判断本地存储是否有数据
    var goodsArr
    if (localStorage.getItem('goods')) {
        // console.log(111);
        goodsArr = JSON.parse(localStorage.getItem('goods'))
    } else {
        // console.log(222);
        goodsArr = []
    }
    var hasGoods = false
    if (goodsArr.length > 0) {
        // 判断当前选中商品是否在购物车中
        $.each(goodsArr, function (index, item) {
            // console.log(index)
            // console.log(item)
            if (item.code === code) {// 商品存在购物车中，数量+1
                item.num++
                hasGoods = true
                return false
            }
        })
    }
    // 如果购物车没有当前选中的商品，添加一条数据
    if (!hasGoods) {
        // var objStr = JSON.stringify({code:code,num:1})
        goodsArr.push({ code: code, num: 1 })
    }
    // 更新本地存储的数据
    localStorage.setItem('goods', JSON.stringify(goodsArr))
    alert('添加购物车成功')
})