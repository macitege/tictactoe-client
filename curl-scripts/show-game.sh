#!bin/bash

curl "https://tic-tac-toe-wdi.herokuapp.com/games/${ID}" \
--include \
--request "GET" \
--header "Content-type: application/json" \
--header "Authorization: Token token=${TOKEN}" \

echo
echo
