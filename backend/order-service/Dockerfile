FROM golang:1.22-alpine AS builder

WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /order-service ./cmd/api

FROM alpine:latest

WORKDIR /
COPY --from=builder /order-service /order-service

EXPOSE 8081

CMD ["/order-service"]
