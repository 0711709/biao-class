; (function () {
    'use strict';

    window.biaoForm = {
        getData,
        setData,
    };

    //获取数据
    function getData(selector) {

        let data = {};
        let inputs = document.querySelector(selector).querySelectorAll("input");

        inputs.forEach(it => {

            switch (it.type) {
                case "name":
                    data[it.name] = it.value;
                    break;
                case "number":
                    data[it.name] = parseFloat(it.value);
                    break;
                case "date":
                case "week":
                    data[it.name] = it.valueAsDate;
                case "radio":
                    if (!it.checked)
                        return;
                    data[it.name] = it.value;
                    break;
                case "checkbox":
                    if (!Array.isArray(data[it.name]))
                        data[it.name] = [];
                    if (it.checked)
                        (data[it.name]).push(it.value)
                    break;
                default:
                    data[it.name] = it.value;
            };

        });
        return data;
    };

    //填充表单
    function setData(data, selector) {
        for (const key in data) {

            let form = document.querySelector(selector);

            let input = form.querySelector(`[name=${key}]`);

            if (input)
                switch (input.type) {
                    case "radio":
                        let radio = form.querySelector(`[name=${key}][value=${data[key]}]`)
                        radio && (radio.checked = true);
                        break;
                    case "checkbox":
                        data[key].forEach(it => {
                            let checkbox = form.querySelector(`[name=${key}][value=${it}]`);
                            checkbox && (checkbox.checked = true);
                        })
                        break;
                    default:
                        input.value = data[key];
                };
        }
    };

})();