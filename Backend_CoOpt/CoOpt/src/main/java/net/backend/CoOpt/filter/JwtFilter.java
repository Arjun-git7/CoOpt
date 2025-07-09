package net.backend.CoOpt.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import net.backend.CoOpt.service.UserDetailsServiceImpl;
import net.backend.CoOpt.util.JwtUtil;
import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) 
			throws ServletException, IOException{
		
		final String authHeader = request.getHeader("Authorization");
		
		String email = null;
		String jwtToken = null;
		
		if(authHeader != null && authHeader.startsWith("Bearer")) {
			jwtToken = authHeader.substring(7);
			email=jwtUtil.extractUsername(jwtToken);
		}
		
		if(email!= null && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userDetails = userDetailsService.loadUserByUsername(email);
			
			if (jwtUtil.validateToken(jwtToken, userDetails)) {
	                UsernamePasswordAuthenticationToken authToken =
	                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	                SecurityContextHolder.getContext().setAuthentication(authToken);
		}
	}
	
		chain.doFilter(request, response);
	}

}
