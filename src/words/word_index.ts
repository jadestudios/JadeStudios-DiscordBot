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
	const wordStringArr: string[] = [];

	const addWord = (word: IWord) => {
		words.set(word.name, word);
		wordStringArr.push(word.name);
	};

	addWord(new Skyrim());
	addWord(new HuhWord());
	addWord(new ClocksWord());
	addWord(new roleOne());
	addWord(new RandomCaseWord());
	addWord(new HiltonWordOne());
	addWord(new HiltonWordTwo());
	addWord(new HiltonWordThree());

	const wordString = wordStringArr.join('|');
	const wordRegex = new RegExp(`\\b(${wordString})`, 'gi');
	return [words, wordRegex];
}