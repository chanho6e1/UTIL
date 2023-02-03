package com.youtil.server.domain.post;

import com.youtil.server.domain.BaseEntity;
import com.youtil.server.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PostFileDto{

    private int idx;

    private String path;

    @Builder
    public PostFileDto(String path){
        this.path = path.replace("https://utilbucket.s3.ap-northeast-2.amazonaws.com/static/post","");
    }
}
