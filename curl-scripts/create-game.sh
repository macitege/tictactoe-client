#!bin/bash

curl "https://tic-tac-toe-wdi.herokuapp.com/games/" \
--include \
--request POST \
--header "Authorization: Token token=${TOKEN}" \
--header "Content-type: application/json" \
--data '{}'

echo
