#!/bin/bash

# wait-for-grid.sh
set -e

cmd="$@"

# Remove trailing slash
SELENIUM_BASE_URL=${SELENIUM_BASE_URL%/}

while ! (curl -sSL "${SELENIUM_BASE_URL}/wd/hub/status" 2>&1 \
        | jq -r '.value.ready' 2>&1 | grep "true" >/dev/null) && [[ "$SECONDS" -lt ${SELENIUM_STARTUP_TIMEOUT} ]]; do
    echo 'Waiting for the Grid'
    sleep 1
done

>&2 echo "Selenium Grid is up - executing tests"

exec $cmd
