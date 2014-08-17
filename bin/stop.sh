#!/bin/sh
# darryl.west@raincitysoftware.com
# 2014-08-17
#

// TODO - replace with background runner

PID=`cat process.pid`

echo "stopping process, PID = $PID..."
kill -2 $PID

