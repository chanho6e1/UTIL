package com.youtil.server.repository.category;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.domain.category.Category;
import com.youtil.server.domain.post.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.youtil.server.domain.category.QCategory.category;
import static com.youtil.server.domain.post.QPost.post;

@RequiredArgsConstructor
@Repository
public class PostCategoryQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Autowired
    PostCategoryRepository postCategoryRepository;

    public List<Post> getCategoryPosts(Long categoryId, String criteria){

        return jpaQueryFactory.select(post)
                .from(post)
                .innerJoin(post.category).fetchJoin()
                .where(post.category.categoryId.eq(categoryId))
                .orderBy(findCriteria(criteria))
                .fetch();
    }

    private OrderSpecifier<?> findCriteria(String criteria) { //정렬 조건
        if (criteria.contains("date")) {
            return post.createdDate.desc();
        } else if (criteria.contains("like")) {
            return post.postLikeList.postLikeList.size().desc();
        } else if (criteria.contains("view")) {
            return post.views.desc();
        }

        return post.createdDate.desc();
    }
}
