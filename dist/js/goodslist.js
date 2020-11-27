"use strict";

var show = document.querySelector(".show");
ajax({
  url: 'http://localhost/wykl/pages/data/goodslist.json',
  type: 'get',
  dataType: 'json',
  // 返回的数据类型 text  json  xml
  cache: true,
  // 是否使用缓存，默认为false
  success: function success(json) {
    var dom = '';

    for (var i = 0, len = json.length; i < len; i++) {
      dom += "<li code=\"".concat(json[i].code, "\">\n      <img id=\"bigi\" src=").concat(json[i].src, " width=\"230px\" height=\"230px\">\n      <div class=\"box\">\n         <a href=").concat(json[i].src, "><img src=").concat(json[i].src, " width=\"30px\" height=\"30px\"></a>\n         <a href=").concat(json[i].img1, "><img src=").concat(json[i].img1, " width=\"30px\" height=\"30px\"></a>\n         <a href=").concat(json[i].img2, "><img src=").concat(json[i].img2, " width=\"30px\" height=\"30px\"></a>\n         <a href=").concat(json[i].img3, "><img src=").concat(json[i].img3, " width=\"30px\" height=\"30px\"></a>\n      </div>\n      <h2>").concat(json[i].price, "</h2>\n      <h3>").concat(json[i].pri, "</h3>\n      <p code=\"").concat(json[i].code, "\">").concat(json[i].tit, "</p>\n      <i>\u81EA\u8425</i><b>\u5305\u7A0E</b><br>\n      <a href=\"#\">").concat(json[i].shop, "</a>\n  </li>");
    }

    show.innerHTML = dom;
    var bigi = document.getElementById("bigi");
    var box = $(".box");
    var a = document.querySelectorAll(".box>a");

    var _loop = function _loop(_i) {
      a[_i].onmouseover = function () {
        // console.log(this.href);
        a[_i].parentNode.previousElementSibling.src = this.href; // img.src=this.href;

        return false;
      };
    };

    for (var _i = 0; _i < a.length; _i++) {
      _loop(_i);
    }
  },
  error: function error(code) {
    console.log(code);
  }
});
$('.show').on('click', 'li', function () {
  // 获取当前点击商品的编号
  var code = $(this).attr('code'); // localStorage  key = value
  //  goods = [{code:'abc1',num:1},{code:'abc2',num:2}]
  // 判断本地存储是否有数据

  var goodsArr;

  if (localStorage.getItem('goods')) {
    // console.log(111);
    goodsArr = JSON.parse(localStorage.getItem('goods'));
  } else {
    // console.log(222);
    goodsArr = [];
  }

  var hasGoods = false;

  if (goodsArr.length > 0) {
    // 判断当前选中商品是否在购物车中
    $.each(goodsArr, function (index, item) {
      // console.log(index)
      // console.log(item)
      if (item.code === code) {
        // 商品存在购物车中，数量+1
        item.num++;
        hasGoods = true;
        return false;
      }
    });
  } // 如果购物车没有当前选中的商品，添加一条数据


  if (!hasGoods) {
    // var objStr = JSON.stringify({code:code,num:1})
    goodsArr.push({
      code: code,
      num: 1
    });
  } // 更新本地存储的数据


  localStorage.setItem('goods', JSON.stringify(goodsArr));
  alert('添加购物车成功');
});