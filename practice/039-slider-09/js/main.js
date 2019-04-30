
window.onload = function () {
    // 获取目标数组
    const item = document.querySelectorAll('.item');
    const slider = document.querySelector(".slider");
    const img = document.querySelectorAll("img");


    let height = window.getComputedStyle(img[0]).height;
    let width = window.getComputedStyle(img[0]).width;

    let pre = 0; //前一页
    let current = 0; //当前页
    let next = 0; //下一页
    let preFront = 0; //前前一页

    let auto = 2000; //自动滚动速度


    boot();

    //鼠标点击函数
    document.getElementById("btnLeft").onclick = function () { moveClick(left) };
    document.getElementById("btnRight").onclick = function () { moveClick(right) };

    //启动函数
    function boot() {
        //获取图片尺寸
        setSize();
        sliderShow(left, auto);
    }

    //轮播函数
    //mode 可选参数有 left, right
    function sliderShow(mode, speed) {
        getIndex();
        ready();
        move(mode, speed);
    }

    //自动滚动
    function move(fn, speed) {
        let isMove = true;
        //鼠标的进入时图片停止轮播
        slider.addEventListener("mouseenter", () => {
            isMove = false;
        });

        slider.addEventListener("mouseout", () => {
            isMove = true;
        });

        setInterval(() => {
            if (isMove) {
                //等图片就位后再执行滚动操作
                getIndex();
                fn();
            }

        }, speed);
    }

    setInterval(() => {

    }, 1000)

    //点击滚动
    function moveClick(fn) {
        getIndex();
        fn();
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

    //获取移动前的图片序号
    function getIndex() {
        pre = (current == 0) ? (item.length - 1) : (current - 1);
        next = (current == item.length - 1) ? 0 : (current + 1)
        preFront = (pre == 0) ? (item.length - 1) : (pre - 1);
    }

    //设置图片尺寸
    function setSize() {
        slider.style.height = height;
        for (let i = 0; i < img.length; i++) {
            img[i].style.width = width;
        }
    }
}