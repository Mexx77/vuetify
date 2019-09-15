package server

import "net/http"

func (s *server) routes() {
	fs := http.FileServer(http.Dir("../dist"))
	http.Handle("/", fs)
	http.HandleFunc("/rides", s.addCORSHeader(s.ridesHandler()))
	http.HandleFunc("/ride", s.addCORSHeader(s.rideHandler()))
	http.HandleFunc("/users/authenticate", s.addCORSHeader(s.authenticateHandler()))
	http.HandleFunc("/users/validateToken", s.addCORSHeader(s.validateTokenHandler()))
	http.HandleFunc("/test", s.loggedInOnly(s.test()))
}
