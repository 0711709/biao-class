; (function () {
    'use strict';

    whindow.$user;

    boot();

    function boot() {
        if (isLoadIn()) {
            load();
        }
    }

    function isLoadIn() {
        return localStorage.getItem("username");
    }

    function load() {
        api("user/first", { where: { and: { username: isLoadIn(), } }, only: ["username", "id", "nickname"] }, r => {
            if (!r.data) {
                return;
            } else {
                $user = r.data;
                console.log(user)
            }
        })
    }

    
    // api("user/create", { username: "1", password: "1", test: [1,2]}, r => { console.log(r)});

})();