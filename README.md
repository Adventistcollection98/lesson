# SDA Quarterly Lessons

A progressive web app (PWA) for accessing Seventh-day Adventist quarterly lesson materials with offline support.

## Features

- **Multiple Categories**: Adult Lessons, Children's Lessons, Mission Stories
- **Weekly Organization**: Browse lessons by week and day
- **Offline Access**: Full functionality available offline via Service Worker
- **Responsive Design**: Clean sidebar navigation interface

## Project Structure

```
lesson/
├── index.html      # Main application
├── app.js          # Core logic
├── sw.js           # Service Worker
└── data/           # Lesson data files
```

## Data Format

Lessons stored as JSON files in `/data/{category}/{quarter}.json`

**Adults/Children**:
```json
{
  "Lessons": {
    "1": {
      "Title": "Lesson Title",
      "Days": {
        "Sunday": "Study content...",
        "Monday": "Study content..."
      }
    }
  }
}
```

**Mission Stories**:
```json
{
  "Stories": {
    "1": {
      "Title": "Story Title",
      "Country": "Country Name",
      "Story": "Full story..."
    }
  }
}
```

## Usage

1. Open `index.html` in a web browser
2. Select a category (Adult, Children, or Mission)
3. Choose a week, then a day to view content
4. App works offline after initial load

## Technology

- HTML5, CSS3, Vanilla JavaScript
- Service Worker API for offline caching
- Fetch API for dynamic content loading

## License

Creative Commons Zero v1.0 Universal (CC0 1.0)
