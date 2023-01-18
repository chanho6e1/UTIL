package com.youtil.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class YoutilApplication {

    public static void main(String[] args) {
        SpringApplication.run(YoutilApplication.class, args);
    }

}
