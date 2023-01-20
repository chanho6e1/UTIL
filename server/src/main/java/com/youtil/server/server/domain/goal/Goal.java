package com.youtil.server.server.domain.goal;

import com.youtil.server.domain.BaseEntity;
import com.youtil.server.domain.category.PostList;
import com.youtil.server.domain.goal.GoalOfPostList;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostLike;
import com.youtil.server.domain.user.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Goal extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "goal_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Embedded
    private final GoalOfPostList goalOfPostList = new GoalOfPostList();


//    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true) //orphanRemoval 없으면 삭제가 안됨.
//    private final List<Post> postList = new ArrayList<>();

    private String title;

    private String startDate;
    private String endDate;



}
