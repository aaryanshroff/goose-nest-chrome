import { Listing } from "./types";


export function performScraping(): Array<Listing> | null {
  try {
    console.log("Scraping...");
    const collectionElement = document.querySelector(
      '[aria-label="Collection of Marketplace items"]'
    );

    // Ensure the collection element is not null and is an HTMLElement
    if (!(collectionElement instanceof HTMLElement)) {
      throw new Error("Collection element not found");
    }

    // Collect links within the collection element
    const linkElements = collectionElement.querySelectorAll("a");

    // Map each link element to an object with 'entry' and 'href' properties
    const listings = Array.from(linkElements).map((element) => ({
      raw_content: element.textContent || null,
      href: element.getAttribute("href") || null
    }));

    // Send the data back to the background script
    return listings

  } catch (error) {
    // Narrowing the error to an instance of Error to access the message property
    if (error instanceof Error) {
      console.error("Error during scraping:", error.message);
    } else {
      console.error("An unexpected error occurred during scraping.");
    }
    return null
  }
}