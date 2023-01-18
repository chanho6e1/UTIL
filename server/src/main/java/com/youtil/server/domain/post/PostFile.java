package com.youtil.server.domain.post;

import com.youtil.server.domain.BaseEntity;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class PostFile extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_id")
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @Column(nullable = false)
    private String originFileName;

    @Column(nullable = false)
    private String savedFileName;

    private Long fileSize;


    @Builder
    public PostFile(String originFileName, String savedFileName, Long fileSize){
        this.originFileName = originFileName;
        this.savedFileName = savedFileName;
        this.fileSize = fileSize;
//        this.post = post;
    }

    // Board 정보 저장
//    public void setPost(Post post){
//        this.post = post;
//
//        // 게시글에 현재 파일이 존재하지 않는다면
//        if(!post.getFileLists().getFileLists().contains(this))
//            // 파일 추가
//            post.getFileLists().add(this);
//    }

}
