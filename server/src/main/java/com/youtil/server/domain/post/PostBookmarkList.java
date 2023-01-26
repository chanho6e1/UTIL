package com.youtil.server.domain.post;

import com.youtil.server.common.exception.ResourceNotFoundException;
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
public class PostBookmarkList {

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true) //orphanRemoval 없으면 삭제가 안됨.
    private final List<PostBookmark> postBookmarkList = new ArrayList<>();

    public int size(){
        return postBookmarkList.size();
    }

    public boolean togglePostBookmark(PostBookmark postBookmark){
        if(contains(postBookmark.getUser().getUserId())){
            removePostLike(postBookmark);
            return false;//해제
        }
        postBookmarkList.add(postBookmark);
        return true;//설정
    }

    public boolean contains(Long userId){
        return postBookmarkList.parallelStream()
                .anyMatch(l -> l.ownedBy(userId));
    }

    private void removePostLike(PostBookmark postBookmark) {
        Long userId = postBookmark.getUser().getUserId();
        PostBookmark removalTarget = postBookmarkList.parallelStream()
                .filter(l -> l.ownedBy(userId))
                .findAny()
                .orElseThrow(()-> new ResourceNotFoundException("이미 북마크를 해제했습니다"));
        postBookmarkList.remove(removalTarget);
    }
}
