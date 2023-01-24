package com.youtil.server.repository.category;

import com.youtil.server.domain.category.Category;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.post.PostComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface PostCategoryRepository extends JpaRepository<Category, Long> {

    @Transactional
    @Modifying
    @Query("delete from Category c where c.categoryId = :categoryId")
    void deleteByCategoryId(@Param("categoryId") Long postId);

    @Query("select c from Category c where c.categoryId = :categoryId")
    Optional<Category> findPost(@Param("categoryId") Long categoryId);

    @Query("select c from Category c where c.user.userId = :userId order by c.createdDate asc")
    List<Category> getCategory(@Param("userId") Long userId);

    @Query("select c from Category c where c.categoryId = :categoryId order by c.createdDate asc")
    List<Category> getCategoryPosts(@Param("categoryId")Long categoryId);

//    @Query("delete c from Post c where c.categoryId = :categoryId")
//    void deletePost(@Param("categoryId") Long categoryId, @Param("postId")Long postId);
}
