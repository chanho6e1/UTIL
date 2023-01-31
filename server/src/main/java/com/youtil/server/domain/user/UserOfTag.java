package com.youtil.server.domain.user;

import com.youtil.server.domain.tag.Tag;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@DynamicUpdate
public class UserOfTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_of_tag_id")
    private Long userOfTagId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;

    @Builder
    public UserOfTag(User user, Tag tag) {
        this.user = user;
        this.tag = tag;
    }

}
