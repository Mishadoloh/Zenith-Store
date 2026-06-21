package models

type OrderItem struct {
	ProductID int     `json:"product_id"`
	Title     string  `json:"title"`
	Quantity  int     `json:"quantity"`
	Price     float64 `json:"price"`
}

type Order struct {
	ID          string      `json:"id"`
	CustomerName string      `json:"customer_name"`
	Email       string      `json:"email"`
	Address     string      `json:"address"`
	TotalAmount float64     `json:"total_amount"`
	Items       []OrderItem `json:"items"`
	Status      string      `json:"status"` // pending, processing, shipped
}
