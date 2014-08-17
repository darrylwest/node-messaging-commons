#!/bin/sh
# darryl.west@raincitysoftware.com
# 2014-08-17
#

// TODO - replace with background runner
nohup node lib/app.js --env development > ../messaging-commons.log 2>&1 &

PID=$!

echo $PID > ../process.pid

echo "logger-message running, PID = $PID..."

