package com.youtil.server.config.firebase;

import com.youtil.server.domain.user.User;
import com.youtil.server.security.CurrentUser;
import com.youtil.server.security.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
public class NotificationApiController {

//    private final NotificationService notificationService;
//
//    public NotificationApiController(NotificationService notificationService) {
//        this.notificationService = notificationService;
//    }
//
//    @PostMapping("/register")
//    public ResponseEntity register(@RequestBody String token, @CurrentUser UserPrincipal userSession) {
//        notificationService.register(userSession.getId(), token);
//        return ResponseEntity.ok().build();
//    }
//
////    @PostMapping("/logout")
////    public ResponseEntity logout(@CurrentUser UserPrincipal userSession, HttpSession httpSession) {
////        loginService.logout(userSession.getId());
////        notificationService.deleteToken(userSession.getId());
////        httpSession.removeAttribute(USER_SESSION_KEY);
////        return ResponseEntity.ok().build();
////    }
//
//    private void createReceiveNotification(User sender, User receiver) {
////        if (receiver.isLogin()) {
//        NotificationRequest notificationRequest = NotificationRequest.builder()
//                .title("POST RECEIVED")
//                .token(notificationService.getToken(receiver.getId()))
//                .message(NotificationType.POST_RECEIVED.generateNotificationMessage(sender, receiver))
//                .build();
//        notificationService.sendNotification(notificationRequest);
////        }
//    }
//
//    private void createTaggedNotification(User sender, List<User> receivers) {
//        receivers.stream()
////                .filter(User::isLogin)
//                .forEach(receiver -> {
//                    NotificationRequest notificationRequest = NotificationRequest.builder()
//                            .title("POST TAGGED")
//                            .token(notificationService.getToken(receiver.getId()))
//                            .message(NotificationType.POST_TAGGED.generateNotificationMessage(sender, receiver))
//                            .build();
//                    notificationService.sendNotification(notificationRequest);
//                });
//    }

}
