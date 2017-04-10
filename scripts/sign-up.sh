#!/bin/bash

curl --include --request POST http://localhost:4741/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "user1@gmail.com",
      "password": "pass",
      "password_confirmation": "pass"
    }
  }'
