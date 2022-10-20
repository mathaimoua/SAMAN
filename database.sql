CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "access_level" INT DEFAULT 0
);

CREATE TABLE "locations" (
    "location_id" SERIAL PRIMARY KEY,
    "location_name" VARCHAR (255)NOT NULL,
    "user_id" INT REFERENCES "user",
    "isActive" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "containers" (
    "container_id" SERIAL PRIMARY KEY,
    "container_name" VARCHAR(255) NOT NULL,
    "location_id" INT REFERENCES "locations"
);

CREATE TABLE "items" (
    "item_id" SERIAL PRIMARY KEY,
    "item_name" VARCHAR(255) NOT NULL,
    "user_id" INT REFERENCES "user",
    "current_holder" VARCHAR(255),
    "container_id" INT REFERENCES "containers",
    "model" VARCHAR(255),
    "serial" VARCHAR(255),
    "warranty_expiration" DATE NOT NULL DEFAULT CURRENT_DATE,
    "state" VARCHAR(255) NOT NULL DEFAULT 'IN STOCK',
    "date_added" DATE NOT NULL DEFAULT CURRENT_DATE,
    "description" VARCHAR(1000), DEFAULT ''
);