# whodis

Fill in  keys in `.env`

Run with `node ear.js`

Uncomment at bottom of `ear.js`
```
// sounds.forEach( (s) => {
//   ear(s);
// });
```
and comment out
```
getPastEvent(sounds[0]).then( u => {
  mapData(u);
});
```

to run in subscribed and listening mode
