<html>
    <head>
    </head>
    <body>
        <h1>.meme format viewer!</h1>
        <input class="form-control" type="file" id="file_input"> or, load an <a href="https://github.com/Joshua-Zou/.meme/blob/main/example.meme?raw=true">example file?</a> <button onclick="example();">Yes! Load</button>
        <div id="output"></div>
    </body>
    <script src="./index.js"></script>
</html>
<style>
    #output {
        background-color: grey;
        position: relative;
    }
    #output .child-elements{
        position: absolute;
        transform-origin: top left;
    }
</style>
