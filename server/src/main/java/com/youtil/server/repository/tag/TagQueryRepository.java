package com.youtil.server.repository.tag;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youtil.server.domain.post.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import java.util.Collection;
import java.util.List;

import static com.youtil.server.domain.post.QPost.post;
import static com.youtil.server.domain.tag.QTagOfPost.tagOfPost;
import static com.youtil.server.domain.user.QFollow.follow;
import static com.youtil.server.domain.user.QUserOfTag.userOfTag;

@RequiredArgsConstructor
@Repository
public class TagQueryRepository { //태그 눌렀을 시 포스트 검색

    private final JPAQueryFactory jpaQueryFactory;

//    public List<Post> findPostListByTag(Long userId, Long tagId, String criteria, PageRequest pageRequest){
//        return jpaQueryFactory.select(tagOfPost.post).distinct().from(tagOfPost)
//                .innerJoin(tagOfPost.post)
//                .where(
//                       tagOfPost.tag.tagId.eq(tagId)
//                        ,isPrivate(userId)
//                )
//                .orderBy(findCriteria(criteria))
//                .offset(pageRequest.getOffset())
//                .limit(pageRequest.getPageSize())
//                .fetch();
//    }
    public Page<Post> findPostListByTag(Long userId, Long tagId, String criteria, Pageable pageRequest){
//        return jpaQueryFactory.select(tagOfPost.post).distinct().from(tagOfPost)
        List<Post> content = jpaQueryFactory.select(tagOfPost.post).distinct().from(tagOfPost)
                .innerJoin(tagOfPost.post)
                .where(
                        tagOfPost.tag.tagId.eq(tagId)
                        ,isPrivate(userId)
                )
                .orderBy(findCriteria(criteria))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetch();
        return new PageImpl<>(content, pageRequest, content.size());
    }

    public Page<Post> findPostListByMyTag(Long userId, String criteria, PageRequest pageRequest) { //나의 관심 태그별 글 조회

//        return jpaQueryFactory.select(tagOfPost.post).distinct().from(tagOfPost)
        List<Post> content = jpaQueryFactory.select(tagOfPost.post).distinct().from(tagOfPost)
                .innerJoin(tagOfPost.post)
                .where(

                        tagOfPost.tag.in(
                                JPAExpressions
                                        .select(userOfTag.tag).from(userOfTag)
                                        .where( userOfTag.user.userId.eq(userId)
                                        ))
                        ,isPrivate(userId)
                )
                .orderBy(findCriteria(criteria))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetch();
        return new PageImpl<>(content, pageRequest, content.size());
    }

    private BooleanExpression isPrivate(Long userId){ //or사용 / 공개이거나(2) / 이웃만 공개(1, 글쓴이가 팔로우한 사람만)
        return  tagOfPost.post.isPrivate.eq(2).or(
                tagOfPost.post.user.userId.in(JPAExpressions
                        .select(follow.fromUser.userId).from(follow)
                        .where(follow.toUser.userId.eq(userId).or(tagOfPost.post.user.userId.eq(userId)),
                                tagOfPost.post.isPrivate.eq(1)
                        )));
    }




    private OrderSpecifier<?> findCriteria(String criteria){ //정렬 조건
        if(criteria.contains("date")){
            return tagOfPost.post.createdDate.desc();
        } else if(criteria.contains("like")){
            return tagOfPost.post.postLikeList.postLikeList.size().desc();
        } else if(criteria.contains("view")){
            return tagOfPost.post.views.desc();
        } else if(criteria == null){
            return tagOfPost.post.createdDate.desc();
        }
        return tagOfPost.post.createdDate.desc();
    }



//    private BooleanExpression isPrivate(Long userId){ //or사용 / 공개이거나(2) / 이웃만 공개(1, 글쓴이가 팔로우한 사람만)
//        return  post.isPrivate.eq(2).or(
//                post.user.userId.in(JPAExpressions
//                        .select(follow.fromUser.userId).from(follow)
//                        .where(follow.toUser.userId.eq(userId).or(post.user.userId.eq(userId)),
//                                post.isPrivate.eq(1)
//                        )));
//    }
//
//    private OrderSpecifier<?> findCriteria(String criteria){ //정렬 조건
//        if(criteria.contains("date")){
//            return post.createdDate.desc();
//        } else if(criteria.contains("like")){
//            return post.postLikeList.postLikeList.size().desc();
//        } else if(criteria.contains("view")){
//            return post.views.desc();
//        } else if(criteria == null){
//            return post.createdDate.desc();
//        }
//        return post.createdDate.desc();
//    }
}
