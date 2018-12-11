; (function () {
    "use strict";

    let list = [
        {
            name: "lws",
            email: "lws@biaoyansu.com",
            balance: 560000
        },
        {
            name: "lwu",
            email: "lwu@biaoyansu.com",
            balance: 530000
        }
    ];

    let elForm = document.querySelector("#user-form")
    let elTable = document.querySelector("#user-table");
    let elTbody = elTable.tBodies[0];

    let inputs = {
        index: elForm.querySelector("[name=index]"),
        name: elForm.querySelector("[name=name]"),
        email: elForm.querySelector("[name=email]"),
        balance: elForm.querySelector("[name=balance]")
    }

    boot();

    function boot() {
        render();
        bindSubmit();
    }

    function bindSubmit() {
        elForm.addEventListener("submit", e => {
            e.preventDefault();

            let row = {};

            let index = inputs.index.value;

            console.log(typeof index)
            console.log(index)
            console.log(index == true)

            row.name = inputs.name.value;
            row.email = inputs.email.value;
            row.balance = inputs.balance.value;

            //重置输入
            elForm.reset();

            //推入数据并渲染
            index ? list[index] = row : list.push(row);

            // index ? console.log(typeof index) : console.log(1);

            render();

        })
    }

    function render() {
        elTbody.innerHTML = "";
        list.forEach((it, index) => {

            //判断是否为NULL
            if (!it)
                return;

            let tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${it.name}</td>
            <td>${it.email}</td>
            <td>${it.balance}</td>
            <td  class="text-right operation">
            <button class="updata">更新</button>
            <button class="delete">删除</button>
            </td>
            `;

            // tr
            //     .querySelector(".delete")
            //     .addEventListener("click", e => {
            //         it[index] = null;
            //         tr.remove();
            //     })

            // tr
            //     .querySelector(".updata")
            //     .addEventListener("click", e => {

            //     })

            tr.querySelector(".operation").addEventListener("click", e => {
                let klass = e.target.classList

                if (klass.contains("delete")) {
                    it[index] = null;
                    tr.remove();
                }

                if (klass.contains("updata")) {
                    inputs.index.value = index;
                    inputs.name.value = it.name;
                    inputs.email.value = it.email;
                    inputs.balance.value = it.balance;
                }

            })


            elTbody.appendChild(tr);
        })
    }
})();