CREATE TABLE "api_key_requests" (
  "id" SERIAL NOT NULL,
  "api_key_id" INTEGER,
  "user_id" INTEGER,
  "created_at" TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "PK_api_key_requests_id" PRIMARY KEY ("id"),
  CONSTRAINT "FK_api_key_requests_api_key_id" FOREIGN KEY ("api_key_id") REFERENCES "api_keys"("id") ON DELETE SET NULL,
  CONSTRAINT "FK_api_key_requests_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL
);
