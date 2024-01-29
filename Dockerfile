# Parent Image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependecies
RUN npm install

# Bundle app source
COPY . .

# Expose the port for the app to run on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
