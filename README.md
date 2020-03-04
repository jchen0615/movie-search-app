This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Quick Intro
This web application is a personal project for the sole puporse of practicing React. It is in no way intended for any profit-making.
Please feel free to leverage any code as you would like.

In short, this web app leaverages React and React-Router-Dom to implement a single-page web application with a multi-page feeling.
Axios is being used in regards of sending HTTP requests to The Movie Database (TMDB) API to retrieve information regarding movies.


### Features
Home page
- After running 'npm start' in the terminal, navigate to 'http://localhost:3000', where the homepage of this application will be located. There is a navigation bar located at the top of the page at all time to ensure users can navigate through pages as they would like. Located right below the navigation bar is a search input that takes keywords as parameters and query for any matching movies. Below that, we are showing some popular movies as well as movies that are now playing in theater. By clicking on any movies, it will redirect user to a page with more detailed information for that particular movie.
![Image description](https://github.com/jchen0615/movie-search-app/blob/master/public/images/homepage.PNG)

Search
- Enter any parameter in the search input and hit enter or click the magnifying icon will redirect user to a new page that displays search result relevant to the input. Scroll to the bottom of the page to navigate through pages. Clicking on any movies will redirect user to a page with more detailed information for that particular movie.
![Image description](https://github.com/jchen0615/movie-search-app/blob/master/public/images/search.PNG)

Genre
- Hovering over 'Genre' in the navigation bar will allow users to browse and select different genres. Click on any genre will redirect user to a new page displaying only movies classified as that genre. Clicking on any movies will redirect user to a page with more detailed information for that particular movie.
![Image description](https://github.com/jchen0615/movie-search-app/blob/master/public/images/genre.PNG)
*Notice the movie being hovered over is slightly enlarged and brightened.

Now Playing
- Clicking 'Now Playing' in the navigation bar will allow users to browse movies currently playing in theater in US region. Clicking on any movies will redirect user to a page with more detailed information for that particular movie.

Detail page
- On the detail page for movies, general information such as poster, duration, released date, overview, etc. will be displayed. A playable trailer will also be presented if it was available. Reviews will also be displayed if avaialble, as well as a list of similar movies at the bottom. As always, clicking on any movies will redirect user to a page with more detailed information for that particular movie. There is also a 'back' button located on top left of the page that allows user to return to the previous page.
![Image description](https://github.com/jchen0615/movie-search-app/blob/master/public/images/detail1.PNG)
![Image description](https://github.com/jchen0615/movie-search-app/blob/master/public/images/detail2.PNG)
![Image description](https://github.com/jchen0615/movie-search-app/blob/master/public/images/detail3.PNG)
