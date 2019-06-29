From node:11
maintainer Eric Lee

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
# ENTRYPOINT ["sh"]
CMD ["npm", "start"]
