package com.connexity.demo.packMessage;

//import com.connexity.demo.Message;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(path = "/api")
public class MessageController {
    private Map<String, Integer> visitCounter = new HashMap<>();

    @RequestMapping(path = "/message")
    @ResponseBody
    public Message getMessage(@RequestParam(name = "name")String name) {
        Message message = new Message();
        message.setMessage("Hello, " + name + "!");
        message.setDate(LocalDate.now());

        visitCounter.computeIfAbsent(name, n -> 0);
        visitCounter.compute(name, (key, value) -> value + 1);
        message.setVisits(visitCounter.get(name));

        return message;
    }
}
