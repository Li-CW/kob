package com.kob.backend.controller.user.acount;

import com.kob.backend.service.user.account.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class registerController {
    @Autowired
    private RegisterService registerService;
    @PostMapping("/user/account/register/")
    public Map<String, String> register(@RequestBody Map<String, String> map) {
        String username = map.get("username");
        String password = map.get("password");
        String confirmedPassword = map.get("confirmedPassword");
        System.out.println(map);
        return registerService.register(username, password, confirmedPassword);
    }
}
