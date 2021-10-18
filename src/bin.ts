#!/usr/bin/env node
import * as Caporal from '@caporal/core';
import { quickAtras } from './main';
import fs from 'fs';
const { version } = JSON.parse(fs.readFileSync(__dirname + "/../package.json").toString("utf8"));

const cli = Caporal.program;
// 検索したい住所を指定します。
cli.argument("<address>", "住所", {
	validator: Caporal.program.STRING
});
// 出力する画像ファイルの名前を指定します。
cli.option("-o, --output <fileName>", "出力ファイルの名前", {
	required: true,
	validator: Caporal.program.STRING
});
// 画像ファイルのフォーマットを指定します。
cli.option("-t, --type <fileType>", "出力ファイルのフォーマット", {
	default: "png",
	validator: Caporal.program.STRING
});
// 画像ファイルのサイズを指定します。
cli.option("--width <number>", "画像の横幅", {
	validator: Caporal.program.NUMBER
});
cli.option("--height <number>", "画像の縦の長さ", {
	validator: Caporal.program.NUMBER
});
// ズームレベルを指定します。
cli.option("-z, --zoom <number>", "ズームレベル", {
	validator: Caporal.program.NUMBER
});
// 縮尺を表示するかどうかを指定します。
cli.option("--scale <boolean>", "スケールを表示するかどうか", {
	validator: Caporal.program.BOOLEAN
});
cli.action(({ logger, args, options }) => {
	// 指定されたフォーマットとファイル名に含まれる拡張子に齟齬がある場合警告を表示
	if (options.type == "jpeg") {
		const regex = new RegExp("\.(jpg|jpeg)$");
		if (regex.test(options.output as string) === false) {
			logger.warn("typeオプションで指定されたフォーマットとoutputオプションで指定されたファイル名に矛盾があります");
		}
	} else if (options.type == "png") {
		const regex = new RegExp("\.(png)$");
		if (regex.test(options.output as string) === false) {
			logger.warn("typeオプションで指定されたフォーマットとoutputオプションで指定されたファイル名に矛盾があります");
		}
	}
	// 処理を実行
	quickAtras(args.address as string, {
		outputFileName: options.output as string,
		imageWidth: options.width as number,
		imageHeight: options.height as number,
		zoomLevel: options.zoom as any,
		scale: options.scale as boolean
	}).catch(error => {
		throw error;
	});
});
cli.version(version);
cli.run();