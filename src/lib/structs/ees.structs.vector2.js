function isNumber(val) {
    return !Number.isNaN(val) && parseFloat(val) && isFinite(val) && (val != 0 && Number.isFinite(val));
}

/**
 * 使用成员标识符
 */
let _x = Symbol("_x"),
    _y = Symbol("_y"),
    _w = Symbol("_w");

/**
 * 表示一个2D矢量
 */
export class Vector2 {

    /**
     * 构造
     * 
     * @param {Number} x 矢量的 x 坐标
     * @param {Number} y 矢量的 y 坐标
     * @param {Number} w 矢量的 时间刻度
     */
    constructor(x, y, w = (new Date()).getTime()) {
        //私有成员实现
        this[_x] = x;
        this[_y] = y;
        this[_w] = w;
    }

    /**
     * 提供x属性访问
     */
    get x() {
        return this[_x];
    }

    /**
     * 提供y属性访问
     */
    get y() {
        return this[_y];
    }

    /**
     * 提供w属性访问
     */
    get w() {
        return this[_w];
    }

    /* instance member */

    /**
     * 加法运算
     * 
     * @param {Vector2 | Number} val 一个 Vector2 或 数字
     * @returns {Vector2}
     */
    addition(val) {
        if (val instanceof Vector2) {
            return new Vector2(this.x + val.x, this.y + val.y);
        }
        if (isNumber(val)) {
            return new Vector2(this.x + val, this.y + val);
        }
        return this;
    }

    /**
     * 减法运算
     * 
     * @param {Vector2 | Number} val 一个 Vector2 或 数字
     * @returns {Vector2}
     */
    subtract(val) {
        if (val instanceof Vector2) {
            return new Vector2(this.x - val.x, this.y - val.y);
        }
        if (isNumber(val)) {
            return new Vector2(this.x - val, this.y - val);
        }
        return this;
    }

    /**
     * 乘法运算
     * 
     * @param {Vector2 | Number} val 一个 Vector2 或 数字
     * @returns {Vector2}
     */
    multiply(val) {
        if (val instanceof Vector2) {
            return new Vector2(this.x * val.x, this.y * val.y);
        }
        if (isNumber(val)) {
            return new Vector2(this.x * val, this.y * val);
        }
        return this;
    }

    /**
     * 除法运算
     * 
     * @param {Vector2 | Number} val 一个 Vector2 或 数字
     * @returns {Vector2}
     */
    divide(val) {
        if (val instanceof Vector2) {
            return new Vector2(this.x / val.x, this.y / val.y);
        }
        if (isNumber(val)) {
            if (val == 0) {
                return Vector2.ZERO.copy();
            }
            return new Vector2(this.x / val, this.y / val);
        }
        return this;
    }

    /**
     * 创建副本
     * 
     * @returns {Vector2}
     */
    copy() {
        return new Vector2(this.x, this.y, this.w);
    }

    /**
     * 比较
     * 
     * @param {Vector2} val 一个 Vector2
     * @returns {Vector2}
     */
    compare(val) {
        if (val instanceof Vector2) {
            return Vector2.compare(this, val);
        }
        return 1;
    }

    /**
     * 相等判定
     * 
     * @param {Vector2} val 一个 Vector2
     * @returns {Boolean}
     */
    equals(val) {
        if (val instanceof Vector2) {
            return Vector2.equals(this, val);
        }
        return false;
    }

    /**
     * 矢量的时间刻度差
     * 
     * @param {Vector2} val 一个 Vector2 or 数字时间刻度
     * @returns {Number} 时间差
     */
    elapse(val) {
        if (val instanceof Vector2) {
            return this.t - val.t;
        }
        if (isNumber(val)) {
            return this.t - val;
        }
    }

    /**
     * 矢量大小(长度)
     * 
     * @returns {Number} 当前矢量的大小(长度)
     */
    magnitude() {
        var sqrM = this.sqrMagnitude();
        return Math.sqrt(sqrM);
    }

    sqrMagnitude() {
        return this.x * this.x + this.y * this.y;
    }

    /**
     * 标准化
     * 
     * @returns {Vector2} 长度为1的一个矢量
     */
    normalize() {
        var l = this.magnitude();
        if (l === 0) {
            return Vector2.ORIGIN.copy();
        }
        return this.divide(l);
    }

    /**
     * 基于屏幕坐标的偏移
     * 
     * @param {Vector2} pivot 目标轴心矢量
     * @returns {Vector2} 偏移后的矢量
     */
    shift(pivot) {
        if (pivot instanceof Vector2) {
            return this.subtract(pivot);
        }
        return this;
    }

    /**
     * 基于屏幕坐标的反偏移
     * 
     * @param {Vector2} pivot 偏移轴心
     * @returns {Vector2} 原始位置的矢量
     */
    unshift(pivot) {
        if (pivot instanceof Vector2) {
            return this.addition(pivot);
        }
        return this;
    }

    /**
     * 向当前方向前进指定长度
     * 
     * @param {Number} len 要前进的长度
     * @returns {Vector2} 指定目标的矢量
     */
    forward(len) {
        if (isNumber(len)) {
            var tar = this.normalize().multiply(len);
            return this.addition(tar);
        }
        return this;
    }

    toString() {
        return `{ x:${this.x}, y:${this.y} }`;
    }

    valueOf() {
        return `{ x:${this.x}, y:${this.y}, w:${this.w} }`;
    }

    /* static member */

    /**
     * 获取2个矢量的角度
     * 
     * @param {Vector2} v1 第一个矢量
     * @param {Vector2} v2 第二个矢量
     * 
     * @returns {Number} 角度
     */
    static angle(v1, v2) {
        var a,
            r = v1.magnitude(),
            t = v2.normalize().forward(r - 1);
        a = Vector2.distance(t, v1) * 0.5;
        var half = Math.asin(a / r) * 180 / Math.PI;
        return half * 2;
    }

    /**
     * 比较2个矢量
     * 
     * @param {Vector2} v1 第一个矢量
     * @param {Vector2} v2 第二个矢量
     * 
     * @returns {Vector2} 结果
     */
    static compare(v1, v2) {
        var xd = v1.x - v2.x,
            xda = Math.abs(xd),
            yd = v1.y - v2.y,
            yda = Math.abs(yd);
        return new Vector2(xd / xda, yd / yda);
    }

    /**
     * 获取2个矢量的距离
     * 
     * @param {Vector2} v1 第一个矢量
     * @param {Vector2} v2 第二个矢量
     * 
     * @returns {Number} 距离
     */
    static distance(v1, v2) {
        return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
    }

    /**
     * 获取2个矢量的点积
     * 
     * @param {Vector2} v1 第一个矢量
     * @param {Vector2} v2 第二个矢量
     * 
     * @returns {Number} 
     */
    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    /**
     * 比较2个矢量是否相等
     * 
     * @param {Vector2} v1 第一个矢量
     * @param {Vector2} v2 第二个矢量
     * 
     * @returns {Boolean} 
     */
    static equals(v1, v2) {
        var c = Vector2.compare(v1, v2);
        return c.x === 0 && c.y === 0;
    }

    /**
     * 获取2个矢量间的线性插值
     * 
     * @param {Vector2} v1 第一个矢量
     * @param {Vector2} v2 第二个矢量
     * @param {Number} amount 一个 0.00 ~ 1.00 的线性增量 0.00 = v1, 1.00 = v2
     * 
     * @returns {Vector2} 结果
     */
    static lerp(v1, v2, amount) {
        var a = (amount > 1 ? 1 : (amount < 0 ? 0 : amount)) || 0;
        return v1.addition(v2.subtract(v1).multiply(amount));
    }

    /**
     * 矢量范围限定
     * 
     * @param {Vector2} v 矢量
     * @param {Vector2} min 最小边界矢量
     * @param {Vector2} max 最大边界矢量
     * 
     * @returns {Vector2} 
     */
    static clamp(v, min, max) {
        var x = Math.max(Math.min(v.x, max.x), min.x),
            y = Math.max(Math.min(v.y, max.y), min.y);
        return new Vector2(x, y);
    }

    /**
     * 获取2个矢量的最大值
     * 
     * @param {Vector2} v1 第一个矢量
     * @param {Vector2} v2 第二个矢量
     * 
     * @returns {Vector2}
     */
    static max(v1, v2) {
        return new Vector2(Math.max(v1.x, v2.x), Math.max(v1.y, v2.y));
    }

    /**
     * 获取2个矢量的最小值
     * 
     * @param {Vector2} v1 第一个矢量
     * @param {Vector2} v2 第二个矢量
     * 
     * @returns {Vector2}
     */
    static min(v1, v2) {
        return new Vector2(Math.min(v1.x, v2.x), Math.min(v1.y, v2.y));
    }

    /**
     * 获取2个矢量的中间值
     * 
     * @param {Vector2} v1 第一个矢量
     * @param {Vector2} v2 第二个矢量
     * 
     * @returns {Vector2}
     */
    static mid(v1, v2) {
        var min = Vector2.min(v1, v2),
            max = Vector2.max(v1, v2);
        return max.subtract(min).divide(2).addition(min);
    }

    /**
     * 获取矢量的趋势
     * 
     * @param {Vector2} v 一个矢量
     * 
     * @returns {Vector2} 趋势
     */
    static trend(v) {
        var xt = v.x / Math.abs(v.x),
            yt = v.y / Math.abs(v.y);
        xt = xt || 0,
            yt = yt || 0;
        return new Vector2(xt, yt);
    }
}

Vector2.ORIGIN = new Vector2(0, 0);
Vector2.ZERO = new Vector2(0, 0);
Vector2.ONE = new Vector2(1, 1);
Vector2.LEFT = new Vector2(-1, 0);
Vector2.TOP = new Vector2(0, 1);
Vector2.BOTTOM = new Vector2(0, -1);
Vector2.RIGHT = new Vector2(1, 0);