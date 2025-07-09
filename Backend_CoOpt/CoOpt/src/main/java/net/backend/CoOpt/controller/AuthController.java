package net.backend.CoOpt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import net.backend.CoOpt.dto.AuthRequest;
import net.backend.CoOpt.dto.AuthResponse;
import net.backend.CoOpt.model.User;
import net.backend.CoOpt.repository.UserRepository;
import net.backend.CoOpt.util.JwtUtil;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
	
	@Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

	 @PostMapping("/signup")
	    public ResponseEntity<?> registerUser(@RequestBody User user) {
	        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
	            return ResponseEntity.status(HttpStatus.CONFLICT).body("User with this email already exists.");
	        }
	        user.setPassword(passwordEncoder.encode(user.getPassword()));
	        userRepository.save(user);
	        
	        return ResponseEntity.ok("User registered successfully");
	    }

	    @PostMapping("/login")
	    public ResponseEntity<?> authenticateUser(@RequestBody AuthRequest request) {
	        try {
	            authenticationManager.authenticate(
	                new UsernamePasswordAuthenticationToken(
	                    request.getEmail(),
	                    request.getPassword()
	                )
	            );
	        } catch (BadCredentialsException e) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                    .body("Invalid email or password");
	        }

	        // Load user details from DB to generate JWT
	        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
	        String token = jwtUtil.generateToken(userDetails);

	        return ResponseEntity.ok(new AuthResponse(token));
	    }

}
