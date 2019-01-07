#!bin/bash

curl "https://tic-tac-toe-wdi.herokuapp.com/games/${ID}" \
--include \
--request PATCH \
--header "Authorization: Token token=${TOKEN}" \
--header "Content-type: application/json" \
--data '{
  "game": {
    "cell": {
      "index": 0,
      "value": "x"
    },
    "over": false
  }
}'

echo
