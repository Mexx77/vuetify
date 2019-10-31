package server

import "net/http"

func (s *server) routes() {
	fs := http.FileServer(http.Dir("../dist"))
	http.Handle("/", fs)
	http.HandleFunc("/rides", s.addCORSHeader(s.ridesHandler()))
	http.HandleFunc("/ride/add", s.addCORSHeader(s.rideAddHandler()))
	http.HandleFunc("/ride/update", s.addCORSHeader(s.adminOnly(s.rideUpdateHandler())))
	http.HandleFunc("/ride/delete", s.addCORSHeader(s.adminOnly(s.rideDeleteHandler())))
	http.HandleFunc("/users/authenticate", s.addCORSHeader(s.authenticateHandler()))
	http.HandleFunc("/users/refreshToken", s.addCORSHeader(s.refreshTokenHandler()))
	http.HandleFunc("/users/register", s.addCORSHeader(s.registerHandler()))
	http.HandleFunc("/test", s.loggedInOnly(s.test()))
}
