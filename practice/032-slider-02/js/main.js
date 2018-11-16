const item = document.querySelectorAll(".item");
let current = item.length;

boot();


//启动函数
function boot() {
    slider();
};

// 轮播函数
function slider() {
   setInterval(() => {
       current--;
       if (current == 0) {
           current = item.length;
           reset();//重置
       } else {
           item[current].style.opacity = "0";
       }
   },1000)
}

//重置函数
function reset() {
    for (let i = 0; i < item.length; i++){
        item[i].style.opacity = "1";
    }
}
