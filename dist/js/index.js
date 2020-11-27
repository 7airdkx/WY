"use strict";

window.addEventListener('load', function () {
  var wrap = document.querySelector('.wrap');
  var imgs = document.querySelectorAll('.imglist>img');
  var btns = document.querySelectorAll('.btnlist > a');
  var leftctrl = document.querySelector('.leftctrl');
  var rightctrl = document.querySelector('.rightctrl');
  var tabSize = wrap.clientWidth;
  var imgIndex = 0;
  var timer;
  scroll();

  function scroll() {
    rightctrl.onclick = function () {
      imgIndex++;

      if (imgIndex > imgs.length - 1) {
        wrap.scrollLeft = 0;
        imgIndex = 1;
      }

      animate(wrap, {
        scrollLeft: imgIndex * tabSize
      });
      circlecolor();
    };

    leftctrl.onclick = function () {
      imgIndex--;

      if (imgIndex < 0) {
        wrap.scrollLeft = (imgs.length - 1) * tabSize;
        imgIndex = imgs.length - 2;
      }

      animate(wrap, {
        scrollLeft: imgIndex * tabSize
      });
      circlecolor();
    };
  }

  function circlecolor() {
    btns.forEach(function (it) {
      it.style.backgroundColor = '#fff';
    });
    btns[imgIndex % (imgs.length - 1)].style.backgroundColor = '#ff0b1a';
  }

  auto();

  function auto() {
    timer = setInterval(function () {
      rightctrl.onclick();
    }, 2500);
    wrap.addEventListener('mouseenter', function () {
      clearInterval(timer);
    });
    wrap.addEventListener('mouseleave', function () {
      timer = setInterval(function () {
        rightctrl.onclick();
      }, 2500);
    });
  }

  btnclick();

  function btnclick() {
    btns.forEach(function (item, index) {
      item.onclick = function () {
        imgIndex = index;
        ;
        animate(wrap, {
          scrollLeft: index * tabSize
        });
        btns.forEach(function (it) {
          it.style.backgroundColor = '#000';
        });
        item.style.backgroundColor = '#00f';
      };
    });
  }

  function animate(dom, options, callback) {
    for (var attr in options) {
      if (attr === 'opacity') {
        var current = parseInt(getComputedStyle(dom)[attr] * 100);
        var target = options[attr] * 100;
      } else if (attr.indexOf('scroll') !== -1) {
        var current = dom[attr];
        var target = options[attr];
      } else {
        var current = parseInt(getComputedStyle(dom)[attr]);
        var target = options[attr];
      }

      options[attr] = {
        current: current,
        target: target
      };
    }

    clearInterval(dom.timer);
    dom.timer = setInterval(function () {
      for (var attr in options) {
        var current = options[attr].current;
        var target = options[attr].target;
        var speed = (target - current) / 10;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if (Math.abs(target - current) <= Math.abs(speed)) {
          if (attr === 'opacity') {
            dom.style[attr] = target / 100; // 立即到达终点
          } else if (attr.indexOf('scroll') !== -1) {
            dom[attr] = target;
          } else {
            dom.style[attr] = target + 'px';
          }

          delete options[attr];

          for (var attr in options) {
            return false;
          }

          typeof callback === 'function' ? callback() : '';
          clearInterval(dom.timer); // 清除计时器
        } else {
          // 未到达终点
          options[attr].current += speed;

          if (attr === 'opacity') {
            dom.style[attr] = options[attr].current / 100;
          } else if (attr.indexOf('scroll') !== -1) {
            dom[attr] = options[attr].current;
          } else {
            dom.style[attr] = options[attr].current + 'px';
          }
        }
      }
    }, 20);
  }
});