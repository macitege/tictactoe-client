#!bin/bash

curl "https://tic-tac-toe-wdi.herokuapp.com/sign-out" \
--include \
--request DELETE \
--header "Content-type: application/json" \
--header "Authorization: Token token=${TOKEN}" \

echo
echo
