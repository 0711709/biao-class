
window.onload = function () {
    // 获取目标数组
    const item = document.querySelectorAll('.item');

    const slider = document.querySelector(".slider");
    const img = document.querySelectorAll("img");
    
    
    let height = window.getComputedStyle(img[0]).height;
    let width = window.getComputedStyle(img[0]).width;
    let pre = 0;
    let current = 0;
    let next = 0;
    console.log(width)
    // let size = getComputedStyle(item).width;
    // window.onload = function () {
    //     // console.log(document.getElementsByTagName("img")[0].offsetHeigh);
    //     // console.log(document.getElementsByTagName("img")[0].offsetWidth);
    //     // console.log(document.getElementsByClassName("item")[0].offsetHeigh);
    //     // console.log(document.getElementsByClassName("slider")[0].offsetWidth);
    //     // console.log(window.getComputedStyle(slider));
    //     // console.log(window.getComputedStyle(item[0]).height); 这个有效
    //     // console.log(document.getElementsByClassName(item[0]).height);
    //     // console.log(document.getElementsByClassName(item[0]));
    //     // console.log(document.getElementsByTagName("a")[0].offsetWidth);
    //     // console.log(document.getElementsByTagName("img")[0]);
    // }



    boot();


    //启动函数
    function boot() {
        getSize();
        sliderShow();
    }

    //轮播函数
    function sliderShow() {
        moveRight();
        setInterval(() => {
            moveRight();
        }, 2000)
    }

    //向左滚动
    function moveLeft() {
        reset();
        getIndex();
        getPosition();
        show(next);
        show(pre);
        show(current);
        //等图片就位后再执行滚动操作
        setTimeout(() => {
            left();
        }, 1000);
    }

    //向右滚动
    function moveRight() {
        reset();
        getIndex();
        getPosition();
        show(next);
        show(pre);
        show(current);
        //等图片就位后再执行滚动操作
        setTimeout(() => {
            right();
        }, 600);
    }

    //从右往左移动
    function left() {
        item[current].style.left = "-800px";
        item[next].style.left = "0";
        current = next;
    }

    //从左向右移动
    function right() {
        item[current].style.left = "800px";
        item[pre].style.left = "0";
        current = pre;
    }

    // 除当前图片外，其余均隐藏
    function reset() {
        for (let i = 0; i < item.length; i++) {
            if (i != current) {
                item[i].style.zIndex = "0";
                item[i].style.opacity = "0";
                item[i].style.left = "0";
            }
        }
    }

    //获取图片序号
    function getIndex() {
        getPre();
        getNext();
    }


    //获取前一张序号
    function getPre() {
        if (current == 0) {
            pre = item.length - 1;
        } else {
            pre = current - 1;
        }
    }

    //获取后一张序号
    function getNext() {
        if (current == item.length - 1) {
            next = 0;
        } else {
            next = current + 1;
        }
    }


    //确定图片位置
    function getPosition() {
        item[pre].style.zIndex = "1";
        item[current].style.zIndex = "2";
        item[next].style.zIndex = "1";
        item[pre].style.left = "-800px";
        item[current].style.left = "0";
        item[next].style.left = "800px";
    }



    //显示图片
    function show(num) {
        item[num].style.opacity = "1";
    }

    //确定图片尺寸
    function getSize() {
        slider.style.height = height;
        for(let i = 0; i < img.length; i++){
            img[i].style.width = width;
        }  
    }
}