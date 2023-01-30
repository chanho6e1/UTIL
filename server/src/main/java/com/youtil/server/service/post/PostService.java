package com.youtil.server.service.post;

import com.youtil.server.common.exception.ResourceForbiddenException;
import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.config.s3.S3Uploader;
import com.youtil.server.domain.category.Category;
import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostBookmark;
import com.youtil.server.domain.post.PostLike;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.post.*;
import com.youtil.server.repository.category.PostCategoryRepository;
import com.youtil.server.repository.goal.GoalRepository;
import com.youtil.server.repository.post.*;
import com.youtil.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
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
    @Autowired
    private final S3Uploader s3Uploader;

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


    public List<PostResponse> findPostListByUser(Long userId, int offset, int size, String criteria) {//내가 쓴 글 조회/오프셋
        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        return postQueryRepository.findPostListByUser(userId, criteria, PageRequest.of(offset - 1, size))
                .stream().map((post)-> new PostResponse(post, user)).collect(Collectors.toList());
    }


    public List<PostResponse> findPostListBySpecUser(Long userId, int offset, int size, String criteria) {
        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        return postQueryRepository.findPostListBySpecUser(userId, criteria, PageRequest.of(offset - 1, size))
                .stream().map((post)-> new PostResponse(post, user)).collect(Collectors.toList());

    }


    public List<PostResponse> findPostList(Long userId, String criteria, int offset, int size) {//전체 리스트 조회,정렬기준(선택/디폴트는 최근 날짜) ,오프셋
        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        return postQueryRepository.findPostList(criteria, PageRequest.of(offset - 1, size))
                .stream().map((post)-> new PostResponse(post, user)).collect(Collectors.toList());
    }

    public List<PostResponse> findByPostTitle(Long userId, PostSearch search, int offset, int size) {//내용으로 검색/오프셋
        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        return postQueryRepository.findByTitleContaining(search, PageRequest.of(offset - 1, size))
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

    public List<PostResponse> findByLikePostList(Long userId, String criteria, int offset, int size) {
        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        return postQueryRepository.findByLikePostList(criteria, user, PageRequest.of(offset - 1, size))
                .stream().map((post)-> new PostResponse(post, user)).collect(Collectors.toList());
    }

    public List<PostResponse> findByBookmarkPostList(Long userId, String criteria, int offset, int size) {
        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        return postQueryRepository.findByBookmarkPostList(criteria, user, PageRequest.of(offset - 1, size))
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
            Goal goal = goalRepository.findGoalByGoalId(request.getGoalId())
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
        parseContextAndDeleteImages(post);
        postCommentRepository.deleteByPostId(postId);
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
            Goal goal = goalRepository.findGoalByGoalId(request.getGoalId())
                    .orElseThrow(()-> new ResourceNotFoundException("goal" , "goalId", request.getGoalId()));
            post.setGoal(goal);
        } else{
            post.resetGoal();
        }

        return post.getPostId();
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

    public String getThumbnailCandidate(PostContentRequest request) { //섬네일 후보 제공
        Document doc = Jsoup.parse(request.getContent());
        Elements images = doc.getElementsByTag("img");
        String source = null;
        if (images.size() > 0) {
            for (Element image : images) {
                  source = image.attr("src");
                break;
            }
        }
        return source;
    }

    public void parseContextAndDeleteImages(Post post) { //post 삭제하면 안의 파일도 삭제
        Document doc = Jsoup.parse(post.getContent());
        Elements images = doc.getElementsByTag("img");
        String source = "";

        if (images.size() > 0) {
            for (Element image : images) {
                try {
                    source = URLDecoder.decode(image.attr("src").replace("https://utilbucket.s3.ap-northeast-2.amazonaws.com/", ""), "UTF-8");
                    System.out.println(source);
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                s3Uploader.deleteS3(source);
            }
        }
    }


}


