#!bin/bash

curl "https://tic-tac-toe-wdi.herokuapp.com/sign-in" \
--include \
--request POST \
--header "Content-type: application/json" \
--data '{
  "credentials": {
    "email": "'"${EMAIL}"'",
    "password": "'"${PASSWORD}"'"
  }
}'

echo
echo
