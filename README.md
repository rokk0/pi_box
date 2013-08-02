Run webcam stream (http://device_ip:8080/stream_simple.html):

/home/pi/projects/pi_box/tasks/mjpg-streamer-r63/mjpg_streamer -i '/home/pi/projects/pi_box/tasks/mjpg-streamer-r63/input_uvc.so -d /dev/video0 -r 1280x960 -f 1' -o '/home/pi/projects/pi_box/tasks/mjpg-streamer-r63/output_http.so -w /home/pi/projects/pi_box/tasks/mjpg-streamer-r63/www -p 8080 -c login:password'



Cron tasks for sensor data gathering, taking webcam snapshots:

/home/pi/projects/pi_box/tasks/save_data.sh > /home/pi/projects/pi_box/tasks/save_data_log.txt 2>&1

/home/pi/projects/pi_box/tasks/take_snapshot.sh > /home/pi/projects/pi_box/tasks/take_snapshot_log.txt 2>&1


https://gist.github.com/MendelGusmao/5398362 - autostart script for BitTorrent sync.
