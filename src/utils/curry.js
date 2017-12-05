//函数柯里化
function sub_curry(fn) {
    var args = [].slice.call(arguments, 1);
    return function () {
        return fn.apply(this, args.concat([].slice.call(arguments)));
    }
}

function curry(fn, length) {
    length = length || fn.length;
    return function () {
        if (arguments.length < length) { //当参数不够时再次调用curry函数
            var combined = [fn].concat([].slice.call(arguments));
            return curry(sub_curry.apply(this, combined), length - arguments.length);
        } else {
            return fn.apply(this, arguments); //计算结果
        }
    }
}

var fn = curry(function (a, b, c) {
    return [a, b, c];
})

console.log(fn('a')('b')('c'))
