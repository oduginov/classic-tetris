# Classic tetris

## Scoring

[Original Nintendo scoring system](https://tetris.fandom.com/wiki/Scoring) is implemented.
Distribution of points depends on the level `n` and it is defined as follows: `40 * (n + 1)` 
for one burned line, `100 * (n + 1)` for two burned lines, `300 * (n + 1)` for three burned 
lines and `1200 * (n + 1)` for the tetris, i.e four burned lines.

## Development
1. Install dependencies
    ```
    npm install
    ```
1. Run webpack
    ```
    npm run build
    ```
