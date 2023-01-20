package com.youtil.server.server.domain.review;

import com.youtil.server.domain.BaseEntity;
import com.youtil.server.domain.goal.Goal;

import javax.persistence.*;

@Entity
public class Review extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long reviewId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Goal goal;

    private String title;
    private String Content;

    private Long isPrivate;

}
