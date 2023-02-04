package com.youtil.server.config.firebase;

import com.nimbusds.openid.connect.sdk.federation.policy.language.StringListConfiguration;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class NotificationRequest {

    private String title;
    private String token;
    private String message;


}
