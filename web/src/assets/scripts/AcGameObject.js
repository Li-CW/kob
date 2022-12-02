/*
    渲染引擎。AGO中的所有对象，再调用一次start函数之后，会每秒会每秒调用60次 update 函数。
*/

const AC_GAME_OBJECT = [];

export class AcGameObject {
  constructor() {
    //   将对象放入 AGO数组
    AC_GAME_OBJECT.push(this);
    // 时间差
    this.timedelta = 0;
    // 是否执行start函数
    this.has_called_start = false;
  }
  // 只执行一次
  start() {}
  // 每帧执行一次
  update() {}

  on_destroy() {}
  destroy() {
    this.on_destroy();
    for (let i in AC_GAME_OBJECT) {
      const obj = AC_GAME_OBJECT[i];
      if (obj === this) {
        AC_GAME_OBJECT.splice(i);
        break;
      }
    }
  }
}

let last_timestamp;
const step = (timestamp) => {
  // AGO中的对象，按照放入顺序执行，对于同一个对象的操作，后放入的会覆盖先放入的
  for (let obj of AC_GAME_OBJECT) {
    //   首先执行start函数
    if (!obj.has_called_start) {
      obj.has_called_start = true;
      obj.start();
    }
    // 之后指向update函数
    else {
      obj.timedelta = timestamp - last_timestamp;
      obj.update();
    }
  }
  last_timestamp = timestamp;
  requestAnimationFrame(step);
};
requestAnimationFrame(step);
