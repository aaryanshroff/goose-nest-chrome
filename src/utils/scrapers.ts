/**
 * Scrape listings from the Facebook Marketplace page currently active in the browser tab.
 *
 * This function assumes that the active tab is displaying the Facebook Marketplace
 * with listings present. It searches for a collection element that is expected to
 * contain the Marketplace items and extracts information from each listing link.
 *
 * If the expected collection element is not found or an error occurs during the scraping process,
 * the function will log the error and return null.
 */
export function scrapeFacebookMarketplace(): Array<Listing> | null {
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