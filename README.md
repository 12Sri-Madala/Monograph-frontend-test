## Getting started
- Clone the repo
- Install dependencies: `yarn install`
- Make sure the app runs: `yarn start`

Design Reference: [Figma File](https://www.figma.com/file/jjqRhIa54hOakjjAWkpbmC/Take-home-frontend-test?node-id=0%3A1)

## My Design
How to express human emotion after dining at a restaurant?

With the increasing usage of emojis (5 billion are sent every day on messenger according to facebook) this has become our main way of conveying emotion behind plain old text. However, I believe that emojis do not capture the entirety of our emotion. Emotions are complex systems based on our culture, language, and context. Using emojis reduces our feelings to predictable strings of data and defaulting to the basic universal reactions of happiness, sadness, fear, disgust, anger, and surprise hampers our ability to develop emotional skills. For these reasons I went with giving users the ability to attach a gif to their review. There are thousands of gifs for every keyword and while they are all created to encapsulate that word what they convey can be vastly different. The visceral reaction we have when we look at some gifs can not be replicated by looking at a similar emoji. I connected with the Giphy API which generates 2 gifs every time the user enters a keyword (default: Tasty). Due to the limitations of the API I am only able to offset the results to generate new gifs but am not able to randomize the results from their database. Doing this was not without its challenges as I ran into a CORS issue. I used an npm package "http-proxy-middleware" to setup a proxy and ran my api call through that. I also used a highly downloaded npm package to generate my emoji selector component. 

** Please install dependencies as I added a few **