package com.youtil.server.repository.post;

import com.youtil.server.domain.post.PostFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostFileRepository extends JpaRepository<PostFile, Long> {

//    PostFile save(PostFile boardPicture);

}
