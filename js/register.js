var btn1 = document.querySelector(".zc");
var btn2 = document.querySelector(".dl");
var inp = document.querySelectorAll("input");

btn1.onclick = function () {
    ajax({
        url: 'http://localhost/wykl/data/user.php',
        type: 'get',
        data: {
            user: inp[0].value,
            pass: inp[1].value,
            tt: 'add'
        },
        dataType: 'json', // 返回的数据类型 text  json  xml
        cache: true,// 是否使用缓存，默认为false
        success: function (json) {
            alert(json.msg);
        },
        error: function (code) {
            console.log(code);
            alert(json.msg);
        }
    })
}

btn2.onclick = function () {
    ajax({
        url: 'http://localhost/wykl/data/user.php',
        type: 'get',
        data: {
            user: inp[0].value,
            pass: inp[1].value,
            tt: 'login'
        },
        dataType: 'json', // 返回的数据类型 text  json  xml
        cache: true,// 是否使用缓存，默认为false
        success: function (json) {
            alert(json.msg);
            if (json.err === 0) {
                location.assign('http://localhost/wykl/index.html')
            }
        },
        error: function (code) {
            console.log(code)
            alert(json.msg);
        }
    })
}