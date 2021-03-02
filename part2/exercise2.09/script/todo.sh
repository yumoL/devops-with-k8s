#!/bin/bash

final_url=$(curl -Ls -o /dev/null -w %{url_effective} $wiki_url)

echo $final_url

generate_post_data()
{
  cat <<EOF
{
  "content": "read $final_url"
}
EOF
}

curl --header "Content-Type: application/json" \
  --request POST \
  --data "$(generate_post_data)" \
  http://backend-svc:2345/todos