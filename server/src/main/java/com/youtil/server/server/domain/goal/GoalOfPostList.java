package com.youtil.server.server.domain.goal;

import com.youtil.server.domain.post.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Embeddable
public class GoalOfPostList {

    @OneToMany(mappedBy = "goal", cascade = CascadeType.ALL, orphanRemoval = true) //orphanRemoval 없으면 삭제가 안됨.
    private final List<Post> postList = new ArrayList<>();

}
