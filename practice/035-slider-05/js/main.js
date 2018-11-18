// 获取目标数组
const item = document.querySelectorAll('.item');
//console.log(item)
let pre = 0;
let current = 0;
let next = 0;

boot();

//启动函数
function boot() {
    slider();
}

//轮播函数
function slider() {
    show(current);
    setInterval(() => {
        reset();
        getNext();
        getPre();
        zIndexReady();
        imgReady();
        show(next);
        show(pre);
        show(current);
        //等图片就位后再执行滚动操作
        setTimeout(() => {
            moveLeft();
        }, 1000);
    }, 2000)
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

//获取下一次的当前图片序号
function getCurrent() {
    current++;
    if (current >= item.length)
        current = 0;
}

// 确定图片显示顺序
function zIndexReady() {
    item[current].style.zIndex = "2";
    item[next].style.zIndex = "1";
    item[pre].style.zIndex = "1";
}

//图片就位
function imgReady() {
    item[pre].style.left = "-800px";
    item[current].style.left = "0";
    item[next].style.left = "800px";

}

//显示图片
function show(num) {
    item[num].style.opacity = "1";
}

//从右往左移动
function moveLeft() {
    item[current].style.left = "-800px";
    item[next].style.left = "0";
    getCurrent();
}



