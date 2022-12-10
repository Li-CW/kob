package com.kob.backend.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.kob.backend.pojo.User;
import org.apache.ibatis.annotations.Mapper;
//集成BaseMapper<User> 就不用自己写实现类了
@Mapper
public interface UserMapper extends BaseMapper<User> {
}
