# 🧱 Brick Builder Challenge V3

A child-friendly web app for the moment a kid sits in front of a pile of bricks with no idea what to build. Pick a category, hit the randomiser, and get a build challenge. A Parent Mode keeps track of what's been saved and completed.

## 🚀 How to Run Locally

### The Easiest Way (Windows)
1. Simply double-click on the `start.bat` file in this folder.
2. It will automatically install any missing dependencies and open the game in your default web browser!

### The Manual Way (Terminal/Command Prompt)
If you prefer using the command line:

1. **Open your terminal** and navigate to the project folder.
2. **Install the required dependencies** (just Flask):
   ```bash
   pip install -r requirements.txt
   ```
3. **Run the application**:
   ```bash
   python app.py
   ```
4. **Open your browser** and go to: `http://127.0.0.1:5000`

## 🛠️ Features
- **Premium Mission Console**: A highly styled, fully responsive hero interface.
- **Dynamic Category Selection**: Tactile, chunky 3D buttons that physically compress when clicked.
- **Challenge Randomizer**: Complete with a dramatic loading sequence and celebratory confetti on completion.
- **Parent Mode**: A clean administrative dashboard to track progress and easily reset the state.

## 💾 Data Storage
All user progress (Saved and Completed missions) is stored entirely locally within the `data.json` file. No internet connection is required after you've run it for the first time!
