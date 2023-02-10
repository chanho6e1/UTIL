package com.youtil.server.service.post;

import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.youtil.server.common.PagedResponse;
import com.youtil.server.common.exception.ArgumentMismatchException;
import com.youtil.server.common.exception.ResourceForbiddenException;
import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.config.s3.S3Uploader;
import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.post.*;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.post.*;
import com.youtil.server.dto.tag.TagResponse;
import com.youtil.server.repository.goal.GoalRepository;
import com.youtil.server.repository.post.*;
import com.youtil.server.repository.tag.TagOfPostRepository;
import com.youtil.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {
    private final PostRepository postRepository;
    private final PostQueryRepository postQueryRepository;
    private final PostLikeRepository postLikeRepository;
    private final PostCommentRepository postCommentRepository;
    private final UserRepository userRepository;
    private final PostBookmarkRepository postBookmarkRepository;
    private final GoalRepository goalRepository;
    private final TagOfPostRepository tagOfPostRepository;
    private final S3Uploader s3Uploader;
    private final String baseImg = "21ef9957-c12f-4bd8-a098-e0c75fe2b7c3ogo.png";


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
            bookmarkStatus = true;
        }
        return new PostResponse(post, likeStatus, bookmarkStatus);
    }

    public PagedResponse<PostResponse> findPostListByUser(Long userId, int offset, int size, String criteria) {//내가 쓴 글 조회/오프셋
        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        Page<Post> page =  postQueryRepository.findPostListByUser(userId, criteria, PageRequest.of(offset - 1, size));

        List<PostResponse> responses = page.stream().map((post)-> new PostResponse(post, user, getTagByPost(post.getPostId()))).collect(Collectors.toList());
        return new PagedResponse<>(responses, page.getNumber()+1, page.getSize(), page.getTotalElements(),
                page.getTotalPages(), page.isLast());
    }

    public  PagedResponse<PostResponse> findPostListBySpecUser(Long userId, int offset, int size, String criteria, Long myId) {
        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId)); //내가 조회할 유저
        User me = userRepository.findUser(myId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", myId)); //접속 중인 나

        Page<Post> page = postQueryRepository.findPostListBySpecUser(userId, criteria, PageRequest.of(offset - 1, size), me);
        List<PostResponse> responses = page.stream().map((post)-> new PostResponse(post, me, getTagByPost(post.getPostId()))).collect(Collectors.toList());
        return new PagedResponse<>(responses, page.getNumber()+1, page.getSize(), page.getTotalElements(),
                page.getTotalPages(), page.isLast());
    }


    public PagedResponse<PostResponse> findPostList(Long userId, String criteria, int offset, int size) {//전체 리스트 조회,정렬기준(선택/디폴트는 최근 날짜) ,오프셋
        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        Page<Post> page =  postQueryRepository.findPostList(userId, criteria, PageRequest.of(offset - 1, size));
        List<PostResponse> responses = page.stream().map((post)-> new PostResponse(post, user, getTagByPost(post.getPostId()))).collect(Collectors.toList());

        return new PagedResponse<>(responses, page.getNumber()+1, page.getSize(), page.getTotalElements(),
                page.getTotalPages(), page.isLast());
    }

    public PagedResponse<PostResponse> findByPostTitle(Long userId, PostSearch search, int offset, int size) {//내용으로 검색/오프셋
        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        Page<Post> page =  postQueryRepository.findByTitleContaining(userId, search, PageRequest.of(offset - 1, size));
        List<PostResponse> responses = page.stream().map((post)-> new PostResponse(post, user, getTagByPost(post.getPostId()))).collect(Collectors.toList());

        return new PagedResponse<>(responses, page.getNumber()+1, page.getSize(), page.getTotalElements(),
                page.getTotalPages(), page.isLast());
    }

    public PagedResponse<PostResponse> findByNickName(Long userId, PostSearch search, int offset, int size) {//내용으로 검색/오프셋
        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        Page<Post> page =  postQueryRepository.findByNickNameContaining(userId, search, PageRequest.of(offset - 1, size));
        List<PostResponse> responses = page.stream().map((post)-> new PostResponse(post, user, getTagByPost(post.getPostId()))).collect(Collectors.toList());

        return new PagedResponse<>(responses, page.getNumber()+1, page.getSize(), page.getTotalElements(),
                page.getTotalPages(), page.isLast());
    }

    public PagedResponse<PostLikePeopleResponse> PostLikesPeople(Long postId, int offset, int size) {//해당 게시물의 좋아요한 사람 리스트
        Page<PostLike> page = postQueryRepository.PostLikesPeople(postId, PageRequest.of(offset - 1, size));
        List<PostLikePeopleResponse> responses = page.stream().map(PostLikePeopleResponse::new).collect(Collectors.toList());
        return new PagedResponse<>(responses, page.getNumber()+1, page.getSize(), page.getTotalElements(),
                page.getTotalPages(), page.isLast());
    }


    public PagedResponse<PostResponse> findByPostSubscribes(PostSearch search, Long userId, int offset, int size) {//내가 구독한 사람의 글 리스트 조회/오프셋

        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        Page<Post> page = postQueryRepository.findByPostSubscribes(search, user, PageRequest.of(offset - 1, size));
        List<PostResponse> responses = page.stream().map((post)-> new PostResponse(post, user, getTagByPost(post.getPostId()))).collect(Collectors.toList());
        return new PagedResponse<>(responses, page.getNumber()+1, page.getSize(), page.getTotalElements(),
                page.getTotalPages(), page.isLast());
    }

    public PagedResponse<PostResponse> findByLikePostList(Long userId, String criteria, int offset, int size) {
        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        Page<Post> page =  postQueryRepository.findByLikePostList(criteria, user, PageRequest.of(offset - 1, size));

        List<PostResponse> responses = page.stream().map((post)-> new PostResponse(post, user, getTagByPost(post.getPostId()))).collect(Collectors.toList());
        return new PagedResponse<>(responses, page.getNumber()+1, page.getSize(), page.getTotalElements(),
                page.getTotalPages(), page.isLast());
    }
    public List<TagResponse> getTagByPost(Long postId) { // 포스트로 테그 조회
        Post post = postRepository.findById(postId).orElseThrow(() -> new ResourceNotFoundException("Post", "postId", postId));
        return tagOfPostRepository.findByPost(post)
                .stream().map(TagResponse::new).collect(Collectors.toList());
    }
    public PagedResponse<PostResponse> findByBookmarkPostList(Long userId, String criteria, int offset, int size) {
        User user = userRepository.findUser(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        Page<Post> page = postQueryRepository.findByBookmarkPostList(criteria, user, PageRequest.of(offset - 1, size));

        List<PostResponse> responses = page.stream().map((post) -> new PostResponse(post, user, getTagByPost(post.getPostId()))).collect(Collectors.toList());
        return new PagedResponse<>(responses, page.getNumber()+1, page.getSize(), page.getTotalElements(),
                page.getTotalPages(), page.isLast());

//    return postQueryRepository.findByBookmarkPostList(criteria, user, PageRequest.of(offset - 1, size))
//            .stream().map((post)-> new PostResponse(post, user)).collect(Collectors.toList());
    }


    /////////////////////////

    @Transactional
    public Long createPost(Long userId, PostSaveRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        Post post = postRepository.save(request.of(user));

        if(request.getGoalId()!=null){
            Goal goal = goalRepository.findGoalByGoalId(request.getGoalId())
                    .orElseThrow(()-> new ResourceNotFoundException("goal" , "goalId", request.getGoalId()));
            validGoalUser(userId, goal.getUser().getUserId());
            post.setGoal(goal);
        }

         if(!request.getPostFileList().isEmpty()){
             Map<Integer, String> map =  post.getPostFileMap();
             post.setThubmnail(request.getPostFileList().get(0).replace("https://utilbucket.s3.ap-northeast-2.amazonaws.com/static/post/","")); //첫번째 사진 섬네일 등록
            for(int idx=0; idx<request.getPostFileList().size(); idx++){
                String source = request.getPostFileList().get(idx).replace("https://utilbucket.s3.ap-northeast-2.amazonaws.com/static/post/","");
                post.addPostFile(idx, source);
            }
        }else{
             post.setThubmnail(baseImg);
         }
        return post.getPostId();
    }

    @Transactional
    public Long deletePost(Long userId, Long postId) throws UnsupportedEncodingException {
        Post post = postRepository.findPost(postId).orElseThrow(() -> new ResourceNotFoundException("Post", "postId", postId));
        validPostUser(userId, post.getUser().getUserId());
        post.clearUser();
        deletePostFile(postId);  //2) 포스트별 저장하고 있는 포스트 파일 읽어와서 s3삭제  : 사용할것임!!!! 지금은 테스트 중이라 주석처리

        postRepository.deletePostTag(postId);
        postRepository.deletePostLike(postId);
        postRepository.deletePostBookmark(postId);
        postCommentRepository.deleteByPostId(postId);
        postRepository.deleteById(postId);
        return postId;
    }

    //사용할 것임!!
    private void deletePostFile(Long postId) throws UnsupportedEncodingException {
        Post post = postRepository.findPost(postId).orElseThrow(() -> new ResourceNotFoundException("Post", "postId", postId));

          for(int idx=0; idx< post.getPostFileMap().size(); idx++){
              String source = URLDecoder.decode("static/post/"+post.getPostFileMap().get(idx), "UTF-8");
              try {
                  s3Uploader.delete(source);
              } catch (AmazonS3Exception e) {
                  throw new ResourceNotFoundException("삭제할 파일이 서버에 존재하지 않습니다");
              }
        }
    }

    @Transactional
    public Long updatePost(Long userId, Long postId, PostUpdateRequest request) {
        Post post = postRepository.findPost(postId).orElseThrow(() -> new ResourceNotFoundException("post", "postId", postId));

        validPostUser(userId, post.getUser().getUserId());
        post.update(request);

         if(request.getGoalId()!=null){
            Goal goal = goalRepository.findGoalByGoalId(request.getGoalId())
                    .orElseThrow(()-> new ResourceNotFoundException("goal" , "goalId", request.getGoalId()));
             validGoalUser(userId, goal.getUser().getUserId());
             post.setGoal(goal);
        } else{
            post.resetGoal();
        }

        if(!request.getPostFileList().isEmpty()){
            Map<Integer, String> map =  post.getPostFileMap();
            int size = map.size();
            for(int idx=0; idx<request.getPostFileList().size(); idx++){
                String source = request.getPostFileList().get(idx).replace("https://utilbucket.s3.ap-northeast-2.amazonaws.com/static/post/","");
                post.addPostFile(size++, source);
            }
        }

        String source = parseContextAndUpdateTumbnail(post);

        if(source==null){
            post.setThubmnail(baseImg);
        }else{
            post.setThubmnail(source);
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

    public void validGoalUser(Long currentUser, Long postUser) {

        if (currentUser == postUser || currentUser.equals(postUser)) {
            return;
        }
        else {
            throw new ResourceForbiddenException("본인의 목표가 아닙니다");
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

    //섬네일 후보 제공 : 사용안함
    public String getThumbnailCandidate(PostContentRequest request) {
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


    //수정할때 섬네일 반영
    public String parseContextAndUpdateTumbnail(Post post) {
        Document doc = Jsoup.parse(post.getContent());
        Elements images = doc.getElementsByTag("img");
        String source = null;

        if (images.size() > 0) {
            for (Element image : images) {
                source = image.attr("src").replace("https://utilbucket.s3.ap-northeast-2.amazonaws.com/static/post", "");
                return source;
            }
        }
        return source;
    }


    //post 삭제하면 안의 파일도 삭제 : 사용 안함
    public void parseContextAndDeleteImages(Post post) {
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


