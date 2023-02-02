package com.youtil.server.repository.post;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youtil.server.domain.post.PostComment;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

import static com.youtil.server.domain.post.QPost.post;
import static com.youtil.server.domain.post.QPostComment.postComment;
import static com.youtil.server.domain.post.QPostLike.postLike;

@RequiredArgsConstructor
@Repository
public class PostCommentQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public List<PostComment> findPostList(Long postId, PageRequest pageRequest) {
        return jpaQueryFactory.select(postComment).distinct().from(postComment)
                .where(postComment.post.postId.eq(postId))
                .orderBy(postComment.createdDate.desc())
                .offset(pageRequest.getOffset()).limit(pageRequest.getPageSize())
                .fetch();
    }
}
