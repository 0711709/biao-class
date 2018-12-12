; (function () {
    "use strict";

    //数据
    let userStruct = {
        name: '姓名',
        score: '分数',
        gender: '性别',
        balance: '余额',
    };

    let users = [
        {
            name: '王花花',
            gender: '男',
            score: 20,
            balance: 80,
        },
        {
            name: '李拴蛋',
            gender: '女',
            score: 65,
        },
        {
            name: '赵可爽',
            gender: '男',
            score: 81,
        },
    ];

    let operation = {
        delete(tr, i) {
            users[i] = null;
            tr.remove();
            console.log(users);
        },
        highlight(tr) {
            let klass = tr.classList;
            klass.contains("active") ? klass.remove("active") : klass.add("active")
        },
        update(tr, i) {
            //填充数据
            biaoForm.setData(users[i], "#user-form");
            let input = document.querySelector("[name=index]");
            input.value = i;

        }
    }

    biaoTable.boot("#user-table", userStruct, users, operation);

    onSubmit();

    function onSubmit() {
        let form = document.querySelector("#user-form");
        let submit = form.querySelector("[type=submit]");
        let input = form.querySelector("[name=index]");

        console.log(submit)

        form.addEventListener("submit", e => {
            e.preventDefault();

            let it = biaoForm.getData("#user-form");

            console.log(it.index)
            if(!it.index && it.index !== 0)
                users.push(it);
            else
                users[it.index] = it;

            form.reset();

            biaoTable.boot("#user-table", userStruct, users, operation);
    })
}

}) ();