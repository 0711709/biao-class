window.vali = {
    isUsername,
    isEmail,
    isPhone, 
    isPassword,
    positive,
    betweenLength,
    between
};

function isUsername(str) {
    return betweenLength(str, 4, 12);
}

function isEmail(str) {
    return str.includes("@");
}

function isPhone(str) {
    return !((str.length != 11 && str.length != 13 && str.length != 14) || !str.startsWith("1"))
}

function isPassword(str) {
    return betweenLength(str, 6, 64);
}

function positive(num) {
    return num >= 0;
}

function betweenLength(str, min, max) {
    return between(str.length, min, max);
}

function between(num, min, max) {
    return num >= min && num <= max;
}
