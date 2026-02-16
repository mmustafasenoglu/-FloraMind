#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate

# Seed data automatically on every build (since SQLite is ephemeral on Render free tier)
python seed_data.py
