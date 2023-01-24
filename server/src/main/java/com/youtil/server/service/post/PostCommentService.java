package com.youtil.server.service.post;

import com.youtil.server.common.CursorResult;
import com.youtil.server.common.PagedResponse;
import com.youtil.server.common.exception.ResourceForbiddenException;
import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostComment;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.post.*;
import com.youtil.server.repository.post.PostCommentQueryRepository;
import com.youtil.server.repository.post.PostCommentRepository;
import com.youtil.server.repository.post.PostQueryRepository;
import com.youtil.server.repository.post.PostRepository;
import com.youtil.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostCommentService {

    @Autowired
    PostCommentRepository postCommentRepository;
    @Autowired
    PostCommentQueryRepository postCommentQueryRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    public List<PostCommentResponse> findPostCommentList(Long postId, Sort.Direction sort, String cop, Long cursor, Integer size) {

        Pageable pageable = PageRequest.of(0, size, Sort.by(Sort.Direction.DESC, "createdDate"));
        Slice<PostComment> postComments;

        if(cursor == null){
            postComments = postCommentRepository.findCommentList(postId, pageable);
        }
        else{
            postComments = postCommentRepository.findCommentListByCursor(postId, cursor, cop, pageable);
        }

//        List<PostCommentResponse> postComment = postComments.stream().map(PostCommentResponse::new).collect(Collectors.toList());

        return convertNestedStructure(postCommentRepository.findCommentByPostId(postId));
    }

    private List<PostCommentResponse> convertNestedStructure(List<PostComment> comments) {
        List<PostCommentResponse> result = new ArrayList<>();
        Map<Long, PostCommentResponse> map = new HashMap<>();
        comments.stream().forEach(c -> {
            PostCommentResponse dto = PostCommentResponse.from(c);
            map.put(dto.getCommentId(), dto);
            if(c.getParent() != null) {
//                System.out.println("////////////");
//                System.out.println(c.getParent().getCommentId());
//                System.out.println(c.getParent().getChildren().get(0).getCommentId());
//                System.out.println(map.get(c.getParent().getCommentId()).getCommentId());
//                System.out.println("////////////");

//                map.get(c.getParent().getCommentId()).getChildren().add(dto);
                map.get(c.getParent().getCommentId()).getChildren().add(dto);

            }
            else result.add(dto);
        });
        return result;
    }

    public PagedResponse<PostCommentResponse> findParentCommentList(Long postId, Sort.Direction sort, String cop, Long cursor, Integer size) {

        Pageable pageable = PageRequest.of(0, size);

        Slice<PostComment> postComments =  postCommentRepository.findCommentListByCursor(postId, cursor, cop, pageable);
        List<PostCommentResponse> postComment = postComments.stream().map(PostCommentResponse::new).collect(Collectors.toList());

        return new PagedResponse<PostCommentResponse>(postComment, 0, postComments.getSize(),
                0, postComments.isLast(), postComments.hasNext(), postComments.hasPrevious());
    }

    public PagedResponse<PostCommentResponse> findChildCommentList(Long postId, Sort.Direction sort, String cop, Long cursor, Integer size) {

        Pageable pageable = PageRequest.of(0, size, Sort.by(Sort.Direction.DESC, "createdDate"));

        Slice<PostComment> postComments =  postCommentRepository.findCommentListByCursor(postId, cursor, cop, pageable);
        List<PostCommentResponse> postCommentResponse = postComments.stream().map(PostCommentResponse::new).collect(Collectors.toList());

        return new PagedResponse<PostCommentResponse>(postCommentResponse, 0, postComments.getSize(),
                0, postComments.isLast(), postComments.hasNext(), postComments.hasPrevious());
    }

//    public List<PostCommentResponse> findCommentList(Long postId, int offset) {
//
//        PostComment postComment = postCommentRepository.findComment(request.getNestedTo())
//                .orElseThrow(() -> new ResourceNotFoundException("PostComment", "commentId", request.getNestedTo()));
//
//        User nestedToInfo =  postComment.getUser();
//
//        List<PostCommentResponse> list =  postCommentQueryRepository.findPostList(postId, PageRequest.of(offset - 1, 10))
//                .stream().().map(PostCommentResponse::new).collect(Collectors.toList());
//
//        post.getPostLikeList().getPostLikeList().parallelStream()
//                .anyMatch(l -> l.ownedBy(post.getUser().getUserId()));
//        return list;
//    }



    /////////////////////////
    @Transactional
    public Long createPostComment(Long userId, Long postId, PostCommentSaveRequest request) {

        Post post = postRepository.findPost(postId).orElseThrow(() -> new ResourceNotFoundException("Post", "postId", postId));
        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        PostComment postComment = null;
        if(request.getParentId()!=null){
            PostComment parent = postCommentRepository.findComment(request.getParentId())
                    .orElseThrow(() -> new ResourceNotFoundException("PostComment", "commentId", request.getParentId()));
                postComment =  postCommentRepository.save(request.of(user, post, parent,1));
                parent.setChild(postComment);
        }
        else{
            postComment = postCommentRepository.save(request.of(user, post, 0));
        }
        return postComment.getCommentId();
    }

    @Transactional
    public Long updatePostComment(Long userId, Long commentId, PostCommentUpdateRequest request) {

        PostComment postComment = postCommentRepository.findComment(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("PostComment", "commentId", commentId));
        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        validPosCommentUser(userId, postComment.getUser().getUserId());
        postComment.update(request);
        return postComment.getCommentId();
    }

    @Transactional
    public Long deletePostComment(Long userId, Long commentId) {

        PostComment postComment = postCommentRepository.findComment(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("PostComment", "commentId", commentId));
        validPosCommentUser(userId, postComment.getUser().getUserId());

        if(postComment.getDepth()==0 && !postComment.getChildren().isEmpty()){ //원댓글이 사라지면 숨김 처리
            postComment.updateDeleteStatus();
        }else if(!postComment.getChildren().isEmpty()){
            postComment.getChildren().stream()
                    .forEach(post -> post.resetChild(postComment.getParent()));

            System.out.println(postComment.getParent().getCommentId());
            postCommentRepository.deleteByCommentId(commentId);
        }else{
            postCommentRepository.deleteByCommentId(commentId);
        }

        return commentId;
    }

    public void validPosCommentUser(Long currentUser, Long CommentUser) {

        if (currentUser == CommentUser || currentUser.equals(CommentUser)) {
            return;
        } else {
            throw new ResourceForbiddenException("본인이 작성한 글이 아닙니다");
        }
    }
}
