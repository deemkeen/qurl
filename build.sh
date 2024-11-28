#!/bin/bash

go install

go build -ldflags="-s -w"
