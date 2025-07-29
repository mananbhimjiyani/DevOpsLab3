# Use official Python image as base
FROM python:3.11-slim

# Set working directory inside the container
WORKDIR /flask-app

# Copy all project files from current directory to container workdir
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port (if using locally or Docker Compose)
EXPOSE 5000

# Run the app
CMD ["python", "app.py"]
