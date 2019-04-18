import session from "./session";
import store from "./store";
import api from "./api"

let localCart = {};

const callbackPool = [];

const output = {
    onChange(fn) {
        if (callbackPool.find(it => it === fn)) {
            return;
        }
        callbackPool.push(fn);
    },

    callPool() {
        callbackPool.forEach(fn => fn(localCart))
    },

    //获取数据
    // get() {
    //     return { ...localCart };
    // },

    //恢复数据
    restore() {
        this.restoreLocal();
        this.callPool();
    },


    //从本地恢复数据
    restoreLocal() {
        localCart = store.get('cart') || {};
    },

    /**
     * 购物车商品改变时
     * @param {number} product_id 产品ID 
     * @param {number} count 产品数量
     * @param {object} product 产品数据
     */
    change(product_id, count, product, prop) {
        if (!localCart[product_id]) {
            localCart[product_id] = { count: 0, product_id, product_snapshot: product }
        }

        localCart[product_id].count += count;
        localCart[product_id].prop = prop;

        this.sync();
        this.callPool();
    },

    //移除购物车中的商品
    remove(product_id) {
        delete localCart[product_id];
        this.sync();
        this.callPool();
    },

    //清空购物车
    clear() {
        localCart = {}
        this.sync();
        this.callPool();
        // localCart = store.get('cart') || {}
    },

    //同步购物车内容
    sync() {
        if (session.loggedin()) {
            this.syncCould();
        }
        this.syncLocal();
    },

    //本地同步
    syncLocal() {
        store.set("cart", localCart);
    },

    //云端同步
    syncCould() {
        let cart = localCart;
        api("user/update", { id: session.user().id, cart })
    }

}

init();

function init() {
    //获取数据
    output.restore();
}



export default output;