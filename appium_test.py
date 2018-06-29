import os
import time
from appium import webdriver

driver = webdriver.Remote(
    command_executor='http://127.0.0.1:4723/wd/hub',
    desired_capabilities={
        'app': os.path.expanduser('./android/app/build/outputs/apk/release/app-release-unsigned.apk'),
        'platformName': 'Android',
        'deviceName': 'Nexus 5 API 27',
    })

# wait for app to load
time.sleep(10)

apollo_root = driver.find_element_by_accessibility_id('Start Discovering')
apollo_root.click()

time.sleep(10)

# important; you will not be able to launch again if this does not happen
driver.quit()
