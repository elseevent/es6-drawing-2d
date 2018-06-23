import { Vector2 } from "../lib/structs/ees.structs.vector2.js";

var vector = new Vector2(12, 13);
//has getter properties [x,y,w] ;
console.log(`vector create at timestamp ${vector.w}`);
//no setter properties [x,y,w] 
console.log(`vector.x value is ${vector.x}`);

try {
    console.log("begin change vector.x value to 100");
    vector.x = 100;
} catch (error) {
    console.log(error.message);
    console.log(`vector.x value change deny`);
}


console.log(`vector ${vector} normalized is ${vector.normalize()} and trend is ${Vector2.trend(vector)}`);

var vector2 = vector.forward(200);

console.log(`a new vector2 on vector forward 200 unit at ${vector2}`);

console.log(`now distance is ${Vector2.distance(vector,vector2)}`);

var vector3 = vector.forward(-100);

console.log(`a new vector3 on vector forward -100 (eq. backward 100) unit at ${vector3}`);

console.log(`vector3 at Vector2.ORIGIN angle is ${Vector2.angle(vector3,Vector2.ORIGIN)}`);



var pivot = new Vector2(20, 10);
var vector4 = vector.shift(pivot);

console.log(`a new vector4 on vector shift ${vector4} at pivot ${pivot} `);

console.log(`now distance is ${Vector2.distance(vector,vector4)}`);