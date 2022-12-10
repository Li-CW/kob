/*
    pojo 对应数据库的表
    一个属性对应一列
    一个对象对应一行
 */

package com.kob.backend.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


/*
    Data:
        所有属性的get和set方法
        toString 方法
        hashCode方法
        equals方法
 */
@Data
//生成无参构造方法
@NoArgsConstructor
//生成全参构造函数，且默认不生成无参构造函数。
@AllArgsConstructor
public class User {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private String username;
    private String password;
    private String photo;
}
