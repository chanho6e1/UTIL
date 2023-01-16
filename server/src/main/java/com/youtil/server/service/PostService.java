package com.youtil.server.service;

import com.youtil.server.common.exception.ResourceNotFoundException;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostFile;
import com.youtil.server.dto.post.PostResponse;
import com.youtil.server.dto.post.PostSaveRequest;
import com.youtil.server.dto.post.PostSaveRequest1;
import com.youtil.server.repository.post.PostFileRepository;
import com.youtil.server.repository.post.PostQueryRepository;
import com.youtil.server.repository.post.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

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

//    @Transactional
//    public PostResponse findPost(Long postId) {
//        Post post = postRepository.findPost(postId).orElseThrow(() -> new ResourceNotFoundException("Post", "postId", postId));
//        if (post == null) throw new ResourceNotFoundException("해당 포스트가 존재하지 않는다");
//
//        return new PostResponse(post);
//    }
//
//    @Transactional
//    public Long createPost(Long userId, PostSaveRequest request) {
//        return postRepository.save(request.of()).getId();
//    }
//
//    @Transactional
//    public Long createPost(PostSaveRequest request, List<MultipartFile> files) throws Exception {
//
//        Post post = postRepository.save(request.of()); //글 먼저 저장
//
//        savePostContent(request, post);
//        savePostFIle(request, files, post);
//
//
//        if(files!= null && files!= null){
//            savePostFIle(request, files, post);
//        }
//
//        return post.getId();
//    }
//
//    private void savePostFIle(PostSaveRequest request, List<MultipartFile> files, Post post) throws Exception {
//
//        List<PostFile> photoList = fileHandler.parseFileInfo(files);
//        List<String> postFileIdxLists = null;
//
//        if(! request.getContentLists()[1].isEmpty() ) {
//            postFileIdxLists  = request.getContentLists()[1];
//        }
//
//        if(!photoList.isEmpty() && !postFileIdxLists.isEmpty()) {
//
//            for(int i=0; i<photoList.size(); i++){
//                PostFile postFile = photoList.get(i);
//                postFile.setPost(post);
//                post.addPostFile(postFileRepository.save(postFile));
//
//                String idx = postFileIdxLists.get(i);
//                PostFileIdx postFileIdxEntity = new PostFileIdx(Long.parseLong(idx), post, postFile);
//                postFile.setPostFileIdx(postFileIdxEntity);
//                // 내용을 DB에 저장
//                post.addPostFileIdx(postFileIdxRepository.save(postFileIdxEntity));
//            }
//
//        }
//    }
//
//    public List<PostResponse> findPostList(int postType, int offset) {
//        return postQueryRepository.findPostList(postType, PageRequest.of(offset-1, 10))
//                .stream().map(PostResponse::new).collect(Collectors.toList());
//    }
//
//    public List<PostResponse> findByPostTitle(int postType, String title, int offset) {//제목으로 검색
//
//        return postQueryRepository.findByTitleContaining(postType, title, PageRequest.of(offset - 1, 10))
//                .stream().map(PostResponse::new).collect(Collectors.toList());
//    }
//
//    @Transactional
//    public Long updatePost(Long postId, PostUpdateRequest requestDto, List<MultipartFile> files) throws Exception {
//
//        Post post = postRepository.findById(postId).orElseThrow(() -> new ResourceNotFoundException("Post", "postId", postId));
//
//        //        validPostUser(userId, post.getUser().getId());//권한 검사
//        post.getContentLists().clear();
//        updateContent(requestDto, post);
//        updateFile(requestDto, files, post);
//
//        return postId;
//    }
//
//    private void updateFile(PostUpdateRequest requestDto, List<MultipartFile> files, Post post) throws Exception {
//
//        List<String> fileUpdateIdxlist = requestDto.getContentLists()[1];
//        List<PostFile> photoList = fileHandler.parseFileInfo(files);
//        post.getFileLists().getFileLists().clear();
//        post.getPostFileIdxLists().clear();
//
//        if(!photoList.isEmpty()) {
//            for(int i=0; i<photoList.size(); i++){
//                PostFile postFile = photoList.get(i);
//                postFile.setPost(post);
//                post.addPostFile(postFileRepository.save(postFile));
//
//                String idx = fileUpdateIdxlist.get(i);
//                PostFileIdx postFileIdxEntity = new PostFileIdx(Long.parseLong(idx), post, postFile);
//                postFile.setPostFileIdx(postFileIdxEntity);
//                // 내용을 DB에 저장
//                post.addPostFileIdx(postFileIdxRepository.save(postFileIdxEntity));
//            }
//        }
//    }
//
//    private void updateContent(PostUpdateRequest requestDto, Post post) {
//
//        List<String> list = requestDto.getContentLists()[0];
//
//        if(!list.isEmpty()) {
//            for (int i = 0; i < list.size(); i++) {
//                post.update(requestDto.getTitle());
//                PostContent contentEntity = new PostContent(list.get(i), post);
//                // 내용을 DB에 저장
////                post.addContent(postContentRepository.save(contentEntity));
//            }
//        }
//    }
//
//    @Transactional
//    public Long deletePost(Long postId) {
//        Post post = postRepository.findById(postId).orElseThrow(() -> new ResourceNotFoundException("Post", "postId", postId));
//
////        validPostUser(userId, post.getUser().getId());
////        postLikeRepository.deleteByPostId(postId);
////        postCommentRepository.deleteByPostId(postId);
//        postRepository.deleteById(postId);
//        return postId;
//    }

//    public void validPostUser(Long currentUser, Long postUser) {
//        if (currentUser == postUser)
//            return;
//        throw new ResourceForbiddenException("본인이 작성한 글이 아닙니다");
//    }

    @Transactional
    public String uploadPostFile(List<MultipartFile> files) throws Exception {

        if(files!= null && !files.isEmpty()){
            return savePostFIle1(files);
        }
        return null;
    }

    private String savePostFIle1(List<MultipartFile> files) throws Exception {

        List<PostFile> photoList = fileHandler.parseFileInfo(files);
        if(!photoList.isEmpty()) {

            for(int i=0; i<photoList.size(); i++){
                PostFile postFile = photoList.get(i);
                postFileRepository.save(postFile);
//                postFile.setPost(post);
//                post.addPostFile(postFileRepository.save(postFile));
           }
        }

        return photoList.get(0).getSavedFileName();

    }

    private void savePostContent1(PostSaveRequest1 request, Post post) {

//        if(!postContent.isEmpty()) {
//
//            for(String content : postContent) {
//                System.out.println("content : " + content);
//                // 파일 DTO 이용하여 Photo 엔티티 생성
//                PostContent contentEntity = new PostContent(content, post);
//
//                // 내용을 DB에 저장
//                post.addContent(postContentRepository.save(contentEntity));
//            }
//        }
    }
}
