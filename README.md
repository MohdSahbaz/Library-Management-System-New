# Library Management System (LMS)

## Overview
The Library Management System (LMS) is a web-based application designed to help libraries manage their books, users, and borrowing activities efficiently. It includes features for book management, user management, and transaction tracking.

## Features
- **User Authentication**: Secure login and registration for users.
- **Book Management**: Add, edit, delete, and search books.
- **User Management**: Manage library members and their borrowing history.
- **Borrow & Return System**: Track borrowed books and their due dates.
- **Pending & Borrowed Books**: List of books that are currently borrowed or pending return.
- **Monochrome Theme**: A black, gray, and white theme applied across the UI.

## Technologies Used
- **Frontend**: React (with a monochrome theme applied)
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT-based authentication
- **Styling**: Tailwind CSS

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (latest LTS version)
- MongoDB

### Steps to Set Up
1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-repo/lms.git
   cd lms
   ```
2. **Install Backend Dependencies**
   ```sh
   cd backend
   npm install
   ```
3. **Set Up Environment Variables**
   Create a `.env` file in the backend directory and add:
   ```sh
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. **Start the Backend Server**
   ```sh
   npm run dev
   ```
5. **Install Frontend Dependencies**
   ```sh
   cd ../frontend
   npm install
   ```
6. **Start the Frontend**
   ```sh
   npm start
   ```

## Usage
- Register/Login as a user.
- Admin can add, edit, or delete books.
- Users can browse books and borrow available copies.
- Books marked as 'borrowed' are tracked in the system until returned.

## Future Enhancements
- **Admin Dashboard** for detailed reports.
- **Notifications** for due dates.
- **Improved Search & Filtering** for book listings.

## Contributing
Feel free to submit issues or pull requests to improve this project.

## License
This project is licensed under the MIT License.

