package com.youtil.server.repository.post;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostLike;
import com.youtil.server.domain.user.Follow;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.post.PostSearch;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

import static com.youtil.server.domain.post.QPost.post;
import static com.youtil.server.domain.post.QPostLike.postLike;
import static com.youtil.server.domain.user.QFollow.follow;


@RequiredArgsConstructor
@Repository
public class PostQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public List<Post> findPostListByUser(Long userId, PageRequest pageRequest){
        return jpaQueryFactory.select(post)
                .distinct().from(post)
                .innerJoin(post.user).fetchJoin()
                .where(post.user.userId.eq(userId))
                .orderBy(findCriteria("date"))
                .offset(pageRequest.getOffset()).limit(pageRequest.getPageSize())
                .fetch();
    }

    public List<Post> findPostList(String criteria, PageRequest pageRequest){ //정렬
        if(criteria == null){
            criteria = "date";
        }
        return jpaQueryFactory.select(post)
                .distinct().from(post)
                .innerJoin(post.user).fetchJoin()
                .orderBy(findCriteria(criteria))
                .offset(pageRequest.getOffset()).limit(pageRequest.getPageSize())
                .fetch();
    }

    public List<Post> findByContentContaining(PostSearch postSearch, PageRequest pageRequest){ //내용으로 검색, 정렬도 지정

        String criteria = postSearch.getCriteria();
        if(criteria == null){
            criteria = "date";
        }
        return jpaQueryFactory.selectFrom(post)
                .innerJoin(post.user).fetchJoin()
                .where(post.content.contains(postSearch.getContent()))
                .orderBy(findCriteria(criteria))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetch();
    }

    public List<Post> findByPostSubscribes(PostSearch postSearch, User user, PageRequest pageRequest) {

        String criteria = postSearch.getCriteria();
        if(criteria == null){
            criteria = "date";
        }
        List<User> postSubscribe =  jpaQueryFactory.select(follow.toUser).from(follow)
                .where(follow.fromUser.userId.eq(user.getUserId()))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetch();

        return jpaQueryFactory.selectFrom(post)
                .innerJoin(post.user).fetchJoin()
                .where(post.user.in(postSubscribe))
                .orderBy(findCriteria(criteria))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetch();
    }

    public List<PostLike> PostLikesPeople(Long postId, PageRequest pageRequest) {
        return jpaQueryFactory.select(postLike).from(postLike).distinct()
//                .innerJoin(postLike.post).fetchJoin()
                .where(postLike.post.postId.eq(postId))
                .orderBy(postLike.createdDate.desc())
                .offset(pageRequest.getOffset()).limit(pageRequest.getPageSize())
                .fetch();
    }

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



