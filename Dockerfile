FROM mcr.microsoft.com/azure-functions/node:4-node16 AS build
ARG NPM_TOKEN

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__isEnabled=true
  
COPY . /home/site/wwwroot

WORKDIR /home/site/wwwroot
RUN cd /home/site/wwwroot

RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc && \
    npm install && \
    rm -f .npmrc

RUN npm run build

FROM mcr.microsoft.com/azure-functions/node:4-node16
WORKDIR /home/site/wwwroot

COPY --from=build /home/site/wwwroot /home/site/wwwroot

