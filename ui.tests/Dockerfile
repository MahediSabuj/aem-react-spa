FROM node:14-slim

ENV APP_PATH /usr/src/app
ENV SELENIUM_STARTUP_TIMEOUT 60

# Begin CloudManager Convention >>>
ENV SELENIUM_BASE_URL http://localhost:4444
ENV SELENIUM_BROWSER chrome
ENV REPORTS_PATH reports
ENV AEM_AUTHOR_URL http://localhost:4502
ENV AEM_AUTHOR_USERNAME admin
ENV AEM_AUTHOR_PASSWORD admin
ENV AEM_PUBLISH_URL http://localhost:4503
ENV AEM_PUBLISH_USERNAME admin
ENV AEM_PUBLISH_PASSWORD admin
# Following convention variables are null by default
# ENV SHARED_FOLDER
# ENV UPLOAD_URL

RUN apt -qqy update \
  # Generic dependencies
  && apt -qqy --no-install-recommends install \
  python \
  build-essential \
  # for wait_for_grid script
  && apt -qqy --no-install-recommends install \
  curl \
  jq
# <<< End CloudManager Convention

# Set Application Environment
WORKDIR ${APP_PATH}

# Copy + Install WDIO project
ENV TEST_RUN_COMMAND "npm run test-cloud"
COPY test-module/ ./
RUN npm ci

# Begin CloudManager Convention >>>
COPY wait-for-grid.sh .
RUN chmod 555 wait-for-grid.sh

CMD ./wait-for-grid.sh ${TEST_RUN_COMMAND}
# <<< End CloudManager Convention
