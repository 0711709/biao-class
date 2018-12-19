; (function () {
    'use strict';



    window.biaoAlert = biaoAlert;

    let container;

    const defaultConfig = {
        type: "info",
        timeout: 2000,
        containerClass: "biao-alert-container",
        clickToClose: true,
        // onClick,
        // onClose,
        // onOpen,
    }

    function biaoAlert(title, config) {
        config = { ...defaultConfig, ...config, title };
        prepareEnv(config);
        render(config);
        open(config);
        bindClick(config);   
    };

    function prepareEnv(config) {
        container = getContainer(config)
        if (container)
            return;
        container = document.createElement("div");
        container.classList.add(config.containerClass);
        document.body.appendChild(container);

    }

    function getContainer(config) {
        return document.querySelector("." + config.containerClass)
    }

    function render(config) {
        let el = document.createElement("div");
        el.classList.add("biao-alert");
        el.classList.add(config.type);
        el.innerHTML = `
        <div class="inner">
            <div class="title">${config.title}</div>
            ${config.desc ? `<div class="desc">${config.desc}</div>` : ""}
        </div>
        `
        config.el = el;
    }

    function open(config) {
        container.appendChild(config.el);

        config.onOpen && config.onOpen(config);

        if (!config.timeout) { return };

        setTimeout($ => {
            close(config);
        }, config.timeout)
    }

    function close(config) {
        config.onClose && config.onClose(config);

        config.el.remove();
    }


    function bindClick(config) {
        config.el.addEventListener("click", e => {
            if (config.clickToClose) {
                close(config);
            }

            config.onClick && config.onClick(config);
    
        })

    }



})();