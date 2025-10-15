from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.common.by import By
import time

# Replace this with the actual path to your msedgedriver.exe
driver_path = r"D:\Assignments\DevOpsLab3\Onkar135_devops_lab\Unit Testing\msedgedriver.exe"
service = Service(driver_path)

# Start the Edge browser
driver = webdriver.Edge(service=service)

# Go to the portfolio site
url = "https://onkarmendhapurkar.vercel.app/"
driver.get(url)
time.sleep(2)  # Ensure the page loads properly

# Grab the main content of the page
# Using the body tag for simplicity, but you can target specific sections if needed
content = driver.find_element(By.TAG_NAME, "body").text

# Save the scraped content to a text file
output_file = "portfolio_content.txt"
with open(output_file, "w", encoding="utf-8") as file:
    file.write(content)

print(f"Page content successfully saved to: {output_file}")

# Clean up
driver.quit()
