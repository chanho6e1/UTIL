package com.youtil.server.dto.post;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostContentRequest {

    @NotBlank(message = "내용이 없습니다.")
    private String content;

}
