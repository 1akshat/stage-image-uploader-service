# Express.js Image Uploader (STAGE)

This is a simple Express.js application for uploading and compressing images. It utilizes AWS S3 for storing compressed images.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Dockerization](#dockerization)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js (version 14 or higher)
- npm (Node.js package manager)
- Docker (optional, for Dockerization)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/1akshat/stage-image-uploader-service.git
   ```

2. **Install dependencies::**

   ```bash
   cd stage-image-uploader-service
   npm install
   ```

3. **Run the application:**

   ```bash
   npm start
   ```

4. **Access the application at http://localhost:3000.**
   The application is also publicly hosted at http://3.95.180.42/.

## Configuration

1. **Configure the application by updating the .env file. Example:**
   ```
   S3_BUCKET_NAME=your-s3-bucket-name
   ```

## Usage

1. Upload an image:
   Make a _POST_ request to `/v1/images/upload`.

2. List all uploaded files:
   Make a _GET_ request to `/v1/list/list-files`.

## API Endpoints

- _POST_ `/v1/images/upload`: Upload and compress an image.
- _GET_ `/v1/list/list-files`: List all uploaded files.

## Dockerization

Dockerize the application for easy deployment. Example commands:

```bash
docker build -t stage-image-uploader .
docker run -p 3000:3000 -d stage-image-uploader
```

## Potential Improvements

- Database Integration: Introduce a database to store meta information about uploaded images, including user mappings.

## Contributing

Feel free to contribute by opening issues or pull requests. See CONTRIBUTING.md for details.

## License

This project is licensed under the MIT License.

## Tracking

- [x] Write tests for your application.

- [x] Dockerization: Containerize the application so that it can be run locally using Docker.

- [x] CI/CD Pipeline: Implement a CI/CD pipeline using tools like Jenkins, GitHub Actions, or GitLab CI. The CD pipeline should deploy the application to whatever hosting provider you choose to host your service.
