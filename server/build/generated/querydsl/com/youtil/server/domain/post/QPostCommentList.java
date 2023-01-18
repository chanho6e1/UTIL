package com.youtil.server.domain.post;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPostCommentList is a Querydsl query type for PostCommentList
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QPostCommentList extends BeanPath<PostCommentList> {

    private static final long serialVersionUID = 1086649751L;

    public static final QPostCommentList postCommentList = new QPostCommentList("postCommentList");

    public final ListPath<PostComment, QPostComment> boardComments = this.<PostComment, QPostComment>createList("boardComments", PostComment.class, QPostComment.class, PathInits.DIRECT2);

    public QPostCommentList(String variable) {
        super(PostCommentList.class, forVariable(variable));
    }

    public QPostCommentList(Path<? extends PostCommentList> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPostCommentList(PathMetadata metadata) {
        super(PostCommentList.class, metadata);
    }

}

