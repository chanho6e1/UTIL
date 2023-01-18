package com.youtil.server.domain.user;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -1359278842L;

    public static final QUser user = new QUser("user");

    public final com.youtil.server.domain.QBaseEntity _super = new com.youtil.server.domain.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final StringPath department = createString("department");

    public final StringPath email = createString("email");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final StringPath nickName = createString("nickName");

    public final StringPath password = createString("password");

    public final StringPath profileImageUrl = createString("profileImageUrl");

    public final EnumPath<com.youtil.server.oauth.entity.ProviderType> providerType = createEnum("providerType", com.youtil.server.oauth.entity.ProviderType.class);

    public final EnumPath<com.youtil.server.oauth.entity.RoleType> roleType = createEnum("roleType", com.youtil.server.oauth.entity.RoleType.class);

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public final StringPath userName = createString("userName");

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

