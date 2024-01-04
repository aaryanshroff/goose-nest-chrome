function performScraping() {
  try {
    console.log("Scraping...");
    const collectionElement = document.querySelector(
      '[aria-label="Collection of Marketplace items"]'
    );
    if (!collectionElement) {
      throw new Error("Collection element not found");
    }

    // Collect links and texts within the collection element
    const linkElements = collectionElement.querySelectorAll("a");
    const entries = Array.from(linkElements).map((element) => element.text);
    const hrefs = Array.from(linkElements).map((element) =>
      element.getAttribute("href")
    );

    console.log(entries);
    console.log(hrefs);

    // Send the data back to the background script
    chrome.runtime.sendMessage({ entries, hrefs });
  } catch (error) {
    console.error("Error during scraping:", error);
  }
}

performScraping();
