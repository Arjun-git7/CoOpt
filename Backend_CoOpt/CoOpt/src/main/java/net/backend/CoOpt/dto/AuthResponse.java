package net.backend.CoOpt.dto;

public class AuthResponse {
	
	public String token;

	public AuthResponse(String token) {
		super();
		this.token = token;
	}
	
	public String getToken() {
		return token;
	}

}
