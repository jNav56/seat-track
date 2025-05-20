# Seat Track

Seat Track is a minimalist mobile app designed to help users quickly access and manage stadium seat availability data. Built with performance and simplicity in mind, the app eliminates unnecessary distractions—no ads, images, or fluff—just fast and readable seat information.

## 🚀 Purpose

The core problem Seat Track solves is **streamlining the process of finding available seats** in a stadium. It focuses on:
- Extracting only **relevant API data** from event sites.
- **Avoiding clutter** like icons, media, or ads.
- Providing a clean, **mobile-first interface** for fast reading and decision-making.

## Screenshots

<img src="https://github.com/user-attachments/assets/83c19053-55f3-4fb0-b647-613fca6fbb67" width=250/>
<img src="https://github.com/user-attachments/assets/d3b241e4-be48-45d5-a5f0-37805da61432" width=250/>
<img src="https://github.com/user-attachments/assets/aed952f7-c05f-4148-9cf4-5c65c873887e" width=250/>
<img src="https://github.com/user-attachments/assets/378122c1-ce3f-4f93-bd32-8f46cc8d00f4" width=250/>

## Video
```
https://github.com/user-attachments/assets/8d48f4de-5fea-4342-bae7-8305bea4b5f9
```


## 🧭 App Flow

1. **Search and Navigate**
   - Enter a search term or link to access an event website via a built-in WebView.
   
2. **Listen for API**
   - The app monitors network traffic and identifies the correct seat availability API response.
   
3. **Store and Format**
   - Captured data is parsed and stored in a Redux store.
   - Data is then formatted for ease of use within the app.

4. **View and Interact**
   - Users can:
     - Browse available seats
     - Filter by seat type (e.g., standard, resale)
     - Sort by metrics (e.g., number of seats)
     - Categorize and view sections clearly

## 🛠️ Tech Stack

- **React Native** – Core framework for building the app
- **Expo** – Simplifies development, testing, and deployment
- **Redux Toolkit** – For state management of seat data and filters
- **TypeScript** – Ensures type safety and better code maintainability

## 📱 Features

- 🔎 Integrated WebView for in-app browsing
- 📡 Real-time API listener to extract data
- 🧠 Smart parsing and minimal data storage
- 🗂️ Sorting and filtering by seat attributes
- ⚡ Lightweight and responsive design

## 📁 Project Structure (Simplified)

```
/components # Reusable UI components
/app # App screens (WebView, Seat Viewer)
/store # Slices and store config
/controls # API response parsing and helpers
```

## 💡 Future Enhancements

- Bookmark favorite seat sections
- Export or share available seat data
- Add support for multiple stadium formats
