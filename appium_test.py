import os
import time
from appium import webdriver

driver = webdriver.Remote(
    command_executor='http://127.0.0.1:4723/wd/hub',
    desired_capabilities={
        'app': os.path.expanduser('~/Downloads/app-release.apk'),
        'platformName': 'Android',
        'deviceName': 'Nexus 5 API 27',
    })

# wait for app to load
time.sleep(10)

apollo_root = driver.find_element_by_accessibility_id('root-view')
print(apollo_root)

# find the link with the text "Click here" and click on it
link = driver.find_element_by_xpath('//*[@text="Click Here"]')
link.click()

# wait for the next screen to load
time.sleep(10)

# make sure the correct "Success" result is on the page
driver.find_element_by_xpath('//*[@text="Success"]')

# important; you will not be able to launch again if this does not happen
driver.quit()
