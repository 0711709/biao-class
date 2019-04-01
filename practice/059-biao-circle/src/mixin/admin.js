import api from "../lib/api";
import { call as valee } from "../lib/valee";
import Pagination from "../components/Pagination";

export default {
    components: { Pagination },
    data() {
        return {
            createOrCancel: false,
            list: {},
            current: {},
            timer: null,
            errors: {
                // username: { lengthBetween: true, regex: true }
            },
            total: 0,
            // formStatus: false,
        };
    },

    mounted() {
        this.read();
    },

    methods: {
        read() {
            //, { except: ["password"] }
            api(`${this.model}/read`, this.readParams).then(r => {
                this.list = r.data;
                this.total = r.total;
            });
        },

        filp(page) {
            this.readParams.page = page;
            this.read();
        },

        debounceValidate(field) {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this.validate(field);
            }, 500);
        },

        validate(field) {
            let ruleObj = this.rules[field];
            let fieldValue = true;

            for (let key in ruleObj) {
                let rule = ruleObj[key];
                let params = rule.params || [];
                let valid = valee(key, this.current[field], ...params);

                if (typeof valid === "boolean") {
                    if (!valid) {
                        fieldValue = false;
                    }
                    this.afterValidate(field, key, valid);
                } else {
                    valid.then(r => {
                        this.afterValidate(field, key, r);
                    });
                }
            }
            return fieldValue;
        },

        afterValidate(field, key, valid) {
            if (!this.errors[field]) {
                this.$set(this.errors, field, {});
            }
            this.$set(this.errors[field], key, !valid);
        },

        validateForm() {
            let valid = true;
            for (let field in this.rules) {
                if (!this.validate(field)) {
                    console.log(field, 2)
                    valid = false;
                }
            }
            return valid;
        },

        deleteUser(id) {
            if (!confirm("确定删除")) {
                return;
            }
            api(`${this.model}/delete`, { id }).then(r => {
                this.read();
            });
        },
    }
};