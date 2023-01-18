package com.youtil.server.domain.post;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPostLikeList is a Querydsl query type for PostLikeList
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QPostLikeList extends BeanPath<PostLikeList> {

    private static final long serialVersionUID = 1533991195L;

    public static final QPostLikeList postLikeList = new QPostLikeList("postLikeList");

    public final ListPath<PostComment, QPostComment> boardLikes = this.<PostComment, QPostComment>createList("boardLikes", PostComment.class, QPostComment.class, PathInits.DIRECT2);

    public QPostLikeList(String variable) {
        super(PostLikeList.class, forVariable(variable));
    }

    public QPostLikeList(Path<? extends PostLikeList> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPostLikeList(PathMetadata metadata) {
        super(PostLikeList.class, metadata);
    }

}

