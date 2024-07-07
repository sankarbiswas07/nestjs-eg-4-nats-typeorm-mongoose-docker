#!/bin/bash

# Wait for the MySQL service to be fully up
echo "Waiting for MySQL to start..."

# until mysql -uroot -ptest_123 -e "SELECT 1" &> /dev/null; do
#   echo "MySQL is unavailable - sleeping for 2 sec"
#   sleep 2
# done

# Initialize the database and set permissions
echo "Setting up MySQL permissions..."
sleep 30

mysql -u test_user -ptest_pwd <<EOF
CREATE DATABASE IF NOT EXISTS orders_management;
GRANT ALL PRIVILEGES ON orders_management.* TO 'test_user'@'%' IDENTIFIED BY 'test_pwd';
FLUSH PRIVILEGES;
EOF

# Start the NestJS application in development mode
echo "MySQL privileges grant done..."
# Keep the container running after the setup
# tail -f /dev/null