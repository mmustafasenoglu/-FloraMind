#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

# Run database migrations
echo "Apply database migrations"
python manage.py migrate

# Seed data
echo "Seeding data..."
python seed_data.py || echo "Seeding failed or already done"

# Start server
echo "Starting server"
exec "$@"
