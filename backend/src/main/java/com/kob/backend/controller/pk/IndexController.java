package com.kob.backend.controller.pk;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pk")
public class IndexController {
    @RequestMapping("getbotinfo")
    public String getBotInfo(){
        System.out.println("run function");
        return "myBot";
    }
}
