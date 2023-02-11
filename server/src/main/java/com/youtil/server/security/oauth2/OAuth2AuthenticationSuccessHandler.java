package com.youtil.server.security.oauth2;

import com.google.gson.Gson;
import com.youtil.server.config.AppProperties;
import com.youtil.server.common.exception.BadRequestException;
import com.youtil.server.domain.user.User;
import com.youtil.server.dto.user.UserResponse;
import com.youtil.server.repository.user.UserRepository;
import com.youtil.server.security.TokenProvider;
import com.youtil.server.util.CookieUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.rememberme.CookieTheftException;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URI;
import java.util.Optional;

import static com.youtil.server.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private static final Logger logger = LoggerFactory.getLogger(OAuth2AuthenticationSuccessHandler.class);

    private TokenProvider tokenProvider;

    private AppProperties appProperties;

    private HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;

    private final UserRepository userRepository;

    @Autowired
    OAuth2AuthenticationSuccessHandler(TokenProvider tokenProvider, AppProperties appProperties,
                                       HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository, UserRepository userRepository) {
        this.tokenProvider = tokenProvider;
        this.appProperties = appProperties;
        this.httpCookieOAuth2AuthorizationRequestRepository = httpCookieOAuth2AuthorizationRequestRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String targetUrl = determineTargetUrl(request, response, authentication); // 여기에 토큰 담아줌

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        System.out.println(targetUrl);

        System.out.println("oauth Success");

        String userEmail = authentication.getName();
        System.out.println(userEmail);

        Optional<User> userOptional = userRepository.findByEmail(userEmail);

//        User user = userOptional.get();

        UserResponse user = UserResponse.from(userOptional.get());

        System.out.println(user.getNickname());

        PrintWriter writer = response.getWriter();

        Gson gson = new Gson();
        String jsonString = gson.toJson(user);
        writer.print(jsonString);

//        response.setHeader();

//        writer.print(json); //json화
        String code = "";
        if(user.getNickname() != null){
            response.setStatus(200);
            response.setHeader("code", "200");
            targetUrl += "&code=200";
            code = "200";
        }else{
            response.setStatus(201); //회원가입
            response.setHeader("code", "201");
            targetUrl += "&code=201";
            code = "201";
        }

        clearAuthenticationAttributes(request, response);
        Cookie cookie = new Cookie("code", code);
        response.addCookie(cookie);

//        targetUrl = "http://localhost:3000";
        System.out.println(response.getHeader("code"));

//        System.out.println(targetUrl + "/code=200");

        getRedirectStrategy().sendRedirect(request, response, targetUrl);

//        System.out.println(response.getStatus() + " " + jsonString);

//        System.out.println(currentUser.getUserId());



        //repository

        //repository 의존성 주입
        //dto 반환
        //response.

        //response 넣어 200, 201

        //직렬화 printer writer class = 바디에 넣기
//        PrintWriter writer = response.getWriter();
////        writer.print(json); //json화
//
//        clearAuthenticationAttributes(request, response);
//        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        Optional<String> redirectUri = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue);

        if(redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
            throw new BadRequestException("Sorry! We've got an Unauthorized Redirect URI and can't proceed with the authentication");
        }

        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

        String token = tokenProvider.createToken(authentication);

//        logger.info("===============success token: {}", token);

        Cookie cookie = new Cookie("accessToken", token);
        response.addCookie(cookie);

        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("token", token)
                .build().toUriString();
    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }

    private boolean isAuthorizedRedirectUri(String uri) {
        URI clientRedirectUri = URI.create(uri);
        System.out.println(clientRedirectUri);

        return appProperties.getOauth2().getAuthorizedRedirectUris()
                .stream()
                .anyMatch(authorizedRedirectUri -> {
                    // Only validate host and port. Let the clients use different paths if they want to
                    URI authorizedURI = URI.create(authorizedRedirectUri);
                    if(authorizedURI.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
                            && authorizedURI.getPort() == clientRedirectUri.getPort()) {
                        return true;
                    }
                    return false;
                });
    }
}
