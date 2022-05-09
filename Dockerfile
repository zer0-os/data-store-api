FROM mcr.microsoft.com/azure-functions/node:4-node16

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__isEnabled=true
  
COPY . /home/site/wwwroot

WORKDIR /home/site/wwwroot
RUN cd /home/site/wwwroot
RUN npm i

RUN npm run build

