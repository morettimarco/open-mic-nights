// Importing necessary modules from react, react-dom and local files
import React from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles.css";
import TableAndMap from "./TableAndMap";
import NavigationBar from "./NavigationBar";
import { useTranslation } from "./i18n";

// Constants for GitHub and Google Sheets URLs
const GitHubURL = "https://github.com/morettimarco/open-mic-nights";
const SpreadsheetId = "1_X_znvg8kGbFMXoys011182T5ZTGONCsveY9uLEWsr8";
const SpreadsheetURL =
  "https://docs.google.com/spreadsheets/d/" + SpreadsheetId;

// Main App component
function App() {
  const { t } = useTranslation();
  
  // Process Q&A objects with translations and URLs
  const qna = t.qna.map((qa, index) => {
    // Add appropriate URLs and formatting based on the question index
    let answer;
    switch(index) {
      case 0:
        answer = (
          <p>
            {qa.answer.split('Git repo!')[0]} <a href={GitHubURL}>Git repo</a>! {qa.answer.split('Git repo!')[1]}
          </p>
        );
        break;
      case 1:
        answer = (
          <p>
            {qa.answer.split('Google Sheet')[0]} <a href={SpreadsheetURL}>Google Sheet</a>.
          </p>
        );
        break;
      case 2:
        answer = (
          <p>
            {qa.answer.split('London Standup Comedy Map')[0]}{" "}
            <a href="https://apuchitnis.github.io/open-mic-nights/">
              London Standup Comedy Map
            </a>{" "}
            {qa.answer.split('London Standup Comedy Map')[1].split('Apu Chitnis')[0]}{" "}
            <a href="https://apuchitnis.github.io/">Apu Chitnis</a>{" "}
            {qa.answer.split('Apu Chitnis')[1]}
          </p>
        );
        break;
      default:
        answer = <p>{qa.answer}</p>;
    }
    
    return {
      question: qa.question,
      answer: answer,
    };
  });

  // Render the NavigationBar, TableAndMap, and Q&A sections
  return (
    <>
      <NavigationBar />

      <TableAndMap />

      <div className="section">
        <div className="container">
          <div className="columns is-vcentered">
            {qna.map((qa) => {
              return (
                <div className="column" key={qa.question}>
                  <div className="card">
                    <div className="card-header">
                      <div className="card-header-title">{qa.question}</div>
                    </div>
                    <div className="card-content">
                      <div className="content">{qa.answer}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

// Get the root element from the HTML
const rootElement = document.getElementById("app");
// Console warnings are now handled in CustomGoogleMap.js

// Create a root using createRoot API (React 18)
const root = createRoot(rootElement);
// Render the App component
root.render(<App />);
