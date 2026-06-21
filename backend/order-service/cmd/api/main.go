package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"zenith-order-service/internal/handlers"
)

func main() {
	mux := http.NewServeMux()

	// Setup basic CORS
	corsMiddleware := func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

			if r.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}
			next.ServeHTTP(w, r)
		})
	}

	appHandlers := handlers.NewHandlers()

	mux.HandleFunc("/api/orders", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			appHandlers.GetAllOrders(w, r)
		case http.MethodPost:
			appHandlers.PlaceOrder(w, r)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
	})

	port := ":8081"
	fmt.Printf("Order service listening on port %s\n", port)
	
	server := &http.Server{
		Addr:    port,
		Handler: corsMiddleware(mux),
	}
	
	log.Fatal(server.ListenAndServe())
}
