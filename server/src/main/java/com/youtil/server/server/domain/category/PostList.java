package com.youtil.server.server.domain.category;

import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostComment;
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
public class PostList {

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Post> postList = new ArrayList<>();

    public int size() {return postList.size();}
}
