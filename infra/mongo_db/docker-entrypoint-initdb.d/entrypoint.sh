#!/bin/bash
set -e

mongo <<EOF
use admin
db.createUser({
  user: 'root',
  pwd: 'password',
  roles: [
    { role: 'userAdminAnyDatabase', db: 'admin' },
    { role: 'readWriteAnyDatabase', db: 'admin' }
  ]
})
EOF

exec "$@"
