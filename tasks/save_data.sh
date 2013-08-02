#!/bin/bash

# load rvm
source /home/pi/.rvm/environments/ruby-2.0.0-p195@pi_box

# do the task
cd /home/pi/projects/pi_box && ruby ./tasks/save_data.rb
