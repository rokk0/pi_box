#!/bin/bash

# load rvm
source /home/pi/.rvm/environments/ruby-2.0.0-p195@pi_box

ROOTDIR="/home/pi/reports"
MONTHDIR=`date +%Y-%m`
DATEDIR=`date +%Y-%m-%d`
TIME=`date +%Y%m%d_%H-%M-%S`

if [ ! -d $ROOTDIR/$MONTHDIR/$DATEDIR ] ; then
  mkdir -p $ROOTDIR/$MONTHDIR/$DATEDIR
  chmod -R 775 $ROOTDIR
fi

# do the task
cd /home/pi/projects/pi_box/tasks/ && ruby ./take_snapshot.rb $ROOTDIR/$MONTHDIR/$DATEDIR/$TIME.jpg
