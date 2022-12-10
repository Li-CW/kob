package com.kob.backend.service.impl.user.account;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.User;
import com.kob.backend.service.user.account.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RegisterServiceImpl implements RegisterService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public Map<String, String> register(String username, String password, String confirmedPassword) {

        Map<String, String> map = new HashMap<>();
        username = username.trim();
        password = password.trim();
        confirmedPassword = confirmedPassword.trim();
        if(username == null){
            map.put("error_message", "用户名不能为空");
            return map;
        }
        if(password == null){
            map.put("error_message", "密码不能为空");
            return map;
        }
        if(username.length() > 100){
            map.put("error_message", "用户名太长");
            return map;
        }
        if(password.length() > 100){
            map.put("error_message", "密码太长");
            return map;
        }
        if(!password.equals(confirmedPassword)){
            map.put("error_message", "两次密码不一致");
            return map;
        }

        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", username);
        List<User> users = userMapper.selectList(queryWrapper);

        if(!users.isEmpty()){
            map.put("error_message", "用户名重复");
            return map;
        }
        String encodedPassword = passwordEncoder.encode(password);
        String photo = "https://app2098.acapp.acwing.com.cn/static/img/7_1670209340_.jpg";
        User user = new User(null, username, encodedPassword, photo);
        userMapper.insert(user);
        map.put("error_message", "success");
        return map;
    }
}
