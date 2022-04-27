# grassHeap 🦗

<span>
  <img src="https://camo.githubusercontent.com/f646c3e3c7d4fe15fc5db3cc925df80181948e6b20534a728fe7cc416453f2b5/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c616e67756167652d547970657363726970742d3331373843362e7376673f6c6f676f3d74797065736372697074" data-canonical-src="https://img.shields.io/badge/Language-Typescript-3178C6.svg?logo=typescript" style="max-width:100%;">
<img src="https://img.shields.io/badge/Powered%20by-React-5ED3F3.svg?logo=react"/>
<img src="https://img.shields.io/badge/Database-MongoDB-13AA52.svg?logo=mongodb"/>
<img src="https://img.shields.io/badge/Deployment-Live-green.svg?logo=github">
  </span>

A lot of task/to-do apps work on a timeframe of days or hours. On the other hand, gardening works in the timeframe of months. grassHeap is a **responsive Single-Page App**
that tracks and suggests tasks for the month and for the specific plants in your garden. Powered by the <a href="https://github.com/Growstuff/growstuff/wiki/API-Version-0"> GrowStuff API</a>.

You can view the app at https://www.grassheap.live/

<span>

  <img src="https://user-images.githubusercontent.com/78416008/141751379-aadda49f-55aa-446a-9744-434188f6e8d8.png" width=50%>
  <img src="https://user-images.githubusercontent.com/78416008/141751299-6b9be3ff-afac-4a5a-b6d6-8506dd811aaa.png" width=15%>

</span>
<br>
<span>
  <img src="https://user-images.githubusercontent.com/78416008/141751954-f158b601-7f7e-484b-bd2f-6406fe49932a.png" width=60%>
  <img src="https://user-images.githubusercontent.com/78416008/141751667-268e754a-1513-42f3-928a-5c93a8eddc95.png" width=15%>
</span>

## Features

- Displays a random gif based on results of weather API.
- Populates default tasks from database by relevant month and for your garden's plants. These tasks cannot be deleted.
- Pulls a list of plants and further details from the GrowStuff API (https://github.com/Growstuff/growstuff/wiki/API-Version-0).
- Allows you to save custom tasks to database and delete them.
- Works on desktop and mobile.

## ROADMAP

- [x] Styling Location Prompt.
- [x] General App styling.
- [x] Display showing MyPlants.
- [x] User Auth.
- [x] Search functionality.
- [ ] More detailed weather report.

## Running the App Locally

You will need a running instance of mongoDB

- Add a .env file according to .env-example format (you will need a free API key from <a target="_blank" rel="noopener noreferrer" href='https://openweathermap.org/api'>openweather</a> and from <a href='https://developers.giphy.com/docs/api#quick-start-guide' target="_blank" rel="noopener noreferrer" >GIPHY</a>
- Run `npm i` in the server and client folders.
- Run `npm start` in client.
- Run `npm start` in server.

  ( To see the full app, import some default tasks into your mongoDB grassHeap database, tasks collection using https://docs.google.com/spreadsheets/d/1XVkuqPTibBkkK4_KE3KlAV9ufz_iZ7O8Ly-iar14ybE/edit?usp=sharing )

## Contributors

Testing, TypeScript implementation and bug fixes by <a href="https://github.com/CalimeRon">@CalimeRon</a> and <a href="https://github.com/juan-calle/">@juan-calle</a> 🐛
