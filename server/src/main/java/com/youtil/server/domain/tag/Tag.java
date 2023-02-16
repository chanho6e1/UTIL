package com.youtil.server.domain.tag;

import com.youtil.server.domain.BaseEntity;
import com.youtil.server.domain.goal.Goal;
import com.youtil.server.domain.post.Post;
import com.youtil.server.domain.user.User;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.OverridesAttribute;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@DynamicUpdate
public class Tag extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private Long tagId;

    private String tagName;

    @Builder
    public Tag(String name) {
        this.tagName = name;
    }

    public Tag(Tag tag) {
        this.tagId = tag.getTagId();
        this.tagName = tag.getTagName();
    }

    public void update(String name){
        this.tagName = name;
    }
}
