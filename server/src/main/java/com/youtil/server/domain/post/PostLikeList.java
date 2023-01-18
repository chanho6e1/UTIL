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
public class PostLikeList {

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true) //orphanRemoval 없으면 삭제가 안됨.
    private final List<PostComment> boardLikes = new ArrayList<>();

    public int size(){
        return boardLikes.size();
    }

//    public boolean toggleBoardLike(BoardLike boardLike){
//        if(contains(boardLike.getUserId())){
//            removeBoardLike(boardLike);
//            return false;
//        }
//        boardLikes.add(boardLike);
//        return true;
//    }
//
//    public boolean contains(Long userId){
//        return boardLikes.parallelStream()
//                .anyMatch(l -> l.ownedBy(userId));
//    }
//
//    private void removeBoardLike(BoardLike boardLike) {
//        Long userId = boardLike.getUserId();
//        BoardLike removalTarget = boardLikes.parallelStream()
//                .filter(l -> l.ownedBy(userId))
//                .findAny()
//                .orElseThrow(BoardLikeRemovalFailure::new);
//        boardLikes.remove(removalTarget);
//    }
}
