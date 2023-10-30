FROM python:3.8

WORKDIR /app

COPY app.py .
COPY venv venv

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000


CMD ["python", "app.py"]
