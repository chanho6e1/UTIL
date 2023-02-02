package com.youtil.server.domain.post;

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
public class PostFileList {


    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true) //orphanRemoval 없으면 삭제가 안됨.
    private final List<PostFile> postFileList = new ArrayList<>();

    public int size(){
        return postFileList.size();
    }
}
