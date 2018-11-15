const item = document.querySelectorAll(".item");
let current = item.length;

boot();

function boot() {
    slider();
};

function slider() {
    setInterval(function () {
        current--;
        if (current < 0) {
            reset();
            current = item.length - 1;
            setTimeout(() => {
                item[current].style.opacity = "0";
            }, 500);
        } else{
            item[current].style.opacity = "0";
        }   
    }, 1000)
}

function reset() {
    for(let i = 0; i < item.length; i++){
        item[i].style.opacity = "1";
    }
}

