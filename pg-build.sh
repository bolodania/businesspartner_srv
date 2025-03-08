mkdir -p gen/pg/srv

cds compile '*' > gen/pg/srv/csn.json

cat <<EOF >gen/pg/package.json
{
"dependencies": {
    "@sap/cds": "*",
    "@cap-js/postgres": "*"
},
"scripts": {
    "start": "cds-deploy"
}
}
EOF