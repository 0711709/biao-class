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
        }
    }



    biaoTable.boot("#user-table", userStruct, users, operation);


    // console.log(biaoForm.getData("#user-form"));

})();