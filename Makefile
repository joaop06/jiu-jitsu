.PHONY: up down reload

up:
	docker compose up --build -d

down:
	docker compose down

reload:
	docker compose up --build -d --force-recreate
