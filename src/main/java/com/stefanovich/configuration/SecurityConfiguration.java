package com.stefanovich.configuration;

import com.stefanovich.repository.PostsRepository;
import com.stefanovich.security.CustomLogoutSuccessHandler;
import com.stefanovich.security.JsonLoginFilter;
import com.stefanovich.security.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    private final PostsRepository postsRepository;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .addFilterBefore(jsonLoginFilter(postsRepository), UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers("/api/init").permitAll()
                .antMatchers(HttpMethod.GET, "/api/post/moderation").hasAnyAuthority(UserRole.MODERATOR.name())
                .antMatchers(HttpMethod.GET, "/api/post/my").hasAnyAuthority(UserRole.USER.name(), UserRole.MODERATOR.name())

                .antMatchers(HttpMethod.GET, "/api/post/**").permitAll()


                .antMatchers(HttpMethod.POST, "/api/post").hasAnyAuthority(UserRole.USER.name(), UserRole.MODERATOR.name())
                .antMatchers(HttpMethod.POST, "/api/post/like").hasAuthority(UserRole.USER.name())
                .antMatchers(HttpMethod.POST, "/api/post/dislike").hasAuthority(UserRole.USER.name())
                .antMatchers(HttpMethod.POST, "/api/post/image").hasAnyAuthority(UserRole.USER.name(), UserRole.MODERATOR.name())


                .antMatchers(HttpMethod.PUT, "/api/post/**").hasAnyAuthority(UserRole.USER.name(), UserRole.MODERATOR.name())
                .antMatchers(HttpMethod.POST, "/api/comment").hasAnyAuthority(UserRole.USER.name(), UserRole.MODERATOR.name())
                .antMatchers(HttpMethod.GET, "/api/tag/**").permitAll()
                .antMatchers(HttpMethod.POST, "/api/moderation").hasAuthority(UserRole.MODERATOR.name())
                .antMatchers(HttpMethod.GET, "/api/calendar/**").permitAll()
                .antMatchers(HttpMethod.POST, "/api/auth/profile/my").hasAnyAuthority(UserRole.USER.name(), UserRole.MODERATOR.name())
                .antMatchers(HttpMethod.GET, "/api/auth/logout").hasAnyAuthority(UserRole.USER.name(), UserRole.MODERATOR.name())
                .antMatchers("/api/auth/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/statistics/my").hasAnyAuthority(UserRole.USER.name(), UserRole.MODERATOR.name())
                .antMatchers(HttpMethod.GET, "/api/statistics/all").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/settings/").permitAll()
                .antMatchers(HttpMethod.GET, "/api/settings/").permitAll()


                .anyRequest().permitAll()
                .and().formLogin()
                .and()
                .logout()
                .logoutUrl("/api/auth/logout")
                .logoutSuccessHandler(new CustomLogoutSuccessHandler());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public JsonLoginFilter jsonLoginFilter(PostsRepository postsRepository) throws Exception {
        return new JsonLoginFilter(authenticationManager(), postsRepository);
    }
}
