package com.youtil.server.repository.post;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youtil.server.domain.post.Post;
import com.youtil.server.dto.post.PostSearch;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

import static com.youtil.server.domain.post.QPost.post;


@RequiredArgsConstructor
@Repository
public class PostQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;
    public List<Post> findPostList(PageRequest pageRequest){
        return jpaQueryFactory.select(post)
                .distinct().from(post)
                .innerJoin(post.user).fetchJoin()
//                .where(post.postType.eq(postType))
                .orderBy(post.createdDate.desc())
                .offset(pageRequest.getOffset()).limit(pageRequest.getPageSize())
                .fetch();
    }

    public List<Post> findPostListRank(String criteria, PageRequest pageRequest){ //정렬
        return jpaQueryFactory.select(post)
                .distinct().from(post)
                .innerJoin(post.user).fetchJoin()
                .orderBy(findCriteria(criteria))
                .offset(pageRequest.getOffset()).limit(pageRequest.getPageSize())
                .fetch();
    }

    public List<Post> findByContentContaining(String content, PageRequest pageRequest){ //내용으로 검색, 디폴트: 최근날짜순
        return jpaQueryFactory.selectFrom(post)
                .innerJoin(post.user).fetchJoin()
                .where(post.content.contains(content))
                .orderBy(findCriteria("date"))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetch();
    }

    public List<Post> findByContentContainingRank(PostSearch postSearch, PageRequest pageRequest){ //내용으로 검색, 정렬도 지정
        return jpaQueryFactory.selectFrom(post)
                .innerJoin(post.user).fetchJoin()
                .where(post.content.contains(postSearch.getContent()))
                .orderBy(findCriteria(postSearch.getCriteria()))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetch();
    }
//
////    public List<Post> findByUserComment(Long userId){
////
////        return jpaQueryFactory
////                .select(postComment.post)
////                .distinct()
////                .from(postComment)
////                .innerJoin(postComment.user)
////                .where(postComment.user.id.eq(userId))
////                .orderBy(postComment.createdDate.desc()).fetch();
////    }
//
////    public List<Post> findUserPost(Long userId, PageRequest pageRequest){
////        return jpaQueryFactory.selectFrom(post).distinct()
////                .innerJoin(post.user).fetchJoin()
////                .where(post.user.id.eq(userId))
////                .orderBy(post.createdDate.desc())
////                .offset(pageRequest.getOffset()).limit(pageRequest.getPageSize())
////                .fetch();
////    }
//
//    public List<Post> findByLotsOfView(int postType, PageRequest pageRequest){
//        return jpaQueryFactory.selectFrom(post).distinct()
////                .innerJoin(post.user).fetchJoin()
//                .where(post.postType.eq(postType))
//                .orderBy(post.views.desc())
//                .offset(pageRequest.getOffset()).limit(pageRequest.getPageSize())
//                .fetch();
//    }
//
////    public List<Post> findByLotsOfLike(int postType, PageRequest pageRequest){
////        return jpaQueryFactory.selectFrom(post).distinct()
//////                .innerJoin(post.user).fetchJoin()
////                .where(post.postType.eq(postType))
////                .orderBy(post.postLikes.postLikes.size().desc())
////                .offset(pageRequest.getOffset())
////                .limit(pageRequest.getPageSize())
////                .fetch();
////    }
//
//    public List<Post> findByTitleContaining(int postType, String name, PageRequest pageRequest){
//        return jpaQueryFactory.selectFrom(post).distinct()
////                .innerJoin(post.user).fetchJoin()
//                .where(post.postType.eq(postType), post.title.contains(name))
//                .orderBy(post.createdDate.desc())
//                .offset(pageRequest.getOffset()).limit(pageRequest.getPageSize())
//                .fetch();
//    }
//
//    public List<Post> searchPost(PageRequest pageRequest, PostSearch postSearch){
//        return jpaQueryFactory.selectFrom(post)
////                .innerJoin(post.user).fetchJoin()
//                .where(post.title.contains(postSearch.getTitle()),
//                        post.postType.eq(postSearch.getPostType()))
//                .orderBy(findCriteria(postSearch.getCriteria()))
//                .offset(pageRequest.getOffset())
//                .limit(pageRequest.getPageSize())
//                .fetch();
//    }
//
    private OrderSpecifier<?> findCriteria(String criteria){ //정렬 조건
        if(criteria.equals("date")){
            return post.createdDate.desc();
        } else if(criteria.equals("like")){
//            return post.postLikes.postLikes.size().desc();
        } else if(criteria.equals("view")){
            return post.views.desc();
        }

        return post.createdDate.desc();
    }


}



