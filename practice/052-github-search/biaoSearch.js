;(function () {
    'use strict';

    let form = document.getElementById("search-form")
    let input = form.querySelector("[name=keyword]")

    boot();

    function boot() {
        bindEvents();
    }

    function bindEvents() {
        form.addEventListener("submit", e => {
            e.preventDefault()
            
            let keyword = input.value;
            
            let http = new XMLHttpRequest();
            http.open('get', )
        })
    }

})();