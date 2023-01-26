package com.youtil.server.service.post;

import com.youtil.server.common.exception.ResourceForbiddenException;
import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.domain.category.Category;
import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostBookmark;
import com.youtil.server.domain.post.PostFile;
import com.youtil.server.domain.post.PostLike;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.post.*;
import com.youtil.server.repository.category.PostCategoryRepository;
import com.youtil.server.repository.goal.GoalRepository;
import com.youtil.server.repository.post.*;
import com.youtil.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {

    @Autowired
    private final PostRepository postRepository;
    @Autowired
    private final PostQueryRepository postQueryRepository;

    @Autowired
    private final PostFileRepository postFileRepository;
    @Autowired
    private final PostFileHandler fileHandler;
    @Autowired
    private final PostLikeRepository postLikeRepository;
    @Autowired
    private final PostCommentRepository postCommentRepository;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final PostCategoryRepository postCategoryRepository;
    @Autowired
    private final PostBookmarkRepository postBookmarkRepository;

    @Autowired
    private final GoalRepository goalRepository;

    @Transactional
    public PostResponse findPost(Long postId, Long userId) { //단일 조회
        Post post = postRepository.findPost(postId).orElseThrow(() -> new ResourceNotFoundException("Post", "postId", postId));

        post.addView();
        Boolean likeStatus = false;
        if(postLikeRepository.existsByPostIdAndUserId(postId, userId).isPresent()){
            likeStatus = true;
        }
        Boolean bookmarkStatus = false;
        if(postBookmarkRepository.existsByPostIdAndUserId(postId, userId).isPresent()){
            likeStatus = true;
        }
        return new PostResponse(post, likeStatus, bookmarkStatus);
    }


    public List<PostResponse> findPostListByUser(Long userId, int offset, int size) {//내가 쓴 글 조회/오프셋
        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        return postQueryRepository.findPostListByUser(userId, PageRequest.of(offset - 1, size))
                .stream().map((post)-> new PostResponse(post, user)).collect(Collectors.toList());
    }


    public List<PostResponse> findPostList(Long userId, String criteria, int offset, int size) {//전체 리스트 조회,정렬기준(선택/디폴트는 최근 날짜) ,오프셋
        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        return postQueryRepository.findPostList(criteria, PageRequest.of(offset - 1, size))
                .stream().map((post)-> new PostResponse(post, user)).collect(Collectors.toList());
    }

    public List<PostResponse> findByPostContent(Long userId, PostSearch search, int offset, int size) {//내용으로 검색/오프셋
        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        return postQueryRepository.findByContentContaining(search, PageRequest.of(offset - 1, size))
                .stream().map((post)-> new PostResponse(post, user)).collect(Collectors.toList());
    }


    public List<PostLikePeopleResponse> PostLikesPeople(Long postId, int offset, int size) {//해당 게시물의 좋아요한 사람 리스트
        return postQueryRepository.PostLikesPeople(postId, PageRequest.of(offset - 1, size))
                .stream().map(PostLikePeopleResponse::new).collect(Collectors.toList());
    }


    public List<PostResponse> findByPostSubscribes(PostSearch search, Long userId, int offset, int size) {//내가 구독한 사람의 글 리스트 조회/오프셋

        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        return postQueryRepository.findByPostSubscribes(search, user, PageRequest.of(offset - 1, size))
                .stream().map((post)-> new PostResponse(post, user)).collect(Collectors.toList());
    }


    /////////////////////////

    @Transactional
    public Long createPost(Long userId, PostSaveRequest request) {

        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        Post post = postRepository.save(request.of(user));

        if(request.getCategoryId() != null){
            Category category = postCategoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category", "catogoryId", request.getCategoryId()));
            post.setCategory(category);
        }
        if(request.getGoalId()!=null){
            Goal goal = goalRepository.findGoalById(request.getGoalId())
                    .orElseThrow(()-> new ResourceNotFoundException("goal" , "goalId", request.getGoalId()));
            post.setGoal(goal);
        }

        return post.getPostId();
    }

    @Transactional
    public Long deletePost(Long userId, Long postId) {
        Post post = postRepository.findPost(postId).orElseThrow(() -> new ResourceNotFoundException("Post", "postId", postId));
        validPostUser(userId, post.getUser().getUserId());
        post.clearUser();
        post.getPostCommentList().getPostCommentList().clear();
//        postCommentRepository.deleteByPostId(postId);
        postRepository.deleteById(postId);
        return postId;
    }

    @Transactional
    public Long updatePost(Long userId, Long postId, PostUpdateRequest request) {
        Post post = postRepository.findPost(postId).orElseThrow(() -> new ResourceNotFoundException("post", "postId", postId));

        validPostUser(userId, post.getUser().getUserId());
        post.update(request);

        if(request.getCategoryId() != null){
            Category category = postCategoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category", "catogoryId", request.getCategoryId()));
            post.setCategory(category);
        }
        else{ //이 과정 필요할까..?
            post.resetCategory();
        }

        if(request.getGoalId()!=null){
            Goal goal = goalRepository.findGoalById(request.getGoalId())
                    .orElseThrow(()-> new ResourceNotFoundException("goal" , "goalId", request.getGoalId()));
            post.setGoal(goal);
        } else{
            post.resetGoal();
        }

        return post.getPostId();
    }

    @Transactional
    public Boolean togglePostLikes(Long userId, Long postId) {
        Post post = postRepository.findPost(postId).orElseThrow(() -> new ResourceNotFoundException("post", "postId", postId));
        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("user", "userId", userId));
        PostLike postLike = PostLike.builder().post(post).user(user).build();
        return post.togglePostLike(postLike);
    }

    public void validPostUser(Long currentUser, Long postUser) {

        if (currentUser == postUser || currentUser.equals(postUser)) {
            return;
        }
        else {
            throw new ResourceForbiddenException("본인이 작성한 글이 아닙니다");
        }
    }

    @Transactional
    public List<String> uploadPostFile(List<MultipartFile> files) throws Exception {
        if (files != null && !files.isEmpty()) {
            return savePostFIle(files);
        }
        return null;
    }

    private List<String> savePostFIle(List<MultipartFile> files) throws Exception {

        List<PostFile> fileList = fileHandler.parseFileInfo(files);
        List<String> fileUrlList = new ArrayList<>();

        if (!fileList.isEmpty()) {
            for (int i = 0; i < fileList.size(); i++) {
                PostFile postFile = fileList.get(i);
                postFileRepository.save(postFile);
                fileUrlList.add(fileList.get(i).getSavedFileName());
            }
        }
        return fileUrlList;
    }
<<<<<<< HEAD

    @Transactional
    public Long updatePost(Long userId, Long postId, PostUpdateRequest request) {
        Post post = postRepository.findPost(postId).orElseThrow(() -> new ResourceNotFoundException("post", "postId", postId));

        validPostUser(userId, post.getUser().getUserId());
        post.update(request);

        if(request.getCategoryId() != null){
            Category category = postCategoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category", "catogoryId", request.getCategoryId()));
            post.setCategory(category);
            System.out.println(category.getCategoryId());
        }
        else{
            post.resetCategory();
        }
        return post.getPostId();
    }

    @Transactional
    public Boolean togglePostLikes(Long userId, Long postId) {
        Post post = postRepository.findPost(postId).orElseThrow(() -> new ResourceNotFoundException("post", "postId", postId));
        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("user", "userId", userId));
        PostLike postLike = PostLike.builder().post(post).user(user).build();
        return post.togglePostLike(postLike);
    }

    @Transactional
    public Boolean togglePostBookmarks(Long userId, Long postId) {
        Post post = postRepository.findPost(postId).orElseThrow(() -> new ResourceNotFoundException("post", "postId", postId));
        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("user", "userId", userId));
        PostBookmark postBookmark = PostBookmark.builder().post(post).user(user).build();
        return post.togglePostBookmark(postBookmark);
    }


=======
>>>>>>> 6ad7b38f081986001329a64b8b231129ad7b9ab0
}


