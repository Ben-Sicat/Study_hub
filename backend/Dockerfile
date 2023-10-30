FROM python:3.8

WORKDIR /app

COPY app.py .
COPY venv venv

COPY requirements.txt .
RUN pip install --upgrade flask
RUN pip install --upgrade werkzeug
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000


CMD ["python", "app.py"]
