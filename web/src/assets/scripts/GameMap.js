/* 
    GameMap 类继承 AGO 类。首先执行 start 函数，然后每秒执行60次 update 函数。

    函数：
        构造函数接收地图dom对象和地图中的画布dom对象。
        check_connectivity 函数：检查地图的起点和终点是否联通
        create_walls 函数：创建地图中的墙体，并保证起点终点联通。
        start 函数：调用 create_walls, 创建地图中的墙体。
        update_size 函数：就算画布单位长度（一个小正方形的长度），更新画布边长。
        render 函数：画地图背景。（草地部分）
        update 函数：调用 update_size 函数，然后调用 render 。每秒60次渲染地图背景。

    注：创建 GameMap 对象的时候，在构造函数中，先将 GameMap 对象放入 AGO 中，
        然后在 create_walls 函数中创建墙体，在 Wall 构造的时候，将对象放入 AGO 中。
        GameMap 对象位于 Wall 对象前面，所以会先画背景，然后画墙体。
        符合正常逻辑。 
*/

import { AcGameObject } from "./AcGameObject";
import { Snake } from "./Snake";
import { Wall } from "./Wall";
export class GameMap extends AcGameObject {
    // GameMap.vue 组件中创建了这个类的对象，
    // 传入了canvas 的ctx, 和 background
    constructor(ctx, parent) {
        //   通过super函数，将该对象放入ACG数组。
        super();
        this.ctx = ctx;
        this.parent = parent;
        this.L = 0;
        this.rows = 13;
        this.cols = 14;

        this.inner_walls_count = 30;
        this.walls = [];

        this.snakes = [
            new Snake({ id: 0, color: "#4876EC", r: this.rows - 2, c: 1 }, this),
            new Snake({ id: 1, color: "#F94848", r: 1, c: this.cols - 2 }, this),
        ];
    }
    // 检测g的起点和终点是否联通
    check_connectivity(g, sx, sy, tx, ty) {
        if (sx == tx && sy == ty) return true;
        //  标记当前点已经走过，不用恢复现场
        g[sx][sy] = true;
        //   上下左右四个方向
        let dx = [-1, 0, 1, 0],
            dy = [0, 1, 0, -1];
        for (let i = 0; i < 4; i++) {
            let x = sx + dx[i],
                y = sy + dy[i];
            // 递归检测相邻点。因为四周墙，不用做越界检查
            if (!g[x][y] && this.check_connectivity(g, x, y, tx, ty)) {
                return true;
            }
        }
        return false;
    }
    // 创建地图中的墙
    create_walls() {
        //   g中保存的所有墙
        const g = [];
        // 地图四周画墙
        for (let r = 0; r < this.rows; r++) {
            g[r] = [];
            for (let c = 0; c < this.cols; c++) {
                g[r][c] = false;
            }
        }
        // 去除起点和终点的墙
        for (let r = 0; r < this.rows; r++) {
            g[r][0] = g[r][this.cols - 1] = true;
        }
        for (let c = 0; c < this.cols; c++) {
            g[0][c] = g[this.rows - 1][c] = true;
        }

        //填充中间的墙，对称填充。一次循环填两个墙体
        for (let i = 0; i < this.inner_walls_count / 2; i++) {
            // 每次随机一个位置，如过已经有墙，再次随机，直到找到没墙的点
            for (let j = 0; j < 1000; j++) {
                let r = parseInt(Math.random() * this.rows);
                let c = parseInt(Math.random() * this.cols);
                // 已经有墙了，就再次随机
                if (g[r][c] || g[this.rows - 1 - r][this.cols - 1 - c]) continue;
                // 如果是起点或者终点，不能画墙，再次随机
                if ((r == this.rows - 2 && c == 1) || (r == 1 && c == this.cols - 2))
                    continue;
                // 对称画墙(照片给你信对称)
                g[r][c] = g[this.rows - 1 - r][this.cols - 1 - c] = true;
                break;
            }
        }
        //   检查地图是否联通。复制一份地图，防止原地图被修改。
        const copy_g = JSON.parse(JSON.stringify(g));
        if (!this.check_connectivity(copy_g, this.rows - 2, 1, 1, this.cols - 2))
            return false;
        //   地图连通，画出墙体
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                //   该位置有墙
                if (g[r][c]) {
                    // 创建墙
                    this.walls.push(new Wall(r, c, this));
                }
            }
        }
        return true;
    }
    // 监听键盘输入，控制蛇运动
    add_listening_enents() {
        this.ctx.canvas.focus();
        const [snake0, snake1] = this.snakes;
        this.ctx.canvas.addEventListener("keydown", e => {
            if (e.key === 'w') snake0.set_direction(0);
            else if (e.key === 'd') snake0.set_direction(1);
            else if (e.key === 's') snake0.set_direction(2);
            else if (e.key === 'a') snake0.set_direction(3);
            else if (e.key === 'ArrowUp') snake1.set_direction(0);
            else if (e.key === 'ArrowRight') snake1.set_direction(1);
            else if (e.key === 'ArrowDown') snake1.set_direction(2);
            else if (e.key === 'ArrowLeft') snake1.set_direction(3);
        });

    }

    // 初始化函数，只执行一次
    start() {
        //   这里最好也计算下地图的长宽和单位长度
        this.update_size();
        //   尝试创建地图，在1000次尝试过程中，出现合法地图则停止。
        for (let i = 0; i < 1000; i++) {
            if (this.create_walls()) break;
        }
        this.add_listening_enents();
    }
    // 更新地图长宽
    update_size() {
        //   计算单位长度
        this.L = parseInt(
            Math.min(
                this.parent.clientWidth / this.cols,
                this.parent.clientHeight / this.rows
            )
        );
        // 设置画布长宽
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }
    // 蛇是否可以走下一步 
    check_ready() {
        // 循环判断两条蛇
        for (const snake of this.snakes) {
            // 不是限制
            if (snake.status !== "idle") return false;
            if (snake.direction === -1) return false;
        }
        return true;
    }
    // 让地图中的所有蛇走下一步
    next_step() {
        for (const snake of this.snakes) {
            snake.next_step();
        }
    }
    //检查蛇是否存活（判断新蛇头即可）
    check_valid(cell) {
        // 蛇头是否撞墙
        for (const wall of this.walls) {
            if (wall.r === cell.r && wall.c === cell.c)
                return false;
        }
        // 蛇头是否撞到了两条蛇的身体
        for (const snake of this.snakes) {//两条蛇
            let k = snake.cells.length;
            // 先处理变短
            if (!snake.check_tail_incresing())
                k--;
            // 蛇头是否撞到了身体
            for (let i = 0; i < k; i++) {
                if (snake.cells[i].r === cell.r && snake.cells[i].c === cell.c)
                    return false;
            }
        }
        return true;
    }
    // 更新地图，每一帧执行一次。
    update() {
        //   先更新地图大小
        this.update_size();
        // 蛇走下一步
        if (this.check_ready()) {
            this.next_step();
        }
        // 重新画地图
        this.render();
    }

    render() {
        // 画地图背景
        const color_even = "#AAD751",
            color_odd = "#A2D149";
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if ((c + r) % 2 == 0) {
                    this.ctx.fillStyle = color_even;
                } else {
                    this.ctx.fillStyle = color_odd;
                }
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
            }
        }
    }
}
