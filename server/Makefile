#to run the postgres container
postgresinit: 
	 sudo docker run --name postgres15 -p 5433:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=password -d postgres:15-alpine

#to run the postgres database
postgres:
	sudo docker exec -it postgres15 psql 

createdb:
	sudo docker exec -it postgres15 createdb --username=root --owner=root go-chat

dropdb:
	sudo docker exec -it postgres15 dropdb go-chat

migrateup:
	migrate -path db/migrations -database "postgresql://root:password@localhost:5433/go-chat?sslmode=disable" -verbose up

migratedown:
	migrate -path db/migrations -database "postgresql://root:password@localhost:5433/go-chat?sslmode=disable" -verbose down

.PHONY: postgresinit postgres createdb dropdb migrateup migratedown