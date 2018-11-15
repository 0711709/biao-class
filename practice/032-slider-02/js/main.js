const item = document.querySelectorAll(".item");
let current = item.length;

boot();

function boot() {
    slider();
};

function slider() {
   setInterval(() => {
       current--;
       if (current == 0) {
           current = item.length;
           reset();
       } else {
           item[current].style.opacity = "0";
       }
   },1000)
}

function reset() {
    for (let i = 0; i < item.length; i++){
        item[i].style.opacity = "1";
    }
}
