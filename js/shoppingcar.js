if (localStorage.getItem('goods')) {// 有数据
    // 获取本地存储中购物车的数据
    var goodsArr = JSON.parse( localStorage.getItem('goods') )
    // 获取数据
    $.ajax({
      url: 'http://localhost/wykl/pages/data/goodslist.json',
      type: 'get',
      dataType: 'json',
      success: function (json){
        var domStr = ''
        $.each(goodsArr,function (index,item){  
          $.each(json,function (ind,obj){
            console.log(goodsArr);
            if ( item.code === obj.code ) {
                
              domStr += `      
        <li>
            <input type="checkbox">
            <img src="${obj.src}" width="120px" height="120px">
            <h4>${obj.tit}</h4>
            <div class="bb">
            <i>${obj.pri}</i><br>
            <b>${obj.price}</b>
            </div>
            <span>${item.num}</span>
            <button code="${obj.code}">X</button>
        </li>
              `
            }
          })
        })
        $('#list ul').html(domStr)
      }
    })
    // 商品移出购物车
    $('.list').on('click','li button',function (){
      // 删除该商品对应的li
      $(this).parent().remove()
      // 更新本地存储中的数据
      var code = $(this).attr('code') // 要删除商品的编号
      // 删除数组元素：pop()  unshift()  splice(index,1)
      $.each(goodsArr,function (index,item){
        if (item.code === code) {
          goodsArr.splice(index,1)
          return false
        }
      })
      // 判断购物车是否还有数据
      if (goodsArr.length > 0) {
        // 更新本地数据
        localStorage.setItem('goods',JSON.stringify(goodsArr))
      } else {
        // 清除本地数据
        localStorage.removeItem('goods')
        var nodata = '<li style="line-height: 70px; text-align: center;">购物车暂无数据！<a href="http://localhost/wykl/pages/goodslist.html">去逛逛</a></li>'
        $('.list').html(nodata)
      }
      alert('商品移出购物车成功！')
    })
  } else {// 没数据
    var nodata = '<li style="line-height: 70px; text-align: center;">购物车暂无数据！<a href="http://localhost/wykl/pages/goodslist.html">去逛逛</a></li>'
    $('.list').html(nodata)
  }