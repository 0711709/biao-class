
import api from "../lib/api"
import { call as valee } from "../lib/valee"

export default {
    mounted() {
        this.read();
    },

    methods: {
        read() {
            api(`${this.model}/read`, this.params).then(r => {
                if (r.success) {
                    this.list = r.data;
                    this.total = r.total;
                }
            });
        },

        debounceValidate(field) {
            //如果某个字段和原值一样就不验证
            if (this.form[field] == this.formCopy[field]) {
                return;
            }
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this.validate(field);
            }, 500);
        },

        //验证某一个字段的规则
        validate(field) {
            //拿到这个字段的所有规则
            let ruleObj = this.rules[field];
            let fieldValue = true;
            //循环验证每一个规则
            for (let key in ruleObj) {
                let rule = ruleObj[key];
                let params = rule.params || [];
                let valid = valee(key, this.form[field], ...params);
                //同步规则返回布尔值, 异步规则返回一个 promise
                if (typeof valid === "boolean") {
                    if (!valid) {
                        fieldValue = false;
                    }
                    this.afterValidate(field, key, valid);
                } else {
                    this.pending = true;
                    valid.then(r => {
                        this.afterValidate(field, key, r);
                        this.pending = false;
                        this.asynValid = r;
                    });
                }
            }
            return fieldValue;
        },

        //验证规则之后
        afterValidate(field, key, valid) {
            //初始化空的 errors 对象
            if (!this.errors[field]) {
                this.$set(this.errors, field, {});
            }
            this.$set(this.errors[field], key, !valid);
        },

        //验证整个表单
        validateForm() {
            let valid = true;
            for (let field in this.rules) {
                //如果某个字段和原值一样就不验证
                if (this.form.id && this.form[field] === this.formCopy[field]) {
                    continue;
                }
                if (!this.validate(field)) {
                    valid = false;
                }
            }
            return valid;
        },

        //设置各行颜色
        tableRowClassName({ rowIndex }) {
            if (rowIndex % 2 == 1) {
                return "warning-row";
            } else {
                return "success-row";
            }
        },

        handleDelete(id) {
            if (!confirm("确定删除")) {
                return;
            }

            api(`${this.model}/delete`, { id }).then(r => {
                if (r.success) {
                    this.read();
                }
            });
        },

        handleEdit(r) {
            this.show = true;
            this.formCopy = { ...r };
            this.form = r;
        },

        cancelEdit() {
            this.form = {};
            this.show = false;
            this.errors = {};
        },

        createOrUpdate() {
            if (!this.validateForm()) {
                return;
            }

            //异步验证结果
            if (!this.asynValid) {
                return;
            }

            let action = this.form.id ? "update" : "create";
            api(`${this.model}/${action}`, this.form).then(r => {
                if (r.success) {
                    this.read();
                    this.form = {};
                    this.formCopy = {};
                    this.show = false;
                    this.errors = {};
                }
            });
        },

        handleCurrentChange(page) {
            this.params.page = page;
            this.read();
        }
    }
};
