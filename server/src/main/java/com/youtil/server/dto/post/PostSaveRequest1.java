package com.youtil.server.dto.post;

import com.youtil.server.domain.post.Post;
import lombok.Data;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Getter
public class PostSaveRequest1 {


    List<MultipartFile> files;

//    public Post of() {
//        return Post.builder().contentLists(contentLists).build();
//    }
}
