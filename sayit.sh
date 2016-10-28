#!/bin/bash

COUNTER=1
while [ $COUNTER -lt 1000000 ]; do
	say -v Vicki -f $1
	sleep 3;
done
