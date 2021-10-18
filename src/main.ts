import { normalize } from '@geolonia/normalize-japanese-addresses';
import osmsm from 'osm-static-maps';
import fs from 'fs/promises';

export interface QuickAtlasOptions {
	imageType?: "jpeg" | "png" // 出力する画像のフォーマットを指定
	imageWidth?: number // 出力する画像の横幅を指定(px)
	imageHeight?: number // 出力する画像の縦幅を指定(px)
	zoomLevel?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 // 地図の拡大率を指定(0から20の整数)
	scale?: boolean // 縮尺を表示するかどうかを指定(boolean)
	outputFileName: string // 出力する画像の名前を指定(string)
}

export const quickAtras = async (address: string, options: QuickAtlasOptions) => {
	// 住所の正規化 & 緯度経度の取得
	const result = await normalize(address).catch(error => {
		throw Error(error);
	});
	// 緯度経度が取得できなかった場合エラーを返す
	if (result.level < 3) {
		throw Error("緯度経度が取得できませんでした");
	};
	// 地図画像の取得
	const imageBuffer = await osmsm({
		width: options.imageWidth || 500,
		height: options.imageHeight || 500,
		center: `${result.lng}, ${result.lat}`,
		zoom: options.zoomLevel || 15,
		type: options.imageType || "png",
		scale: options.scale || false
	});
	// 画像の書き出し
	await fs.writeFile(options.outputFileName, imageBuffer).catch(error => {
		throw error;
	});
	// 終了
	process.exit(0);
}