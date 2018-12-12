
/*
|--------------------------------------------------------------------------
| biaoForm.js
|--------------------------------------------------------------------------
| * 快速存取数据
| * 自定义提交行为
*/

; (function () {
    'use strict';

    let form;

    // 将biaoForm暴露出去，否则别的文件访问不到
    window.biaoForm = function (selector, onSubmit) {
        form = document.querySelector(selector);

        form.addEventListener('submit', e => {
            e.preventDefault();
            onSubmit(getData());
            form.reset();
        });

        return {
            getData, // 相当于 getData: getData
            setData, // 相当于 setData: setData
        };
    };

    /**
     * 解析表单数据（取值）
     * @param {HTMLFormElement} form 选好的form元素
     * @return {Object}
     */
    function getData() {
        // 初始化纯数据，否则解析后的数据没地方存
        let data = {};
        // 取到所有输入组件，也就是所有有name属性的元素
        // 如<input name="xxx">或者<textarea name="xxx">...
        let inputs = form.querySelectorAll('[name]');

        // 循环所有的输入组件
        inputs.forEach(it => {
            // it就是每个输入组件
            // 以<input name="age" value="10">为例：
            // it.name  ==> 'age'
            // it.value ==> '10'

            // 检查组件的类型
            switch (it.type) {
                // 如果是数字，就将值转换为数字类型
                case 'number':
                    data[it.name] = parseFloat(it.value);
                    break;
                // 如果是单选框
                case 'radio':
                    // 检查它当前是否打钩了，如果没打勾就跳过
                    if (!it.checked)
                        return;

                    // 否则就存到data中
                    //    ↓'age'       ↓10
                    data[it.name] = it.value;
                    break;

                // 如果是复选框，那么取到的值就应该是个数组，
                // 因为可能会选中多项
                case 'checkbox':
                    // 第一次碰到复选框，就应该将data中对应的那一项初始化为空数组
                    // 否则后面没法推入选中的值
                    if (!Array.isArray(data[it.name]))
                        data[it.name] = [];

                    /*
                      如果当前的复选框打钩了，就应该推入到数组中
                      <input value=a checked>
                      <input value=b checked> ==> ['a', 'b']
                      <input value=c>
                    */
                    if (it.checked)
                        data[it.name].push(it.value);
                    break;
                // 如果是以下类型中的任何一项
                case 'date':
                case 'time':
                case 'week':
                case 'month':
                case 'datetime':
                case 'datetime-local':
                    // 就将其转化为更强大的Date对象
                    data[it.name] = it.valueAsDate;
                    break;
                // 默认情况下直接取字符串
                default:
                    data[it.name] = it.value;
            }
        });

        // 返回解析好的纯数据
        return data;
    }

    /**
     * 通过纯数据填充表单（存值）
     * @param {Object} data
     * @param {HTMLFormElement} form
     */
    function setData(data) {
        // 循环数据中的每一项
        for (let key in data) {
            // 取到每项的值，方便后面调用
            let val = data[key];
            // 取到本项对应的输入组件
            let input = form.querySelector(`[name=${key}]`);

            // 检查组件的类型
            switch (input.type) {

                // 如果是单选框
                case 'radio':
                    // 选中类型为"radio"，且name为本项的键，且值为本项值的元素
                    // 以 gender: 'male' 为例（比如说循环到{... gender: 'male', ...}这一项）
                    // radio 就等于 <input type=radio name=gender value=male>
                    //                                                   ↓'gender'     ↓'male'
                    let radio = form.querySelector(`[type=radio][name=${key}][value=${val}]`);

                    // 如果radio存在，就将其勾上
                    radio && (radio.checked = true);
                    break;

                // 如果是复选框
                case 'checkbox':
                    // 如果是复选框说明值是数组
                    // 以 orientation: ['male', 'female'] 为例（比如说循环到{... orientation: ['male', 'female'], ...}这一项）
                    val.forEach(it => {
                        // 选中类型为"checkbox"，且name为本项的键，且值为本项的值的元素
                        // 以 'male' 为例
                        // checkbox 就等于 <input type=checkbox name=orientation value=male>
                        //                                                       ↓'orientation' ↓'male'`
                        let checkbox = form.querySelector(`[type=checkbox][name=${key}][value=${it}]`);

                        // 如果checkbox存在，就将其勾上
                        checkbox && (checkbox.checked = true);
                    });
                    break;
                default:
                    // 如果是其他类型的输入组件，就直接存值
                    input.value = data[key];
            }
        }
    }
})();

/*
|--------------------------------------------------------------------------
| biaoTable.js
|--------------------------------------------------------------------------
| * 通过数据快速渲染内容
| * 个性化行操作
*/

; (function () {
    'use strict';

    // 全文变量备用
    let table, thead, tbody
        , structure, list, operations;

    // 暴露插件全局变量
    window.biaoTable = function (...args) {
        boot(...args);
        return { render };
    };

    /**
     * 启动
     * @param {string} tableSelector 对应表格的选择器
     * @param {Object} struct 应该显示哪些列
     * @param {Array} list 显示的数据
     * @param {Object} ops 个性按钮及行为
     */
    function boot(tableSelector, struct, arr, ops) {
        // 各种更新全文变量
        table = document.querySelector(tableSelector);
        thead = table.tHead;
        tbody = table.tBodies[0];
        structure = struct;
        list = arr;
        operations = ops;

        // 直接渲染
        render();
    }

    /**
     * 总渲染
     */
    function render() {
        renderHead();
        renderBody();
    }

    /**
     * 渲染thead
     *
     * 根据structure渲染thead
     * {
     *   name: '姓名',   ==>  |姓名|性别|
     *   gender: '性别',      |xxx|xxx|
     * }
     */
    function renderHead() {
        thead.innerHTML = '';

        // 初始化组装字符串
        let html = '';

        // 循环structure中的每一条
        for (let key in structure) {
            // 以 name:'姓名' 为例
            // 此时key为'name'
            // 意味着structure[key]为'姓名'
            // 意味着最后生成的字符串为'<th>姓名</th>'
            html += `<th>${structure[key]}</th>`;
        }

        // 如果传了个性行为就再加一个表头项
        if (operations)
            html += '<th>操作</th>';

        // 在thead内填充组装好的字符串
        thead.innerHTML = html;
    }

    /**
     * 渲染tbody
     *
     * 使用list渲染tbody（通过structure来限制渲染的数量和属性）
     */
    function renderBody() {
        tbody.innerHTML = '';

        // 循环每一条数据
        // 以用户列表为例 [{王花花...}, {李拴蛋...}]
        // 此时循环的就是每一个用户
        list.forEach((it, index) => {
            // 创建表格行
            let tr = document.createElement('tr');

            // 初始化tr的组装字符串
            let html = '';

            // 循环当前用户的属性
            // 以 {name: '王花花', gender: '女'} 为例
            for (let key in structure) {
                // 以 name: '王花花' 为例
                // 意味着最后生成的字符串为'<td>王花花</td>'
                html += `<td>${it[key] || '-'}</td>`;
            }

            // 如果传了个性行为
            if (operations) {
                // 就依据个性按钮的键生成button的html代码

                // 准备按钮的html代码
                let btnHtml = '';

                // 循环所有行为
                // 以
                // {
                //   Delete   : function(){...},
                //   Highlight: function(){...}
                // }
                // 为例
                for (let action in operations) {
                    // 每个行为都是一个按钮
                    // 以 Delete:function(){...} 为例
                    //                             ↓'Delete'  ↓'Delete'
                    btnHtml += `<button class="${action}">${action}</button>`;
                    // 最后得到 '<button class="Delete">Delete</button>'
                }

                // 将组装好的按钮html插入到操作单元格中
                // btnHtml ==> <button class="Delete">Delete</button>
                //             <button class="Highlight">Highlight</button>
                html += `<td>${btnHtml}</td>`;
            }

            // 在tr内填充组装好的字符串
            tr.innerHTML = html;

            // 如果传了个性行为
            if (operations) {
                // 就给每个行为对应的按钮绑事件
                for (let key in operations)
                    // 以 Delete:function(){...} 为例
                    tr
                        .querySelector('.' + key) // 现通过类名选中按钮，其类名为'.Delete'
                        .addEventListener('click', () => {
                            // 此处的operations[key]就是function(){...}函数本身
                            // 后面的小括号触发了函数，并将其所在行和对应的数据索引回传回去
                            operations[key](tr, index);
                        });
            }

            // 在tbody最后追加一行
            tbody.appendChild(tr);
        });
    }
})();

/*
|--------------------------------------------------------------------------
| 业务代码
|--------------------------------------------------------------------------
| 指导插件如何配合工作
*/

; (function () {
    'use strict';

    let bf, bt;

    let form = document.querySelector('form');

    let structure = {
        name: '用户名',
        email: '邮箱',
        balance: '余额',
    };

    let list = [
        {
            name: 'whh',
            email: 'whh@biaoyancu.com',
            balance: 100,
        },
        {
            name: 'lsd',
            email: 'lsd@biaoyancu.com',
            balance: 120,
        },
    ];

    boot();

    function boot() {
        prepareForm();
        prepareTable();
    }

    function prepareForm() {
        bf = biaoForm('form', onSubmit);
    }

    function prepareTable() {
        let actions = {
            delete(tr, i) {
                tr.remove();
                list[i] = null;
            },
            update(tr, i) {
                bf.setData(list[i]);
                form.querySelector('[name=index]').value = i;
            },
        };
        bt = biaoTable('table', structure, list, actions);
    }

    function onSubmit(row) {

        if (!row.index && row.index !== 0)
            list.push(row);
        else
            list[row.index] = row;

        bt.render();
    }
})();
