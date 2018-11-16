//获取变量
const item = document.querySelectorAll(".item");
let current = 0;
let next = 0;
let pre = 0;
boot();


//启动函数
function boot() {
    slider();
};

// 轮播函数
function slider() {
    setInterval(() => {
        if (current >= item.length) {
            current = 0;
        }
        if (current >= item.length - 1) {
            next = 0;
        } else {
            next++
        }
        if (next >= item.length - 1) {
            pre = 0;
        } else {
            pre = next + 1;
        }

        item[next].style.right = "-800px"
        item[pre].style.right = "-800px"
        item[current].style.right = "0";
        current++;
    }, 2000)
}


