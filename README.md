# Moo - TAMUhack Static Site

You can visit the site at [https://tamuhack.org/](https://tamuhack.org/)

## Sitemap
- https://tamuhack.org/
- https://tamuhack.org/th
- https://tamuhack.org/th/2025
- https://tamuhack.org/th/2024
- https://tamuhack.org/th/2023
- https://tamuhack.org/th/2022
- https://tamuhack.org/th/2021
- https://tamuhack.org/th/2020
- https://tamuhack.org/th/2019
- https://tamuhack.org/th/2018
- https://tamuhack.org/th/2016
- https://tamuhack.org/hh
- https://tamuhack.org/hh/2025
- https://tamuhack.org/hh/2024
- https://tamuhack.org/hh/2023
- https://tamuhack.org/hh/2022
- https://tamuhack.org/hh/2021
- https://tamuhack.org/hh/2020
- https://tamuhack.org/hh/2019
- https://tamuhack.org/hh/2018

## Powered by

* Our amazing [team](https://tamuhack.org#past-iterations)
* Some truly innovative sponsors
* [![Vercel](./static/assets/powered-by-vercel.svg)](https://vercel.com?utm_source=tamuhack&utm_campaign=oss)

## Contributing

Branch naming convention:
```
{github-username}/{event-abbreviation}{year-abbreviation}-{addressing-issue}
```

Exmaples:
```
For the main TAMUhack page:
  cameronbrill/th-make-team-modular
For the TAMUhack 2021 landing page:
  cameronbrill/th21-add-rule-clarification
For the Howdy Hack 2018 landing page:
  cameronbrill/hh18-expand-description-guidelines
```

## Adding A New Timeline Event
In order to add a new timeline event, the code will need to be updated in two locations.

1. Add a new class to [horizontal-timeline.css](https://github.com/tamuhack-org/moo/blob/master/static/styles/horizontal-timeline.css) with the `::after` selector. The naming convention for the class is ```{event-abbreviation}{year-abbreviation}```. Make sure to set the correct logo as the background image.
2. Create a new info file in [`/past-hackathons-info`](./past-hackathons-info/). The naming convention is ```{event-abbreviation}{year-abbreviation}-info.js``` (e.g., `th25-info.js`)
3. Fill out the event information in the info file and export it as a constant.

Example:
```
const th20info = {
  name: "TAMUhack 2020", // name of the event
  link: "/th/2020", // link to the event website
  photos: "https://drive.google.com/drive/folders/1Sf_Zdt9knGTZcke8JuIMM2hu83t-OiE6", // link to the google photos folder
  logo: "th20", // class of the event that was added in step 1, does NOT include the ::after selector
  description: "The TAMUhack held in 2020." // description of the event
  directors: [
    {
      webp: "./static/assets/headshots/compressed/person-bw.webp", // webp file name and location, use this default value if needed
      img: "./static/assets/headshots/compressed/person-bw.jpg", // img file name and location; use this default value if needed
      name: "Director Cool Person", // name of director
      position: "President", // director position
      github: "github.com", // link to director's GitHub; OPTIONAL FIELD, do not include if DNE
      linkedin: "linkedin.com", // link to director's LinkedIn; OPTIONAL FIELD, do not include if DNE
      portfolio: "portfolio.com", // link to director's portfolio website; OPTIONAL FIELD, do not include if DNE
    },
  ],
}
```

4. Import this file as a script at the top of [`index.html`](./index.html). 

Example:
```
<script src="past-hackathons-info/th20-info.js"></script>
```

5. Add the name of the constant you created in step 3 to the Vue component at the bottom of the page under the data property "hackathons".
