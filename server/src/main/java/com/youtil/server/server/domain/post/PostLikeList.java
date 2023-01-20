package com.youtil.server.server.domain.post;

import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.domain.post.PostLike;
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
public class PostLikeList {

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true) //orphanRemoval 없으면 삭제가 안됨.
    private final List<com.youtil.server.domain.post.PostLike> postLikeList = new ArrayList<>();

    public int size(){
        return postLikeList.size();
    }

    public boolean togglePostLike(com.youtil.server.domain.post.PostLike postLike){
        if(contains(postLike.getUser().getUserId())){
            removePostLike(postLike);
            return false;
        }
        postLikeList.add(postLike);
        return true;
    }

    public boolean contains(Long userId){
        return postLikeList.parallelStream()
                .anyMatch(l -> l.ownedBy(userId));
    }

    private void removePostLike(com.youtil.server.domain.post.PostLike postLike) {
        Long userId = postLike.getUser().getUserId();
        PostLike removalTarget = postLikeList.parallelStream()
                .filter(l -> l.ownedBy(userId))
                .findAny()
                .orElseThrow(()-> new ResourceNotFoundException("이미 좋아요를 해제했습니다"));
        postLikeList.remove(removalTarget);
    }
}
