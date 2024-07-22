# AI-Destination-Planner

AI-Destination-Planner is a web application designed to help users plan their trips by leveraging AI to suggest optimal destinations and itineraries. This project is built using React.js, Vite, Gemini AI, Firebase, and TailwindCSS.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **AI-Powered Recommendations**: Get personalized destination suggestions based on user preferences, powered by Gemini AI.
- **Interactive Itinerary Planning**: Easily create and manage your travel plans.
- **Dynamic User Interface**: Smooth and responsive UI built with React.js and styled using TailwindCSS and Gemini.
- **Real-time Data**: Utilize Firebase for real-time data synchronization and user authentication.
- **Fast Development**: Leveraging Vite for a fast and efficient development experience.

## Tech Stack

- **Frontend**: React.js
- **Build Tool**: Vite
- **UI Library**: Gemini, TailwindCSS
- **AI Integration**: Gemini AI for destination and itinerary suggestions
- **Backend**: Firebase for real-time data and authentication

## Installation

To get started with the AI-Destination-Planner, follow these steps:

1. **Clone the Repository**

    ```bash
    git clone https://github.com/yourusername/AI-Destination-Planner.git
    cd AI-Destination-Planner
    ```

2. **Install Dependencies**

    Ensure you have Node.js installed, then run:

    ```bash
    npm install
    ```

3. **Set Up Environment Variables**

    Create a `.env.local` file in the root directory of your project and add your Firebase and API keys:

    ```env
    VITE_RAPIDAPI_KEY=your_rapidapi_key
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_firebase_app_id
    ```

4. **Start the Development Server**

    ```bash
    npm run dev
    ```

    This will start the Vite development server and open the application in your default browser.

## Usage

- Navigate to `http://localhost:3000` in your browser to view the application.
- Use the AI-powered features to plan your trips and explore suggested destinations.
- Firebase integration provides real-time updates and authentication.
- Modify components and styles as needed in the `src` directory.

## Contributing

We welcome contributions to improve AI-Destination-Planner! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

Please ensure your code adheres to the project's coding standards and passes all tests before submitting a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README to better suit your project's specific details and requirements.
