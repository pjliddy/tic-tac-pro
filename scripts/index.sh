#!/bin/bash

curl  "http://localhost:4741/games" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN"\

# {
#  "game":
#    {
#      "id":6,
#      "cells":["","","","","","","","",""],
#      "over":false,
#      "player_x":{"id":2,"email":"pjliddy@gmail.com"},
#      "player_o":null
#    }
#  }
