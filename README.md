# Employees-Management-System

## Build Command

```cmd
    rm -rf .venv && python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && pip install gunicorn flask python-dotenv && export FLASK_APP=server/app.py && rm -rf migrations && flask db init && flask db migrate -m "initial upgrade" && flask db upgrade head && python3 server/seed.py
```

## start command

```cmd
    gunicorn -w 4 server.app:app
```
