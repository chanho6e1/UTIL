package com.youtil.server.domain.goal;

import com.youtil.server.domain.BaseEntity;
import com.youtil.server.domain.category.PostList;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostLike;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.goal.GoalUpdateRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Goal extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "goal_id")
    private Long goalId;

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
    private boolean state;

    // 완수
    // 투두 퍼센트

    @Builder
    public Goal(User user, String title, String startDate, String endDate){
        this.user = user;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public void update(GoalUpdateRequest request){
        this.title = request.getTitle();
        this.startDate = request.getStartDate();
        this.endDate = request.getEndDate();
    }


}
