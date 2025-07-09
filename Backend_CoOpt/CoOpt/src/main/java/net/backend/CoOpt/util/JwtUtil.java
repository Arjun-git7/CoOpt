package net.backend.CoOpt.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.*;
import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;

@Component
public class JwtUtil {

	@Value("${jwt.secret}")
	private String secretKeyString;
	
	private SecretKey secretKey;
    private final MacAlgorithm algorithm = Jwts.SIG.HS256;
	
//	private Key getSigningKey() {
//        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
//    }
	
	@PostConstruct
	public void init() {
		this.secretKey = Keys.hmacShaKeyFor(secretKeyString.getBytes(StandardCharsets.UTF_8));
		
	}
	 // Generate JWT token
    public String generateToken(UserDetails userDetails) {
//        return Jwts.builder()
//                .setSubject(userDetails.getUsername())
//                .setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 5)) // 5 hours
//                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
//                .compact();
    	return Jwts.builder()
    		    .claims()
    		        .add("sub", userDetails.getUsername())
    		        .add("iat", new Date(System.currentTimeMillis()))
    		        .add("exp", new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 5))
    		    .and()
    		    .signWith(secretKey, algorithm)
    		    .compact();
    }
    
 // Extract username (email) from token
    public String extractUsername(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
    
 // Validate token for matching user
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername());
    }
	
//	public String extractUsername(String token) {
//		return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getSubject();
//	}
//	
//	public boolean validateToken(String token, UserDetails userDetails) {
//		return extractUsername(token).equals(userDetails.getUsername());
//	}
}
