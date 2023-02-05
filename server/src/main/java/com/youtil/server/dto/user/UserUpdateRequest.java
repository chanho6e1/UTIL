package com.youtil.server.dto.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class UserUpdateRequest {

    @NotBlank(message = "빈문자열을 허용하지 않습니다.")
    @Length(min = 2, max = 10, message = "2~10자의 닉네임만 가능합니다.")
    private String nickName;
    private String department;
    private String imageUrl;
    private String discription;
}
