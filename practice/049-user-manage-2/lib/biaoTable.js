

window.biaoTable = {boot};


function boot(selector, struc, list, ops) {
    let table = document.querySelector(selector);
    theadrender(table, struc, ops);
    tbodyrender(table, struc, list, ops);
}

function theadrender(table, struc, ops) {
    let thead = document.createElement("thead");
    let html = "";
    for (const key in struc) {
        html += `<th>${struc[key]}</th>`;
        //thead.innerHTML += `<th>${struc[key]}</th>`;
        //这种方式会自动添加tr;
    };

    if (ops)
        html += "<th class='text-right'>操作</th>";

    thead.innerHTML = html;
    table.appendChild(thead);
}

function tbodyrender(table, struc, list, ops) {
    let tbody = document.createElement("tbody");
    table.appendChild(tbody);

    list.forEach((it, index) => {
        let tr = document.createElement("tr");

        let html = "";

        for (key in struc) {
            html += `<td>${it[key] || "--"}</td>`;
        }

        if (ops) {
            let btnHtml = "";

            for (let action in ops) {
                btnHtml += `<button class="${action}">${action}</button>`;
            }

            html += `<td class="text-right">${btnHtml}</td>`;
        }

        tr.innerHTML = html;

        if (ops) {
            for (let key in ops) {
                tr.querySelector("." + key).addEventListener("click", e => {
                    ops[key](tr, index);
                });
            }
        }


        tbody.appendChild(tr);

    })
}
