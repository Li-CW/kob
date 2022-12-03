
import { AcGameObject } from "./AcGameObject";
import { Cell } from "./Cell";

export class Snake extends AcGameObject {
    constructor(info, gamemap) {
        super();
        this.id = info.id;
        this.gamemap = gamemap;
        this.color = info.color;
        this.cells = [new Cell(info.r, info.c)];
        this.next_cell = null;
        this.speed = 5;
        this.direction = -1;
        this.status = "idle";//move, die

        this.dr = [-1, 0, 1, 0];
        this.dc = [0, 1, 0, -1];
        this.step = 0;
        this.eps = 1e-2;

        this.eye_dircetion = 0;
        if (this.id === 1) this.eye_dircetion = 2;

        this.eye_dx = [
            [-1, 1],
            [1, 1],
            [1, -1],
            [-1, -1],
        ];
        this.eye_dy = [
            [-1, -1],
            [-1, 1],
            [1, 1],
            [1, -1],
        ];
    }
    // 设置蛇的方向，有地图类调用
    set_direction(d) {
        this.direction = d;
    }
    // 判断蛇是否要变长
    check_tail_incresing() {
        if (this.step <= 10) return true;
        if (this.step % 3 === 0) return true;
        return false;
    }
    start() { }
    // 蛇走下一步
    next_step() {
        const d = this.direction;
        this.eye_dircetion = d;
        // 先求出蛇头目标位置。

        this.next_cell = new Cell(this.cells[0].r + this.dr[d], this.cells[0].c + this.dc[d]);
        // 然后判断目标位置是否会导致蛇死亡
        if (!this.gamemap.check_valid(this.next_cell)) {
            this.status = "die";
            return;
        }
        // 方向恢复-1
        this.direction = -1;
        // 蛇开始移动，状态置为 move
        this.status = "move";
        // 步数+1
        this.step++;
        const k = this.cells.length;
        // 复制蛇身体。双头蛇
        for (let i = k; i > 0; i--) {
            this.cells[i] = JSON.parse(JSON.stringify(this.cells[i - 1]));
        }

    }
    update_move() {
        // 计算蛇头到目标距离
        const dx = this.next_cell.x - this.cells[0].x;
        const dy = this.next_cell.y - this.cells[0].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        // 判读是否走到终点
        if (distance < this.eps) {//走到了终点
            this.cells[0] = this.next_cell;
            this.next_cell = null;
            this.status = "idle";
            // 处理蛇长度，双尾蛇
            if (!this.check_tail_incresing()) {
                this.cells.pop();
            }
        } else {//没有走到终点
            // 计算移动距离
            const move_distance = this.speed * this.timedelta / 1000;
            // 蛇头移动
            this.cells[0].x += move_distance * dx / distance;
            this.cells[0].y += move_distance * dy / distance;
            // 处理蛇尾移动
            if (!this.check_tail_incresing()) {
                // 蛇尾移动
                const k = this.cells.length;
                const tail = this.cells[k - 1];
                const tail_target = this.cells[k - 2];
                const tail_dx = tail_target.x - tail.x;
                const tail_dy = tail_target.y - tail.y;
                tail.x += move_distance * tail_dx / distance;
                tail.y += move_distance * tail_dy / distance;
            }
        }
    }
    update() {
        if (this.status === 'move') {
            this.update_move();
        }
        this.render();
    }

    render() {
        const L = this.gamemap.L;
        const ctx = this.gamemap.ctx;
        ctx.fillStyle = this.color;
        // 如果蛇死了，蛇变白色
        if (this.status === 'die') {
            ctx.fillStyle = "white";
        }
        // 画蛇的身体 
        for (const cell of this.cells) {
            ctx.beginPath();
            ctx.arc(cell.x * L, cell.y * L, L / 2 * 0.8, 0, Math.PI * 2);
            ctx.fill();
        }
        // 填充蛇的身体
        for (let i = 1; i < this.cells.length; i++) {
            const a = this.cells[i - 1];
            const b = this.cells[i];
            if (Math.abs(a.x - b.x) < this.eps && Math.abs(a.y - b.y) < this.eps)
                continue;
            if (Math.abs(a.x - b.x) < this.eps) {
                ctx.fillRect((a.x - 0.4) * L, Math.min(a.y, b.y) * L, L * 0.8, Math.abs(a.y - b.y) * L);
            } else {
                ctx.fillRect(Math.min(a.x, b.x) * L, (a.y - 0.4) * L, Math.abs(a.x - b.x) * L, L * 0.8);
            }
        }
        //画蛇的眼睛 
        ctx.fillStyle = "black";
        for (let i = 0; i < 2; i++) {
            const eye_x = (this.cells[0].x + this.eye_dx[this.eye_dircetion][i] * 0.15) * L;
            const eye_y = (this.cells[0].y + this.eye_dy[this.eye_dircetion][i] * 0.15) * L;
            ctx.beginPath();
            ctx.arc(eye_x, eye_y, 0.05 * L, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}
