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
            rules: {
                username: {
                    required: {
                        msg: "此项为必填项"
                    },
                    unique: {
                        params: ["user", "exists", "username"],
                        msg: "用户名已存在"
                    },
                    lengthBetween: {
                        params: [4, 12],
                        msg: "用户名长度应在4至12位之间"
                    },
                    regex: {
                        params: [/^[a-zA-Z]+[0-9]*$/],
                        msg: "用户名应由字母或数字组成,并且以字母为首"
                    }
                },
                nickname: {
                    regex: {
                        params: [/^[a-zA-Z]+[0-9]*$/],
                        msg: "昵称应由字母或数字组成,并且以字母为首"
                    }
                },
                password: {
                    required: {
                        msg: "此项为必填项"
                    },
                    lengthBetween: {
                        params: [6, 32],
                        msg: "密码长度在6到32位之间"
                    },
                    regex: {
                        params: [/(?=.*[0-9])(?=.*[a-zA-Z])/],
                        msg: "密码应包含数字和字母"
                    }
                }
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
            for (let field in this.rules) {
                if (!this.validate(field)) {
                    return false;
                }
            }
            return true;
        },

        deleteUser(id) {
            if (!confirm("确定删除")) {
                return;
            }
            api(`${this.model}/delete`, { id }).then(r => {
                this.read();
            });
        },

        createOrUpdate() {
            //先验证
            if (!this.validateForm()) {
                return;
            }

            let action;
            if (this.current.id) {
                action = "update";
            } else {
                action = "create";
            }
            api(`${this.model}/${action}`, this.current).then(r => {
                this.read();
                this.current = {};
                this.createOrCancel = false;
            });
        }
    }
};