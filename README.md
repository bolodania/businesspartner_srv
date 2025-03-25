# Business Partner Service

This repository contains a **Cloud Application Programming (CAP)** project designed to manage Business Partner data. The project is structured to follow SAP's recommended layout for CAP applications.

## Project Structure

- `db/`: Contains domain models and data definitions.
- `srv/`: Houses service definitions and implementation logic.
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `README.md`: This document.
- `eslint.config.mjs`: Configuration for ESLint to maintain code quality.
- `mta.yaml`: Multi-Target Application (MTA) deployment descriptor.
- `package.json`: Project metadata and configuration.

## Getting Started

To set up and run this project locally:

1. **Install Dependencies**: Ensure you have [Node.js](https://nodejs.org/) installed. Then, run:
   ```bash
   npm install
   ```

2. **Start the Development Server**: Launch the CAP server using:
   ```bash
   cds watch
   ```
   This command watches for changes and restarts the server automatically.

3. **Access the Application**: Open your browser and navigate to `http://localhost:4004` to interact with the services.

## Next Steps

- Begin adding content, such as defining your domain models in `db/schema.cds`.
- Implement service logic within the `srv/` directory.

## Learn More

For comprehensive guidance on SAP's Cloud Application Programming Model, visit the [official documentation](https://cap.cloud.sap/docs/get-started/).