#!/bin/bash

set -e
set -v

# Static checks
yarn lint
yarn build
