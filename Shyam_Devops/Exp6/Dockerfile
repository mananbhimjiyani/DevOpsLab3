FROM python:3.13.5

WORKDIR /app
COPY app.py .
RUN pip install flask

EXPOSE 8081
CMD ["python", "app.py"]