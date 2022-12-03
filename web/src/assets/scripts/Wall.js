/*
    Wall 类继承 AGO 类。首先执行 start 函数，然后每秒执行60次 update 函数。

    函数：
        构造函数接收一个墙块坐标与地图对象（地图对象中，保存了地图和画布）
        render 函数：在画布中画出墙体。

    注：创建 GameMap 对象的时候，在构造函数中，先将 GameMap 对象放入 AGO 中，
        然后在 create_walls 函数中创建墙体，在 Wall 构造的时候，将对象放入 AGO 中。
        GameMap 对象位于 Wall 对象前面，所以会先画背景，然后画墙体。
        符合正常逻辑。     
*/
import { AcGameObject } from "./AcGameObject";
export class Wall extends AcGameObject {
    constructor(r, c, gamemap) {
        // 将对象放入ACG数据
        super();
        this.r = r;
        this.c = c;
        this.gamemap = gamemap;
        this.color = "#B37226";
    }

    update() {
        this.render();
    }

    render() {
        // 获得单位长度
        const L = this.gamemap.L;
        // 获取画布
        const ctx = this.gamemap.ctx;
        // 设置颜色
        ctx.fillStyle = this.color;
        // 画出一块墙体
        ctx.fillRect(this.c * L, this.r * L, L, L);
    }
}
