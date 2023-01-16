package com.youtil.server.repository.post;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youtil.server.domain.post.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.youtil.server.domain.post.QPost.post;

@RequiredArgsConstructor
@Repository
public class PostQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;
    public List<Post> findPostList(int postType, PageRequest pageRequest){
        return jpaQueryFactory.select(post)
                .distinct().from(post)
//                .innerJoin(post.user).fetchJoin()
                .where(post.postType.eq(postType))
                .orderBy(post.createdDate.desc())
                .offset(pageRequest.getOffset()).limit(pageRequest.getPageSize())
                .fetch();
    }

}



