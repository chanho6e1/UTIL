package com.youtil.server.server.repository.post;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youtil.server.domain.post.PostComment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.youtil.server.domain.post.QPost.post;
import static com.youtil.server.domain.post.QPostComment.postComment;

//@RequiredArgsConstructor
@Repository
public interface PostCommentQueryRepository {

//    private final JPAQueryFactory jpaQueryFactory;
//        public List<PostComment> findByUserComment(Long userId){
//        return jpaQueryFactory
//                .select(postComment)
//                .distinct()
//                .from(postComment)
//                .innerJoin(postComment.user)
//                .where(postComment.user.userId.eq(userId))
//                .orderBy(findCriteria("date")).fetch();
//    }

    private OrderSpecifier<?> findCriteria(String criteria){ //정렬 조건
        if(criteria.contains("date")){
            return post.createdDate.desc();
        } else if(criteria.contains("like")){
            return post.postLikeList.postLikeList.size().desc();
        } else if(criteria.contains("view")){
            return post.views.desc();
        } else if(criteria == null){
            return post.createdDate.desc();
        }

        return post.createdDate.desc();
    }
}
