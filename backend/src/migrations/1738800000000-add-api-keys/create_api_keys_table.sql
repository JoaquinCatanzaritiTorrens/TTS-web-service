CREATE TABLE "api_keys" (
  "id" SERIAL NOT NULL,
  "key_hash" VARCHAR NOT NULL,
  "key_preview" VARCHAR(4) NOT NULL,
  "name" VARCHAR(100) NOT NULL,
  "user_id" INTEGER NOT NULL,
  "enabled" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMP NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "PK_api_keys_id" PRIMARY KEY ("id"),
  CONSTRAINT "UQ_api_keys_key_hash" UNIQUE ("key_hash"),
  CONSTRAINT "FK_api_keys_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
);
