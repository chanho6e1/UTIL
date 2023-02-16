package com.youtil.server.common;

import com.youtil.server.repository.post.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.util.Date;
@Component
@Slf4j
@RequiredArgsConstructor
public class Scheduler {

    private final PostRepository postRepository;
//    @Scheduled(cron = "0 0 9 ? * MON")
    @Scheduled(cron = "0/10 * * * * ?")
    @Transactional
    public void run() {
        // TODO
//        System.out.println("현재 시간은 " + new Date());
        postRepository.findPostByCreateTime().stream().forEach((post)-> {
            try {
                post.setScore(post);
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
        });

    }
}
