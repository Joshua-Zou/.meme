# .meme - the best file format for viewing memes

## why .meme?
 - the text outputs of .meme are NOT images. They are actual fonts rendered with chromium! This means that no matter how much you zoom in, the text will still be fine!
 - .meme uses LESS storage space, because only parts that are moving or need image formats get them! So captions are pure text, and not images.
 - can be rendered anywhere with a web browser! Or, even apps that are electron based!
## How to implement .meme in apps? (looking at you discord)
 - simply use the included renderer in the `index.js` file. Change all `"output"` fields to the id of the container where you would like the meme to be displayed! (there's 3)
 - Then, replace `evt.target.result` to the .meme file you would like to render (it's currently set up to allow for file uploads)
 - Then, add these css lines to your css file 
 ```css
 
 #output {
        background-color: grey;
        position: relative;
    }
    #output .child-elements{
        position: absolute;
        transform-origin: top left;
    }
 ```
 
 - and boom! You're done.


## Documentation
 
Every .meme file at it's core, is a big JSON file. This json file then must contain (at it's root) these elements
 - width (a number in pixels) - this is the total height of the meme
 - height (a number in pixels) - this is the total width of the meme
 - background (OPTIONAL) - the background of the meme **This *can* be left blank** - uses the [.meme image syntax](#meme-image-syntax)
 - elements (an array) - this is the array where you put all of your elements (text, images, gifs)

so far, we've got something like this 
```json
"width": 500,
  "height": 500,
  "background": "color(skyblue)",
  "elements": []
```

### element array

every element in the array is an object with these required parameters:

 - type (string) - this must be either `text`, `image`, or `gif`
 - x (number) - this is the x coordinate of the place where you would like to place the element
 - y (number) - this is the y coordinate of the place where you would like to place the element
 (note, the coordinate system is like the ones you learned in math class, so )
 - position (optional string) - the default is `bottom left` and tells the render which corner of the element to use as a reference when positioning with the X, Y coordinates 
 valid options are `top left`, `top right`, `bottom left`, `bottom right`, and `center`
 - z_index (optional string) - this lets you force elements to appear ontop or below each otehr see [this](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index) for more details
 - data (object) - this tells the renderer everything it needs to know about your element, and is different for every element type.
  <img src="https://sites.google.com/site/gruendingmath6/_/rsrc/1468743449298/unit-1---patterns-and-equations/1-5---plotting-points-on-a-coordinate-grid/first%20quadrant%20grid.gif">
  <br>
 so now, our json file looks something like this: 
 ```json
{
  "width": 500,
  "height": 500,
  "background": "color(skyblue)",
  "elements": [
    "type": "text",
      "x": 0,
      "y": 400,
      "width": 500,
      "height": 50,
      "data": {
      },
      "position": "top left",
      "z_index": 1
   ]
  }
 ```
 
 ### the data
  lastly, we need to tell the renderer what to do with the element. To do this, we add things to the `data` object. All types of elements have different parameters, so here's a quick rundown of all of them
  **for images**
  - base64 (required) - this is the base64 encoded image
  **for gifs**
   - base64 (required) - this is the base64 encoded gif
  **for text**
   - text (required) - this is the text you want displayed
   - mode (optional) - options: `innerText` and `innerHTML` with `innerHTML`, you can add `<br>`'s for line breaks, or anything. With `innerText`, your `<br>`'s will not do anything.
   - font (optional) - default is `impact` and this parameter allows you to change the font.
   - font_size (optional number) - font-size 
   - font_weight (optional number) - how bold you would like your text.
   - background (optional) - the image/color/gif behind the text. Uses the [.meme image syntax](#meme-image-syntax)   
   - color (optional) - default is black, and this parameter changes the color of the text
   - text_align (optional) - default is `center`, and allows you to change where the text is aligned. Other options are `left` and `right`
   - overflow (optional) - default is `allowed`, but this parameter allows you to change if the text will get cut off or not with the option `none`
