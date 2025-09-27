from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()
driver.get("https://the-internet.herokuapp.com/add_remove_elements/")

# Click 'Add Element' button
add_button = driver.find_element(By.XPATH, "//button[text()='Add Element']")
add_button.click()
time.sleep(1)

# Click the new 'Delete' button
delete_button = driver.find_element(By.CLASS_NAME, "added-manually")
delete_button.click()
time.sleep(1)

driver.quit()
