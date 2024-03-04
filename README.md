# Speckle Code Challenge

Live version: https://speckle-challenge.vercel.app/

## Setup

To run the application run:

``` bash
npm install

# Production preview
npm run build
npm run preview
# Open http://localhost:4173/

# Dev Preview (Slower performance)
npm run dev
# Open http://localhost:5173/
```

## Guide

I'm using [Radix Vue](https://www.radix-vue.com/) for components like the dialog & the scroll view.

The main logic is inside [CommandPrompt](./src/components/CommandPrompt/)

The main component for the view is [CommandPromptView](./src/components/CommandPrompt/CommandPromptView.vue)

The filtering is done with [FastFuzzy](https://www.npmjs.com/package/fast-fuzzy) which is sometimes greedy with the returned results - This is a bit opinionated what you prefer there (strict vs fuzzy), I prefer fuzzy :)

The is some unnecessary boilerplate code from the template I've used like routing & storybook, please ignore.

## Specs

The prompt has a second view for the first entry point "Manage Members", all other points will log their item to the console.

- The Prompt can be opened via Cmd/Ctrl + K or via the button
- The Prompt can be closed via 
  - Cmd/Ctrl + K or via the button
  - Clicking the background
  - Escape
- You can go back to a previous view by either clicking the back button or pressing backspace when the input is empty
- The first item will always be selected when changing the filter, this is to ensure very quick navigation
- Items can be selected with either Enter or clicking them directly
- You can select prev/next items with up down arrows
    - Selecting the first/last item will wrap around going to the last/first item

## Things I would improve

- Move the logic into a separate file & add unit tests (I've already prepared for this by keeping logic functions state free so they can easily be tested, e.g.: `getNeighbor`)
- Async Items View fetching
- Debouncing the input (Could gain some more performance on larger lists)
- Virtualization (if possible, could be that it's very complicated due to the dynamic size of items)
