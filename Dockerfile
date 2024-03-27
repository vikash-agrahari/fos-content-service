# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /src

RUN apk --no-cache add python3 py3-pip

RUN  pip3 install --upgrade pip \
  && pip3 install --no-cache-dir awscli

RUN aws --version

RUN aws s3 ls
RUN aws s3 cp s3://diabeticu-proto-files/dev /src/src/proto/ --recursive   
RUN cd /src/src/proto && ls -al

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install typescript@4.4.4 -g && npm install --force

# Copy the rest of the application code
COPY . .

# Expose the port on which the application will run
EXPOSE 8012 4012

# Build the project 
RUN npm run build

# Start the application
CMD [ "npm","run","start" ]
