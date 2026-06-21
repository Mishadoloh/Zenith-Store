package handlers

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"sync"
	"time"
	"fmt"
	"zenith-order-service/internal/models"
)

type Handlers struct {
	mu     sync.RWMutex
	orders map[string]models.Order
}

func NewHandlers() *Handlers {
	return &Handlers{
		orders: make(map[string]models.Order),
	}
}

func (h *Handlers) PlaceOrder(w http.ResponseWriter, r *http.Request) {
	var order models.Order
	if err := json.NewDecoder(r.Body).Decode(&order); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	order.ID = fmt.Sprintf("ORD-%d", rand.Intn(1000000)+10000)
	order.Status = "processing"

	// Calculate total amount to verify
	var total float64
	for _, item := range order.Items {
		total += item.Price * float64(item.Quantity)
	}
	order.TotalAmount = total

	h.mu.Lock()
	h.orders[order.ID] = order
	h.mu.Unlock()

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(order)
}

func (h *Handlers) GetAllOrders(w http.ResponseWriter, r *http.Request) {
	h.mu.RLock()
	defer h.mu.RUnlock()

	var orderList []models.Order
	for _, o := range h.orders {
		orderList = append(orderList, o)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(orderList)
}

func init() {
	rand.Seed(time.Now().UnixNano())
}
