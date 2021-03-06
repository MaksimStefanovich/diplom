package com.stefanovich.controllers;

import com.stefanovich.dto.InitDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "init API", description = "Метод возвращает общую информацию о блоге")
public class DefaultController {
    @GetMapping("/api/init")
    public InitDto init() {
        return InitDto.builder()
                .title("DevPub")
                .subtitle("Рассказы разработчиков")
                .phone("+7 903 666-44-55")
                .email("maxim.stefanovich85@gmail.com")
                .copyright("Maksim Stefanovich")
                .copyrightFrom("2005")
                .build();
    }
}
