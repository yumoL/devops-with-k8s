import time, uuid
from datetime import datetime

if __name__ == "__main__":
    string = str(datetime.now()) + ": " + str(uuid.uuid4())
    while True:
        print(string)
        time.sleep(5)