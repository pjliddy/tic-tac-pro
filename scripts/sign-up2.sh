#!/bin/bash

curl --include --request POST https://ga-wdi-boston.herokuapp.com/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "user@gmail.com",
      "password": "pass",
      "password_confirmation": "pass"
    }
  }'
