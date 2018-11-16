//获取变量
const item = document.querySelectorAll(".item");
let current = 0;

boot();


//启动函数
function boot() {
    item[current].style.right = "0";
    slider();
};

// 轮播函数
function slider() {
    setInterval(() => {
        current++;
        if (current >= item.length) {
            current = 0;
            reset();
        }
        item[current].style.right = "0";
    }, 2000)
}

//重置函数
function reset() {
    for (let i = 0; i < item.length; i++){
        item[i].style.right = "-800px";
    }
}
