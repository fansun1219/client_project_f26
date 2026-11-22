const filterPanel = document.getElementById("resource-filter");

if (filterPanel) {
    const searchInput = document.getElementById("resource-search");
    const clearButton = document.getElementById("clear-resource-search");
    const resourceList = document.getElementById(searchInput.getAttribute("aria-controls"));
    /* Source for reading the target list ID: https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute */
    const resources = resourceList.querySelectorAll("li");
    const resultCount = document.getElementById("resource-count");

    function filterResources() {
        const keyword = searchInput.value.trim().toLowerCase();
        let matches = 0;

        for (let i = 0; i < resources.length; i++) {
            const text = resources[i].textContent.toLowerCase();
            const isMatch = text.includes(keyword);
            resources[i].hidden = !isMatch;

            if (isMatch) {
                matches++;
            }
        }
        /* Filtering approach: https://www.w3schools.com/howto/howto_js_filter_lists.asp */
        /* Source for text matching: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes */
        /* Source for hiding unmatched items: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/hidden */

        resourceList.hidden = matches === 0;

        if (matches === 0) {
            resultCount.textContent = "No matching resources. Try another keyword or clear the filter.";
        } else if (matches === 1) {
            resultCount.textContent = "1 resource shown.";
        } else {
            resultCount.textContent = matches + " resources shown.";
        }
    }

    searchInput.addEventListener("input", filterResources);
    clearButton.addEventListener("click", function () {
        searchInput.value = "";
        filterResources();
        searchInput.focus();
    });
    /* Source for input events: https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event */

    filterResources();
    filterPanel.hidden = false;
}
