function interval() {
    setTimeout(() => {
        console.log(1)
        interval();
    }, 1000);
}

// interval();
// class User {
//     constructor(name, age, gender) {
//         this.name = name;
//         this.age = age;
//         this.gender = gender;
//         this.act = function () {
//             console.log(1);
//         };
//     }

//     eat(){
//         console.log(2)
//     }
// }

// let whh = new User("whh", 20, "male");
// whh.act();
// whh.eat();
// console.log(whh.constructor)
// console.log(whh.prototype)

// console.log(new User("whh", 19, "male"))
let arr = [
    {
        id: 1,
        n: 'a',
    },
    {
        id: 2,
        n: 'b',
    },
    {
        id: 3,
        n: 'c',
    },
    {
        id: 4,
        n: 'a1',
        parent_id: 1
    },
    {
        id: 5,
        n: 'a2',
        parent_id: 1
    },
    {
        id: 6,
        n: 'a3',
        parent_id: 1
    },
    {
        id: 7,
        n: 'b1',
        parent_id: 2
    },
    {
        id: 8,
        n: 'b2',
        parent_id: 2
    },
    {
        id: 9,
        n: 'b3',
        parent_id: 2
    },
    {
        id: 10,
        n: 'c1',
        parent_id: 3
    },
    {
        id: 11,
        n: 'c2',
        parent_id: 3
    },
    {
        id: 12,
        n: 'a1.1',
        parent_id: 4
    },
]

let obj = {
    children:[]
}

let log = [];

//分离出第一层结构
function boot(){
    arr.forEach((it, index) => {
        if(!it.parent_id){
            obj.children.push(it)
            log.push(index);
        }
    })
}

function next(result){
    result.forEach(it => {
        it.children = it.children || [];
        arr.forEach((e, index) => {
            if(log.includes(index)){
                return;
            }
            if(e.parent_id === it.id){
                it.children.push(e);
                log.push(index);
                next(it.children);
            }
        })
    })
      
}



/*
* 分离每一层
* @param level Array 需要迭代的层级内数组
* */
function starter(level) {
  if (!level)
    return;
  /*迭代当前层级中的每一项*/
  level.forEach(function (parent) {
    /*初始化下一级的children*/
    parent.children = parent.children || [];

    /*迭代所有数据*/
    arr.forEach(function (item, i) {
      /*如果已经分类储存直接跳过，进行下一次迭代*/
      if (log.indexOf(i) !== -1)
        return;
      /*如果当前对象的父级id等于父级（外部迭代）的id*/
      if (item.parent_id === parent.id) {
        /*将当前对象推入父级*/
        parent.children.push(item);
        /*记录当前对象的索引，说明这个对象已经分类过了*/
        log.push(i);
        starter(parent.children);
      }
    });
  })
}
/*先找到并分类顶级对象*/


boot();
next(obj.children);
// starter(obj.children);
// console.log(obj, log)



let whh = {
    name: "王花花",
    age: 18,
    gender: "male",
}

console.log(whh);

//工厂函数 factory function 
function user(name, age, gender){
    let person  = {};
    person.name = name;
    person.age = age;
    person.gender = gender;
    return person;
}

console.log(user("whh", 18, "male"));

// 构造函数
// function User(name, age, gender){
//     this.name = name;
//     this.age = age;
//     this.gender = gender;
// }

class User {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}

//实例化需要 new 
console.log(new User("lsd", 10, "female"))

function Dog() {
    this.age = 5;
    this.name = "ww"
    this.gender = "male";
    this.act = function(){
        console.log("act")
    }

    this.greeting = function () {
        console.log("我叫" + this.name)
    }
}

console.log( new Dog );

//原型 prototype 
function Person(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
}

Person.prototype.greeting = function() {
    console.log("我叫" + this.name);
}

let a = new Person('王花花', 19, "male");

let b = new Person("赵柯爽", 20, "female");

console.log(a,b);
console.log(a.__proto__.greeting === b.__proto__.greeting)

