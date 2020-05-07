import os
import time

interval = 4
execute_dir = 'C:/Program Files/MongoDB/Server/4.2/bin/'
# output_dir = 'C:/Program Files/MongoDB/Server/4.2/dump'


def run_backup():
    command = "mongodump"
    # command += " --out=" + output_dir + time.strftime("%d-%m-%Y-%H:%M:%S")
    print("mongo backup progress started")
    os.chdir(execute_dir)
    os.system(command)
    return


while True:
    run_backup()
    time.sleep(interval * 3600)
