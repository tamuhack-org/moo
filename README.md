# Moo - TAMUhack Static Site

You can visit the site at [https://tamuhack.com/](https://tamuhack.com/).

## Sitemap
- https://tamuhack.com/
- https://live.tamuhack.com/
- https://tamuhack.com/th
- https://tamuhack.com/th/live
- https://tamuhack.com/th/2023
- https://tamuhack.com/th/2022
- https://tamuhack.com/th/2021
- https://tamuhack.com/th/2020
- https://tamuhack.com/th/2019
- https://tamuhack.com/th/2018
- https://tamuhack.com/th/2016
- https://tamuhack.com/hh
- https://tamuhack.com/hh/2021
- https://tamuhack.com/hh/2020
- https://tamuhack.com/hh/2019
- https://tamuhack.com/hh/2018

## Powered by

* Our amazing [team](https://tamuhack.com#past-iterations)
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

1. Add a new class to [horizontal-timeline.css](https://github.com/tamuhack-org/moo/blob/master/static/styles/horizontal-timeline.css) with the `::after` selector. The naming convention for the class is ```{event-abbreviation}{year-abbreviation}```.
2. Fill out the event information in the Vue component in the [root index.html](https://github.com/tamuhack-org/moo/blob/master/index.html). 

Example:
```
{
  name: "TAMUhack 2020", // name of the event
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
    },
  ],
}
```
