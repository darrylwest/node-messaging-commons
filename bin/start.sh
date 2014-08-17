#!/bin/sh
# dpw@alameda.local
# 2014-08-17
#

cd app
nohup node app.js --env development > ../messaging-commons.log 2>&1 &

PID=$!

echo $PID > ../process.pid

echo "logger-message running, PID = $PID..."

