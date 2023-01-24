package com.youtil.server.repository.post;

import com.querydsl.core.QueryResults;
import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringExpressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youtil.server.common.PagedResponse;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostLike;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.post.PostResponse;
import com.youtil.server.dto.post.PostSearch;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.JpaSort;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import static com.youtil.server.domain.post.QPost.post;
import static com.youtil.server.domain.post.QPostLike.postLike;
import static com.youtil.server.domain.user.QFollow.follow;

@RequiredArgsConstructor
@Repository
public class PostQueryRepository1 {

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

    public Slice<PostResponse> findPostList(String criteria, Sort.Direction sort, String cop, Long cursor, Integer size, String cursorEndDate) {

        Pageable pageable = null;
        if(criteria == null){
            pageable = findCriteria(size, "date");
        }else {
            pageable = findCriteria(size, criteria);
        }

        String customCursor = generateCustomCursor(cursorEndDate, cursor);

        List<Post> posts = jpaQueryFactory
                .selectFrom(post)
                .offset(pageable.getOffset())
                .where(
                        customCursor(customCursor)
                )
                .limit(pageable.getPageSize())
                .fetch();

        List<PostResponse> postResponses = posts.stream().map(PostResponse::new).collect(Collectors.toList());

//        return new PagedResponse<PostResponse>(postResponses, 0, posts.getSize(),
//                0, posts.isLast(), posts.hasNext(), posts.hasPrevious());

        boolean hasNext = false;
        if (postResponses.size() > pageable.getPageSize()) {
            postResponses.remove(pageable.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(postResponses, pageable, hasNext);

    }

    private Pageable findCriteria(Integer size, String criteria){ //정렬 조건

        if(criteria.contains("date")){
            return PageRequest.of(0, size, Sort.by(Sort.Direction.DESC, "createdDate"));
        } else if(criteria.contains("like")){
            return PageRequest.of(0, size, JpaSort.unsafe(Sort.Direction.DESC,"count(l.post.postId)"));
        } else if(criteria.contains("view")){
            return PageRequest.of(0, size, Sort.by(Sort.Direction.DESC, "views"));
        }
        return PageRequest.of(0, size, Sort.by(Sort.Direction.DESC, "createdDate"));
    }

    private BooleanExpression customCursor(String customCursor){

        if (customCursor == null) { // 1
            return null;
        }

        StringTemplate stringTemplate = Expressions.stringTemplate( // 2
                "DATE_FORMAT({0}, {1})",
                post.createdDate,
                ConstantImpl.create("%Y%m%d%H%i%s")
        );

        return StringExpressions.lpad(stringTemplate, 20, '0')
                .concat(StringExpressions.lpad(post.postId.stringValue(), 10, '0')) // 3
                .gt(customCursor); // 4
    }

    private String generateCustomCursor(String cursorEndDate, Long cursorId){
        if (cursorEndDate == null && cursorId == null) { // 1
            return null;
        }

//        cursorEndDate = cursorEndDate.minusHours(9); // 2

        String customCursorEndDate;
        String customCursorId;

//        customCursorEndDate = cursorEndDate.toString()
//                .replaceAll("T", "")
//                .replaceAll("-", "") // 3
//                .replaceAll(":", "") + "00"; // 4


//        customCursorEndDate = String.format("%1$" + 20 + "s", customCursorEndDate)
//                .replace(' ', '0'); // 5


        customCursorEndDate = String.format("%1$" + 20 + "s", cursorEndDate)
                .replace(' ', '0'); // 5

        customCursorId = String.format("%1$" + 10 + "s", cursorId)
                .replace(' ', '0'); // 5

        return customCursorEndDate + customCursorId; // 6
    }



//    public List<Post> findPostList(String criteria, String cop, Long cursor, PageRequest pageRequest){ //정렬
//        if(criteria == null){
//            criteria = "date";
//        }
//        return jpaQueryFactory.select(post)
//                .distinct().from(post)
//                .innerJoin(post.user).fetchJoin()
//                .orderBy(findCriteria(criteria))
//                .where((cop.eq("<"), post.postId < cursor .or(cop = '>' , post.postId > cursor))
//                .fetch();
//    }

//    public List<Post> findPostList(String criteria, PageRequest pageRequest){ //정렬
//        if(criteria == null){
//            criteria = "date";
//        }
//        return jpaQueryFactory.select(post)
//                .distinct().from(post)
//                .innerJoin(post.user).fetchJoin()
//                .orderBy(findCriteria(criteria))
//                .offset(pageRequest.getOffset()).limit(pageRequest.getPageSize())
//                .fetch();
//    }

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
//                .where(post.isPrivate.in(2,1))
                .orderBy(findCriteria(criteria))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetch();

//        return jpaQueryFactory.selectFrom(post)
//                .innerJoin(post.user).fetchJoin()
//                .innerJoin(follow).fetchJoin()
//                .where(follow.fromUser.userId.eq(user.getUserId()))
//                .orderBy(findCriteria(criteria))
//                .offset(pageRequest.getOffset())
//                .limit(pageRequest.getPageSize())
//                .fetch();
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
