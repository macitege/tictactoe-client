
curl "https://tic-tac-toe-wdi.herokuapp.com/change-password" \
--include \
--request PATCH \
--header "Content-type: application/json" \
--header "Authorization: Token token=${TOKEN}" \
--data '{
  "passwords": {
    "old": "'"${OLD}"'",
    "new": "'"${NEW}"'"
  }
}'

echo
echo
