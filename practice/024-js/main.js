console.log('hello world');
console.log('hello world again');
console.log('hello world again');
(function () {
    'use strict';

})();



let a;
let b;

a = 100;
b = 200;

console.log(a);
console.log(b);

let c;
c = a + b;

console.log(c);

const A = 4;
const PI = 3;

const f = 5;


console.log(PI*A);


const B = 56;
console.log(B);


let arr = [
    [
        [100, 'Emmm'],
        [
            2, 'yo', [666],
        ],
    ],
];
console.log(arr[0][1][2][0]);


let obj = {
    a: [3, 5],
    b: ['Yo', 1],
};
console.log(obj.a.length);
console.log(obj.b.length);


const g = 4;
console.log(g);


let x = 9;
let y = 10;

console.log(x % y);


let name = '李栓但';
let time = "night";
let greeting;

if (time == "moring") {
    greeting = '早上好';
} else if (time == "afternoon") {
    greeting = '下午好';
} else if (time == "night") {
    greeting = '睡了吗';
}

console.log(name + '，' + greeting);
