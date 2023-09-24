import { Collection } from "discord.js";
import roleOne from "./845856786941607946";
import { ClocksWord } from "./commands/clocks";
import { HuhWord } from "./commands/huh";
import { RandomCaseWord } from "./commands/randomcase";
import Skyrim from "./skyrim";
import IWord from "./word";
import { HiltonWordOne, HiltonWordThree, HiltonWordTwo } from "./commands/hilton";



export default function getWords(): [Collection<string, IWord>, RegExp] {
	const words = new Collection<string, IWord>();

	let word: IWord;
	let wordString = '';

	word = new Skyrim;
	words.set(word.name, word);
	wordString += `${word.name}`; //Add or bar not at the last one
	
	word = new HuhWord;
	words.set(word.name, word);
	wordString += `|${word.name}`;

	word = new ClocksWord;
	words.set(word.name, word);
	wordString += `|${word.name}`;

	word = new roleOne;
	words.set(word.name, word);
	wordString += `|${word.name}`;

	word = new RandomCaseWord;
	words.set('/s', word);
	words.set(' /s', word);
	wordString += `|${word.name}`;

	word = new HiltonWordOne;
	words.set(word.name, word);
	wordString += `|${word.name}`

	word = new HiltonWordTwo;
	words.set(word.name, word);
	wordString += `|${word.name}`

	word = new HiltonWordThree;
	words.set(word.name, word);
	wordString += `|${word.name}`

	const wordRegex = new RegExp(`\\b(${wordString})`, 'gi');
	return [words, wordRegex];
}