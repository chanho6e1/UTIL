package com.youtil.server.server.domain.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import com.sun.istack.Nullable;
import com.youtil.server.domain.BaseEntity;
import com.youtil.server.oauth.entity.ProviderType;
import com.youtil.server.oauth.entity.RoleType;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "USER")
public class User extends BaseEntity {

    @Id
    @Column(name = "USER_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "NICK_NAME")
    @Size(max = 100)
    private String nickName;

    @Column(name = "DEPARTMENT")
    @Size(max = 100)
    private String department;

    @Column(name = "USER_NAME", length = 100)
    @NotNull
    @Size(max = 100)
    private String userName;

    @Column(name = "EMAIL", length = 512, unique = true)
    @Nullable
    @Size(max = 512)
    private String email;

    @JsonIgnore
    @Column(name = "PASSWORD", length = 128)
    @NotNull
    @Size(max = 128)
    private String password;

    @Column(name = "PROFILE_IMAGE_URL", length = 512)
    @NotNull
    @Size(max = 512)
    private String profileImageUrl;

    @Column(name = "PROVIDER_TYPE", length = 20)
    @Enumerated(EnumType.STRING)
    @NotNull
    private ProviderType providerType;

    @Column(name = "ROLE_TYPE", length = 20)
    @Enumerated(EnumType.STRING)
    @NotNull
    private RoleType roleType;

    @Builder
    public User(String userName, String email, String profileImageUrl, RoleType roleType, ProviderType providerType){
        this.userName = userName;
        this.email = email;
        this.password = "NO_PASS";
        this.profileImageUrl = profileImageUrl != null ? profileImageUrl : "";
        this.providerType = providerType;
        this.roleType = roleType;
    }

    public User update(String nickName, String profileImageUrl){
        this.nickName = nickName;
        this.profileImageUrl = profileImageUrl;

        return this;
    }

    public String getRoleType(){
        return this.roleType.getCode();
    }



//    public User(
//            @NotNull @Size(max = 64) String userId,
//            @NotNull @Size(max = 100) String username,
//            @NotNull @Size(max = 512) String email,
//            @NotNull @Size(max = 1) String emailVerifiedYn,
//            @NotNull @Size(max = 512) String profileImageUrl,
//            @NotNull ProviderType providerType,
//            @NotNull RoleType roleType,
//            @NotNull LocalDateTime createdAt,
//            @NotNull LocalDateTime modifiedAt
//    ) {
//        this.userId = userId;
//        this.username = username;
//        this.password = "NO_PASS";
//        this.email = email != null ? email : "NO_EMAIL";
//        this.emailVerifiedYn = emailVerifiedYn;
//        this.profileImageUrl = profileImageUrl != null ? profileImageUrl : "";
//        this.providerType = providerType;
//        this.roleType = roleType;
//        this.createdAt = createdAt;
//        this.modifiedAt = modifiedAt;
//    }
}

