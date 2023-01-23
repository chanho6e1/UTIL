package com.youtil.server.repository.post;

import com.youtil.server.domain.post.PostFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostFileRepository extends JpaRepository<PostFile, Long> {

//    PostFile save(PostFile boardPicture);

}
