
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
    let preFront = 0;

    //获取图片尺寸
    getSize();
    boot();

    //鼠标点击函数
    document.getElementById("btnLeft").onclick = function () { moveLeft() };
    document.getElementById("btnRight").onclick = function () { moveRight() };

    //启动函数
    function boot() {
        sliderShow();
    }

    //轮播函数
    function sliderShow() {
        getLeftIndex();
        ready();
        move()
    }

    //自动滚动
    function move() {
        //等图片就位后再执行滚动操作
        setInterval(() => {
            moveLeft();
        }, 2000);
    }

    //往左滚动
    function moveLeft() {
        getLeftIndex();
        left();
    }

    //往右滚动
    function moveRight() {
        getRightIndex();
        right();
    }

    //滚动前的准备工作
    function ready() {
        for (let i = 0; i < item.length; i++) {
            //确定图片显示顺序
            item[i].style.zIndex = (i === current) ? "2" : "-1";
            //确定图片位置
            if (i == current) {
                item[i].style.left = "0";
            } else if (i == pre) {
                item[i].style.left = "-" + width;
            } else {
                item[i].style.left = width;
            }
        }
    }

    //从右往左移动
    function left() {
        item[pre].style.zIndex = "-1";
        item[current].style.zIndex = "2";
        item[next].style.zIndex = "1"
        item[pre].style.left = width;
        item[current].style.left = "-" + width;
        item[next].style.left = "0";
        current = next;
    }

    //从左向右移动
    function right() {
        item[preFront].style.zIndex = "-1"
        item[pre].style.zIndex = "1";
        item[current].style.zIndex = "2";
        item[preFront].style.left = "-" + width;
        item[pre].style.left = "0";
        item[current].style.left = width;
        current = pre;
    }

    //获取往左移动的图片序号
    function getLeftIndex() {
        pre = (current == 0) ? (item.length - 1) : (current - 1);
        next = (current == item.length - 1) ? 0 : (current + 1)
    }

    //获取往右移动的图片序号
    function getRightIndex() {
        pre = (current == 0) ? (item.length - 1) : (current - 1);
        preFront = (pre == 0) ? (item.length - 1) : (pre - 1);
    }

    //确定图片尺寸
    function getSize() {
        slider.style.height = height;
        for (let i = 0; i < img.length; i++) {
            img[i].style.width = width;
        }
    }
}