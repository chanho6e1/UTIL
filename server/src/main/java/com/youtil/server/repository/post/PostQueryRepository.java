package com.youtil.server.repository.post;

import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostLike;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.post.PostSearch;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Date;

import static com.querydsl.core.types.dsl.Wildcard.count;
import static com.youtil.server.domain.post.QPost.post;
import static com.youtil.server.domain.post.QPostBookmark.postBookmark;
import static com.youtil.server.domain.post.QPostLike.postLike;
import static com.youtil.server.domain.user.QFollow.follow;
import static com.youtil.server.domain.user.QUser.user;
import static java.time.LocalTime.now;


@RequiredArgsConstructor
@Repository
public class PostQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Page<Post> findPostListByUser(Long userId, String criteria, Pageable pageRequest){ //내가 쓴 글
        QueryResults<Post> content = jpaQueryFactory.select(post)
                .distinct().from(post)
                .innerJoin(post.user).fetchJoin()
                .where(post.user.userId.eq(userId))
                .orderBy(findCriteria(criteria))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetchResults();

        return new PageImpl<>(content.getResults(), pageRequest, content.getTotal());
    }

    public Page<Post> findPostListBySpecUser(Long userId, String criteria, PageRequest pageRequest, User user) { //유저별 글
        QueryResults<Post> content = jpaQueryFactory.select(post)
                .distinct().from(post)
                .innerJoin(post.user).fetchJoin()
                .where(post.user.userId.eq(userId)
                        ,isPrivate(user.getUserId())
                )
                .orderBy(findCriteria(criteria))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetchResults();

        return new PageImpl<>(content.getResults(), pageRequest, content.getTotal());

    }

    public Page<Post> findPostList(Long userId, String criteria, PageRequest pageRequest){ //정렬

        QueryResults<Post> content = jpaQueryFactory.select(post)
                .distinct().from(post)
                .innerJoin(post.user).fetchJoin()
                .join(postLike).on(postLike.post.eq(post))
                .where(
                        isPrivate(userId)
                )
                .orderBy(findCriteria(criteria))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetchResults();

        return new PageImpl<>(content.getResults(), pageRequest, content.getTotal());

    }

    public Page<Post> findByTitleContaining(Long userId, PostSearch postSearch, PageRequest pageRequest){ //제목으로 검색, 정렬도 지정

        String criteria = postSearch.getCriteria();

        QueryResults<Post> content = jpaQueryFactory.select(post)
                .distinct().from(post)
                .innerJoin(post.user).fetchJoin()
                .where(post.title.toLowerCase().contains(postSearch.getTitle()),
                        isPrivate(userId)
                )
                .orderBy(findCriteria(criteria))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetchResults();

        return new PageImpl<>(content.getResults(), pageRequest, content.getTotal());

    }

    public Page<Post> findByNickNameContaining(Long userId, PostSearch postSearch, PageRequest pageRequest){ //제목으로 검색, 정렬도 지정

        String criteria = postSearch.getCriteria();

        QueryResults<Post> content = jpaQueryFactory.select(post)
                .distinct().from(post)
                .innerJoin(post.user).fetchJoin()
                .where(post.user.nickName.toLowerCase().contains(postSearch.getTitle()),
                        isPrivate(userId),
                        post.user.userId.ne(userId)
                )
                .orderBy(findCriteria(criteria))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetchResults();

        return new PageImpl<>(content.getResults(), pageRequest, content.getTotal());

    }

    public Page<Post> findByPostSubscribes(PostSearch postSearch, User user, PageRequest pageRequest) {

        String criteria = postSearch.getCriteria();
//        String period = postSearch.getPeriod();

        QueryResults<Post> content =  jpaQueryFactory.select(post)
                .distinct().from(post)
                .innerJoin(post.user).fetchJoin()
//                .innerJoin(postLike).fetchJoin()
                .where(
                        post.user.in(
                                JPAExpressions
                                .select(follow.toUser).from(follow)
                                .where(follow.fromUser.userId.eq(user.getUserId())
                                )),
                        isPrivate(user.getUserId())
                )
                .orderBy(findCriteria(criteria))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetchResults();

        return new PageImpl<>(content.getResults(), pageRequest, content.getTotal());
    }

    public Page<Post> findByLikePostList(String criteria, User user, PageRequest pageRequest) {

        QueryResults<Post> content =  jpaQueryFactory.select(post)
                .distinct().from(post)
                .innerJoin(post.user).fetchJoin()
                .where(
                        post.in(
                                JPAExpressions
                                        .select(postLike.post)
                                        .from(postLike)
                                        .where(postLike.user.eq(user))
                        )
                )
                .orderBy(findCriteria(criteria))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetchResults();

        return new PageImpl<>(content.getResults(), pageRequest, content.getTotal());

    }


    public Page<Post> findByBookmarkPostList(String criteria, User user, PageRequest pageRequest) {


        QueryResults<Post> content = jpaQueryFactory.select(post)
                .distinct().from(post)
                .innerJoin(post.user).fetchJoin()
                .where(
                        post.in(
                                JPAExpressions
                                        .select(postBookmark.post)
                                        .from(postBookmark)
                                        .where(postBookmark.user.eq(user))
                        )
                )
                .orderBy(findCriteria(criteria))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetchResults();

        return new PageImpl<>(content.getResults(), pageRequest, content.getTotal());

    }


    public Page<PostLike> PostLikesPeople(Long postId, PageRequest pageRequest) {//해당글 좋아요한 사람들
        QueryResults<PostLike> content = jpaQueryFactory.select(postLike).from(postLike).distinct()
                .innerJoin(postLike.post).fetchJoin()
                .where(postLike.post.postId.eq(postId))
                .orderBy(postLike.createdDate.desc())
                .offset(pageRequest.getOffset()).limit(pageRequest.getPageSize())
                .fetchResults();

        return new PageImpl<>(content.getResults(), pageRequest, content.getTotal());

    }

    private BooleanExpression isPrivate1(Long userId){ //공개이거나(2) / 이웃만 공개(1, 글쓴이가 팔로우한 사람만)
        return
                post.user.userId.in(JPAExpressions
                        .select(follow.fromUser.userId).from(follow)
                        .where(follow.toUser.userId.in(
                                JPAExpressions.select(post.user.userId).from(post)
                                        .where(post.isPrivate.eq(1),
                                                follow.toUser.userId.eq(userId)
                                        ))
                        ));
    }
    private BooleanExpression isPrivate(Long userId){ //or사용 / 공개이거나(2) / 이웃만 공개(1, 글쓴이가 팔로우한 사람만)
        return  post.isPrivate.eq(2).or(
                post.user.userId.in(JPAExpressions
                        .select(follow.fromUser.userId).from(follow)
                        .where(follow.toUser.userId.eq(userId).or(post.user.userId.eq(userId)),
                                post.isPrivate.eq(1)
                        )));
    }

    private OrderSpecifier<?> findCriteria(String criteria) { //정렬 조건
        if (criteria.contains("date")) {
            return post.createdDate.desc();
        } else if (criteria.contains("like")) {
            return post.likeScore.desc();
        } else if (criteria.contains("view")) {
            return post.viewScore.desc();
        } else if (criteria == null) {
            return post.createdDate.desc();
        }
//        }else if(criteria.contains("like") && period.contains("6month")){
//            return
//        }else if(criteria.contains("like") && period.contains("1week")){
//
//        }
            return post.createdDate.desc();
        }

    }




