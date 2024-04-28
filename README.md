# Running the app

To run the app locally you will need to add a .env file to the root directory with the key `NEXT_PUBLIC_VISUAL_CROSSING_API_KEY=yourApiKey`.

# Architectural choices

I used a css pseudo element to display the loading spinner on all the cards when the app is in ‘pending’ state (awaiting a response from the Visual Crossing api). Also to display the `...` empty state when there is no data. I thought this was better than the cards just disappearing then snapping back into view when data loads.

I added a slight hover effect to the buttons and disabled the form button while the app is in ‘pending’ state.

I have styled the temperature scale buttons to make it clear what scale (celsius or fahrenheit) is active.

I used css grid to display the rows of cards dynamically to work on screen sizes with a minimum width of 350px. With more time I would have created prototypes in Figma of mobile and tablet views and used these to set more specific responsive styles.

With more time I would also save the last searched location to localstorage. For example, the app loads with the weather for Brighton as default. The user searches for ‘New York’ and the app successfully fetches the data. The user closes the browser. When they next open the browser the app would fetch the New York data on initial render.

# Data sanitisation & validation

I wrote a sanitizeString function to strip whitespaces and HTML tags from the search input value before passing it to the fetch().
I decided to display the resolved address from the api response in the sidebar card so it is clear what location the API returned from the users request. For example, misspelling Brighton and Brighon resolves to Brighton, New Brunswick in Canada.
I added the .env file to the .gitignore file.

# Accessibility

Alt tags added to all Images.
I have ensured the user can submit the form by pressing the ‘Enter’ key.
The value of the <title> element of the web page updates to reflect error, pending or success state of the form.
I have added the aria-labelledby attribute to the input.
As much as possible I have used semantic html. For example, the sidebar is an <aside> element and each group of cards in the <main> part of the app are wrapped in <section>.

# Potential performance bottlenecks and optimisations

I have used the Next.js image component for optimization.
I have deployed the app to GitHub pages for hosting and public access.
The Figma prototype only had 4 weather images. With more time I would have requested or found more images (for example a cloudy image) to display more specific images in the app. For now I am using the ‘Partly cloudy day’ image as the default/fallback image.

# High fault tolerance

I looked at the API documentation to see if there is a route that returns all valid locations that api accepts. It does not exist. However, if it did I could have used this array of data to have a <select> input so the user has to choose an option from this list of valid locations as opposed to typing any string into the input.
