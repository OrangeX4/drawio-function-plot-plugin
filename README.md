# Draw.io: Function Plot Plugin

![](https://picgo-1258602555.cos.ap-nanjing.myqcloud.com/20220410000426.png)

The project is based on [drawio_chartjs_plugin](https://github.com/nopeslide/drawio_chartjs_plugin) and [function-plot](https://mauriciopoppe.github.io/function-plot/).

## Usage

**Double click** on a shape and edit the JSON, the shape will be redrawn after leaving the editor.

![](https://picgo-1258602555.cos.ap-nanjing.myqcloud.com/20220410000510.png)

You can visit the website of [Function Plot](https://mauriciopoppe.github.io/function-plot/) for more documents.

[![](https://picgo-1258602555.cos.ap-nanjing.myqcloud.com/20220410000852.png)](https://mauriciopoppe.github.io/function-plot/)

## Installation

### 1. Enable `unsafe-eval` for Drawio Desktop

Because `Function Plot` use `eval()` function, and `eval()` function is blocked by [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) of Electron, it is neccessary to find the way around it.

Firstly, find the file path of drawio desktop and there are a file name `app.asar`.

For example, my `app.asar` file is in `/opt/drawio/resources`.

![](https://picgo-1258602555.cos.ap-nanjing.myqcloud.com/20220410002932.png)

Secondly, install `asar` tool to extract the `app.asar` file. (You can **backup** your `app.asar` file.)

```sh
# install
npm install -g asar

# extract
asar extract app.asar src
```

Thirdly, modify the `index.html` in `src/`, and add ` \'unsafe-eval\'` after `'default-src \'self\' \'unsafe-inline\'`.

![](https://picgo-1258602555.cos.ap-nanjing.myqcloud.com/20220410003428.png)

![](https://picgo-1258602555.cos.ap-nanjing.myqcloud.com/20220410003458.png)

Finally, repack the `src\` into `app.asar`.

```sh
# repack
asar pack src app.asar
```

And if you can open drawio successfully, it is ok.


### 2. Install Plugin

- Download `function-plot-plugin.webpack.js` file in [Releases](https://github.com/OrangeX4/drawio-function-plot-plugin/releases/).

![](https://picgo-1258602555.cos.ap-nanjing.myqcloud.com/20220410004358.png)

- Click on `Extras`, then `Plugins...`.

![](https://picgo-1258602555.cos.ap-nanjing.myqcloud.com/20220410004138.png)

- Click `Add...`.

![](https://picgo-1258602555.cos.ap-nanjing.myqcloud.com/20220410004206.png)

- Click `Select File...`

![](https://picgo-1258602555.cos.ap-nanjing.myqcloud.com/20220410004252.png)

- Select `function-plot-plugin.webpack.js` file and then `Apply`.

![](https://picgo-1258602555.cos.ap-nanjing.myqcloud.com/20220410004616.png)

- Reboot and then you can enjoy it!

![](https://picgo-1258602555.cos.ap-nanjing.myqcloud.com/20220410004703.png)
