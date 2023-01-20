package com.youtil.server.server.dto.post;

import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostFile;
import lombok.Builder;
import lombok.Data;

@Data
public class PostFileDto {

    private Long id;                    //id

    private String originFileName;      //원본 파일명

    private String savedFileName;       //저장된 파일명

    private Long fileSize;                  //파일 사이즈

    private Post post;

    public PostFileDto(){
    }

    @Builder
    public PostFileDto(String originFileName, String savedFileName, Long fileSize, Post post){
//        this.id = id;
        this.originFileName = originFileName;
        this.savedFileName = savedFileName;
        this.fileSize = fileSize;
        this.post = post;
    }
//
    public PostFile toEntity(){
        return PostFile.builder()
                .originFileName(originFileName)
                .savedFileName(savedFileName)
                .fileSize(fileSize)
                .build();
    }
}
