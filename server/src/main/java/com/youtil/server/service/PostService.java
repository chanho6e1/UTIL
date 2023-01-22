package com.youtil.server.service;

import com.querydsl.core.types.OrderSpecifier;
import com.youtil.server.common.PagedResponse;
import com.youtil.server.common.exception.ResourceForbiddenException;
import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostComment;
import com.youtil.server.domain.post.PostFile;
import com.youtil.server.domain.post.PostLike;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.post.*;
import com.youtil.server.repository.post.*;
import com.youtil.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.JpaSort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.youtil.server.domain.post.QPost.post;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {

    @Autowired
    PostRepository postRepository;
    @Autowired
    PostQueryRepository postQueryRepository;
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

    @Transactional
    public PostResponse findPost(Long postId, Long userId) { //단일 조회
        Post post = postRepository.findPost(postId).orElseThrow(() -> new ResourceNotFoundException("Post", "postId", postId));

        post.addView();
        Boolean likeStatus = false;
        if(postLikeRepository.existsByPostIdAndUserId(postId, userId).isPresent()){
            likeStatus = true;
        }
        return new PostResponse(post, likeStatus);

    }


    public PagedResponse<PostResponse> findPostListByUser(Long userId, Sort.Direction sort, String cop, Long cursor, Integer size) {//내가 쓴 글 조회/커서

        Pageable pageable = PageRequest.of(0, size, Sort.by(Sort.Direction.DESC, "createdDate"));

        Slice<Post> posts =  postRepository.findMyListByCursor(userId, cursor, cop, pageable);
        List<PostResponse> postResponses = posts.stream().map(PostResponse::new).collect(Collectors.toList());
        return new PagedResponse<PostResponse>(postResponses, 0, posts.getSize(),
                0, posts.isLast());
    }

//    public List<PostResponse> findPostListByUser(Long userId, int offset) {//내가 쓴 글 조회/오프셋
//        return postQueryRepository.findPostListByUser(userId, PageRequest.of(offset - 1, 10))
//                .stream().map(PostResponse::new).collect(Collectors.toList());
//    }

    public PagedResponse<PostResponse> findPostList(String criteria, Sort.Direction sort, String cop, Long cursor, Integer size) {//전체 리스트 조회,정렬기준(선택/디폴트는 최근 날짜), 커서

        Pageable pageable = null;
        String order = null;
        if(criteria == null){
            order =  "date";
            pageable = findCriteria(size, order);
        }else {
            pageable = findCriteria(size, criteria);
        }
        Slice<Post> posts =  postRepository.findListByCursor(cursor, cop, pageable);
        List<PostResponse> postResponses = posts.stream().map(PostResponse::new).collect(Collectors.toList());
        return new PagedResponse<PostResponse>(postResponses, 0, posts.getSize(),
                0, posts.isLast());
    }

//    public List<PostResponse> findPostList(String criteria, int offset) {//전체 리스트 조회,정렬기준(선택/디폴트는 최근 날짜) ,오프셋
//        return postQueryRepository.findPostList(criteria, PageRequest.of(offset - 1, 10))
//                .stream().map(PostResponse::new).collect(Collectors.toList());
//    }

    public  PagedResponse<PostResponse> findByPostContent(PostSearch search, Sort.Direction sort, String cop, Long cursor, Integer size) {//내용으로 검색
        Pageable pageable = null;
        String order = search.getCriteria();
        if(order == null){
            order =  "date";
            pageable = findCriteria(size, order);
        }else {
            pageable = findCriteria(size, order);
        }
        Slice<Post> posts =  postRepository.findListByContentByCursor(search.getContent(), cursor, cop, pageable);
        List<PostResponse> postResponses = posts.stream().map(PostResponse::new).collect(Collectors.toList());
        return new PagedResponse<PostResponse>(postResponses, 0, posts.getSize(),
                0, posts.isLast());

      }

//    public List<PostResponse> findByPostContent(PostSearch search, int offset) {//내용으로 검색/오프셋
//        return postQueryRepository.findByContentContaining(search, PageRequest.of(offset - 1, 10))
//                .stream().map(PostResponse::new).collect(Collectors.toList());
//    }

     public PagedResponse<PostLikePeopleResponse> PostLikesPeople(Long id, Long postId, Sort.Direction sort, String cop, Long cursor, Integer size) {//해당 게시물의 좋아요한 사람 리스트

         Post post = postRepository.findPost(postId).orElseThrow(() -> new ResourceNotFoundException("Post", "postId", postId));

         Pageable pageable =  PageRequest.of(0, size, Sort.by(Sort.Direction.DESC, "createdDate"));
         Slice<PostLike> posts =  postRepository.PostLikesPeople(postId, cursor, cop, pageable);
         List<PostLikePeopleResponse> postResponses = posts.stream().map(PostLikePeopleResponse::new).collect(Collectors.toList());
         return new PagedResponse<PostLikePeopleResponse>(postResponses, 0, posts.getSize(),
                 0, posts.isLast());
    }


//    public List<PostLikePeopleResponse> PostLikesPeople(Long id, Long postId, int offset) {//해당 게시물의 좋아요한 사람 리스트
//        return postQueryRepository.PostLikesPeople(postId, PageRequest.of(offset - 1, 10))
//                .stream().map(PostLikePeopleResponse::new).collect(Collectors.toList());
//    }


    public  PagedResponse<PostResponse>  findByPostSubscribes(PostSearch search, Long userId, Sort.Direction sort, String cop, Long cursor, Integer size) {//내가 구독한 사람의 글 리스트 조회/커서

        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        Pageable pageable = null;
        String order = search.getCriteria();
        if(order == null){
            order =  "date";
            pageable = findCriteria(size, order);
        }else {
            pageable = findCriteria(size, order);
        }

        Slice<Post> posts =  postRepository.findByPostSubscribes(userId, cursor, cop, pageable);
        List<PostResponse> postResponses = posts.stream().map(PostResponse::new).collect(Collectors.toList());
        return new PagedResponse<PostResponse>(postResponses, 0, posts.getSize(),
                0, posts.isLast());
    }

//    public List<PostResponse> findByPostSubscribes(PostSearch search, Long userId, int offset) {//내가 구독한 사람의 글 리스트 조회/오프셋
//
//        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
//        return postQueryRepository.findByPostSubscribes(search, user, PageRequest.of(offset - 1, 10))
//                .stream().map(PostResponse::new).collect(Collectors.toList());
//    }

    private Pageable findCriteria(Integer size, String criteria){ //정렬 조건
        if(criteria.contains("date")){
            return PageRequest.of(0, size, Sort.by(Sort.Direction.DESC, "createdDate"));
        } else if(criteria.contains("like")){
            return PageRequest.of(0, size, JpaSort.unsafe(Sort.Direction.DESC,"count(l.post.postId)"));
        } else if(criteria.contains("view")){
            PageRequest.of(0, size, Sort.by(Sort.Direction.DESC, "views"));
        }
        return PageRequest.of(0, size, Sort.by(Sort.Direction.DESC, "createdDate"));
    }

    /////////////////////////

    @Transactional
    public Long createPost(Long userId, PostSaveRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        return postRepository.save(request.of(user)).getPostId();
    }

    @Transactional
    public Long deletePost(Long userId, Long postId) {
        Post post = postRepository.findPost(postId).orElseThrow(() -> new ResourceNotFoundException("Post", "postId", postId));
        validPostUser(userId, post.getUser().getUserId());
        postCommentRepository.deleteByPostId(postId);
        postRepository.deleteById(postId);
        return postId;
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

    @Transactional
    public Long updatePost(Long userId, Long postId, PostUpdateRequest request) {
        Post post = postRepository.findPost(postId).orElseThrow(() -> new ResourceNotFoundException("post", "postId", postId));

        validPostUser(userId, post.getUser().getUserId());
        post.update(request);
        return postId;
    }

    @Transactional
    public Boolean togglePostLikes(Long userId, Long postId) {
        Post post = postRepository.findPost(postId).orElseThrow(() -> new ResourceNotFoundException("post", "postId", postId));
        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("user", "userId", userId));
        PostLike postLike = PostLike.builder().post(post).user(user).build();
        return post.togglePostLike(postLike);
    }
}


