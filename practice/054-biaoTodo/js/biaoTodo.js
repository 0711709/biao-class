; (function () {
    'use strict';

    let catGroup = document.getElementById("cat-group");
    let titleForm = document.getElementById("todo-form");

    let titleInput = titleForm.querySelector("input");
    let list = document.querySelector(".todo-list");

    let catAdd = document.getElementById("cat-add");
    let addButton = document.querySelector(".add");
    let catForm = document.querySelector("#cat-input");
    let catInput = catForm.querySelector("input");

    let biaoCat = document.getElementById("biao-cats");
    let currentId = null;

    boot();

    //启动函数
    function boot() {
        render();
        titleSubmit();
        catSubmit();
        currentCat();
    }

    function render() {
        //渲染分类
        catRender();

        //渲染待办事项
        listRender();
    }

    function catRender() {
        //清空页面遗留数据
        catGroup.innerHTML = "";

        //获取数据
        api("cat/read", null, $ => {
            console.log($)
            let data = $.data;
            if (data)
                data.forEach(it => {
                    let cat = document.createElement("span");
                    cat.classList.add("cat");
                    cat.$id = it.id
                    cat.innerHTML = `${it.cat}<span class="ops"><button class="update">更新</button><button class="delete">删除</button></span>`;
                    catGroup.appendChild(cat);
                    //绑定更新事件
                    let catUpdate = cat.querySelector(".update");
                    catUpdate.addEventListener("click", e => {
                        addButton.hidden = true;
                        catForm.hidden = false;
                        catInput.value = cat.childNodes[0].data;
                        catInput.$id = cat.$id;
                        catInput.$cat = cat;
                    });

                    //绑定删除事件
                    let catDelete = cat.querySelector(".delete");
                    catDelete.addEventListener("click", e => {
                        api("cat/delete", { id: cat.$id }, $ => {
                            cat.remove();
                        })
                    })
                });
        });
    }

    function listRender(current) {
        //清空页面遗留数据
        list.innerHTML = "";

        //获取数据
        api("todo/read", current, $ => {
            let data = $.data;
            if (data)
                data.forEach(it => {
                    let item = document.createElement("div");
                    item.classList.add("todo-item");
                    item.$id = it.id;
                    item.$cat_id = it.cat_id;
                    item.innerHTML = `
                    <div class="checkbox"><input type="checkbox" ${it.completed ? "checked" : ""}></div>
                        <div class="title">${it.title}</div>
                        <div class="ops text-right">
                            <button class="update">更新</button>
                            <button class="delete">删除</button>
                        </div>
                    `
                    list.appendChild(item);

                    //绑定是否完成事件
                    let checked = item.querySelector("input");
                    checked.addEventListener("click", e => {
                        let data = {};
                        data.id = item.$id;
                        data.completed = checked.checked;
                        api("todo/update", data);
                    })

                    //绑定更新事件
                    let update = item.querySelector(".update");
                    let title = item.querySelector(".title");
                    update.addEventListener("click", e => {
                        let data = {};
                        data.id = item.$id;
                        titleInput.$id = item.$id;
                        titleInput.$title = title;
                        titleInput.value = title.innerText;
                        currentId = item.$cat_id;
                    })

                    //绑定删除事件
                    let titleDelete = item.querySelector(".delete");
                    titleDelete.addEventListener("click", e => {
                        api("todo/delete", { id: item.$id }, $ => {
                            item.remove();
                        })
                    })

                })
        });
    }

    function titleSubmit() {
        titleForm.addEventListener("submit", e => {
            e.preventDefault();
            //获取输入数据
            let data = {};
            data.title = titleInput.value;
            data.completed = false;
            data.cat_id = currentId;

            //传输数据
            if (!titleInput.$id && titleInput.$id !== 0) {
                api("todo/create", data, $ => {
                    //渲染数据
                    let item = document.createElement("div");
                    item.classList.add("todo-item");
                    item.innerHTML = `
                    <div class="checkbox"><input type="checkbox" ${data.completed ? "checked" : ""}></div>
                        <div class="title">${data.title}</div>
                        <div class="ops text-right">
                            <button>更新</button>
                            <button>删除</button>
                        </div>
                    `
                    list.insertBefore(item, list.childNodes[0]);
                    titleInput.$id = $.data.id;
                });
            } else {
                api("todo/update", { id: titleInput.$id, title: data.title, cat_id: currentId }, $ => {
                    titleInput.$title.innerText = data.title;
                    titleInput.$id = null;
                    listRender({ where: { and: { cat_id: currentId } } });
                })
            }

            titleForm.reset();
        });
    };


    function catSubmit() {

        //绑定添加事件
        addButton.addEventListener("click", e => {
            addButton.hidden = true;
            catForm.hidden = false;
        });

        //绑定提交事件
        catForm.addEventListener("submit", e => {
            e.preventDefault();

            let data = {};
            data.cat = catInput.value;

            if (data.cat) {
                if (!catInput.$id && catInput.$id !== 0) {
                    api("cat/create", data, $ => {
                        catRender();
                    });
                } else {
                    api("cat/update", { id: catInput.$id, cat: data.cat }, $ => {
                        catInput.$id = null;
                        catRender();
                    })
                }
            }
            catForm.reset();
            addButton.hidden = false;
            catForm.hidden = true;
        });

        //绑定点击事件
        catAdd.addEventListener("click", e => {
            let target = e.target;
            let klass = target.classList;

            if (klass.contains("cancel")) {
                catForm.reset();
                addButton.hidden = false;
                catForm.hidden = true;
            }
        });
    }

    function currentCat() {
        biaoCat.addEventListener("click", e => {
            let cat = catGroup.querySelectorAll(".cat");
            currentId = e.target.$id;
            cat.forEach(it => {
                if (it.$id === currentId) {
                    it.classList.add("current");
                    listRender({ where: { and: { cat_id: currentId } } })
                } else {
                    it.classList.remove("current");
                }
            });
            if (e.target.classList.contains("all")) {
                listRender(null);
            }
        })
    }


    api.get("cat/read", data => {
        console.log(data)
    });

    api.get("todo/read", data => {
        console.log(data)
    });


    function read() {
        api('todo/read', {
            where: {
                and: { completed: false }
            }
        }, data => {
            console.log(data);
        })
    }

})();