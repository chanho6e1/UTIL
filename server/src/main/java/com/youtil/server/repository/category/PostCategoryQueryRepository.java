package com.youtil.server.repository.category;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.domain.category.Category;
import com.youtil.server.domain.post.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.youtil.server.domain.category.QCategory.category;
import static com.youtil.server.domain.post.QPost.post;
import static com.youtil.server.domain.user.QFollow.follow;

@RequiredArgsConstructor
@Repository
public class PostCategoryQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Autowired
    PostCategoryRepository postCategoryRepository;

    public List<Post> getCategoryPosts(Long userId, Long categoryId, String criteria, PageRequest request){

        return jpaQueryFactory.select(post).distinct()
                .from(post)
                .innerJoin(post.category).fetchJoin()
                .where(post.category.categoryId.eq(categoryId),
                        isPrivate(userId))
                .orderBy(findCriteria(criteria))
                .offset(request.getOffset())
                .limit(request.getPageSize())
                .fetch();
    }

    private BooleanExpression isPrivate(Long userId){ //or사용 / 공개이거나(2) / 이웃만 공개(1, 글쓴이가 팔로우한 사람만)
        return
                post.isPrivate.eq(0).and(post.user.userId.eq(userId)).or(
                post.isPrivate.eq(2).or(
                post.user.userId.in(JPAExpressions
                        .select(follow.fromUser.userId).from(follow)
                        .where(follow.toUser.userId.eq(userId).or(post.user.userId.eq(userId)),
                                post.isPrivate.eq(1)
                        ))));
    }

    private OrderSpecifier<?> findCriteria(String criteria) { //정렬 조건
        if (criteria.contains("date")) {
            return post.createdDate.desc();
        } else if (criteria.contains("like")) {
            return post.likeScore.desc();
        } else if (criteria.contains("view")) {
            return post.viewScore.desc();
        }

        return post.createdDate.desc();
    }
}
