package com.youtil.server.server.domain.user;

import com.youtil.server.domain.user.User;

import javax.persistence.*;

@Entity
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "follow_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_user")
    com.youtil.server.domain.user.User toUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_user")
    User fromUser;
}
