# quick-atlas

住所を入れるだけで地図を簡単保存 🗾💾

## What's this?

住所を入力するだけで地図を簡単にダウンロードできるコマンドラインアプリです。  
たとえば、東京タワーのある「東京都港区芝公園４丁目２ − ８」付近の地図をダウンロードしてみましょう。

```terminal
quick-atlas 東京都港区芝公園４丁目２−８ -o tokyo-tower.png
```

![https://i.imgur.com/q9awUUB.png](https://i.imgur.com/q9awUUB.png)

日本国内ほぼすべての住所に対応しています。もしうまく行かない住所があれば[Issue](https://github.com/YUUKIToriyama/quick-atlas/issues)からお知らせください。

## Options

オプションを指定することにより、画像のサイズや縮尺、ファイルフォーマットなどを変更することができます。

| フラグ       | オプションの説明                         | 値                           |
| ------------ | ---------------------------------------- | ---------------------------- |
| -o, --output | 出力ファイルの名前を指定します。         | String                       |
| -t, --type   | 出力ファイルのフォーマットを指定します。 | "jpeg" &#124; "png"          |
| --width      | 出力ファイルの横のサイズを指定します。   | Number(px)                   |
| --height     | 出力ファイルの縦のサイズを指定します。   | Number(px)                   |
| -z, --zoom   | 地図のズームレベルを指定します。         | Number(0 から 20 の間の整数) |
| --scale      | スケールを表示するかどうかを指定します。 | Boolean                      |

## Installation

```terminal
npm i -g @toriyama/quick-atlas
quick-atlas --version
```

## API

ライブラリとして他のコードから呼び出して使うこともできます。

```typescript
import { quickAtlas, QuickAtlasOptions } from "@toriyama/quick-atlas";
```

## Thanks to...

- [jperelli/osm-static-maps](https://github.com/jperelli/osm-static-maps)
- [geolonia/normalize-japanese-addresses](https://github.com/geolonia/normalize-japanese-addresses/)

## Author

YUUKIToriyama([@CoconMap](https://twitter.com/CoconMap))
