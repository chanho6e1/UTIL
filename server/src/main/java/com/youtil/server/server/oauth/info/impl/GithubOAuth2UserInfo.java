package com.youtil.server.server.oauth.info.impl;

import com.youtil.server.oauth.info.OAuth2UserInfo;

import java.util.Map;

public class GithubOAuth2UserInfo extends OAuth2UserInfo {
    public GithubOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return attributes.get("id").toString();
    }

    @Override
    public String getName() {
        return attributes.get("login").toString();
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getImageUrl() {
        return (String) attributes.get("avatar_url");
    }
//    public GithubOAuth2UserInfo(Map<String, Object> attributes){ super(attributes); }
//
//    @Override
//    public String getId() {
//        System.out.println("id " + attributes.get("id").toString());
//
////        login=chanho6e1, id=108286046, node_id=U_kgDOBnRQXg, avatar_url=https://avatars.githubusercontent.com/u/108286046?v=4, gravatar_id=, url=https://api.github.com/users/chanho6e1, html_url=https://github.com/chanho6e1, followers_url=https://api.github.com/users/chanho6e1/followers, following_url=https://api.github.com/users/chanho6e1/following{/other_user}, gists_url=https://api.github.com/users/chanho6e1/gists{/gist_id}, starred_url=https://api.github.com/users/chanho6e1/starred{/owner}{/repo}, subscriptions_url=https://api.github.com/users/chanho6e1/subscriptions, organizations_url=https://api.github.com/users/chanho6e1/orgs, repos_url=https://api.github.com/users/chanho6e1/repos, events_url=https://api.github.com/users/chanho6e1/events{/privacy}, received_events_url=https://api.github.com/users/chanho6e1/received_events, type=User, site_admin=false, name=null, company=null, blog=, location=null, email=null, hireable=null, bio=null, twitter_username=null, public_repos=6, public_gists=0, followers=2, following=1, created_at=2022-06-27T14:52:40Z, updated_at=2023-01-16T13:12:23Z}
//
//        return attributes.get("id").toString(); }
//
//    @Override
//    public String getName() {
////        String name = (String) attributes.get("login");
////        if(attributes.get("login")==null) name = "미동의";
////        System.out.println("name " + name);
////        return name;
//        System.out.println("login " + attributes.get("login").toString());
//        return attributes.get("login").toString();
//    }
//
//    @Override
//    public String getEmail() {
////        String email = (String) attributes.get("email");
////        if(attributes.get("email")==null) email = "미동의";
////        System.out.println("email " + email);
////        return email;
//        System.out.println("email " + attributes.get("email").toString());
//        return (String) attributes.get("email");
//    }
//
//    @Override
//    public String getImageUrl() {
//        return (String) attributes.get("avatar_url");
//    }


}
