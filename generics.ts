interface Book {
	title: string;
	author: string;
	year: number;
	read: boolean;
	rating?: number;
	readonly id: number;
}
const library: Book[] = [
	{
		id: 1,
		title: "The Great Gatsby",
		author: "F. Scott Fitzgerald",
		year: 1925,
		read: true,
		rating: 5,
	},
	{
		id: 2,
		title: "1984",
		author: "George Orwell",
		year: 1949,
		read: true,
		rating: 4,
	},
	{
		id: 3,
		title: "To Kill a Mockingbird",
		author: "Harper Lee",
		year: 1960,
		read: false,
		rating: 3,
	},
];

const lastItem = <T>(arr: T[]): T => {
	return arr[arr.length - 1];
};

console.log(lastItem([1, 2, 3, 4, 5]));
console.log(lastItem(["a", "b", "c", "d", "e"]));
console.log(lastItem(library), lastItem(library).title);
console.log(lastItem([true, false, true]));

// A generic that does something: write const wrapInArray = <T>(item: T): T[] => [item] — takes a single item, returns an array containing just it. Call it with a number, a string, and a Book. Predict the shape of each result. (Notice input is T, output is T[] — the type transforms but stays connected.)

const wrapInArray = <T>(item: T): T[] => [item];
console.log(wrapInArray(2));
console.log(wrapInArray("Lovish"));
console.log(wrapInArray(library[0]));
// console.log(wrapInArray(library[0].titel)) //Property 'titel' does not exist on type 'Book'. Did you mean 'title'?

// Generic interface — the real-world one: define interface ApiResponse<T> with success: boolean, data: T, and optional error?: string. Then create: (a) an ApiResponse<string> holding a success message, and (b) an ApiResponse<Book[]> holding your library. Print both. (This is the pattern you'll build real APIs with.)

interface ApiResponse<T> {
	success: boolean;
	data: T;
	error?: string;
}

const generalResponse: ApiResponse<string> = {
	success: true,
	data: "success",
  };
const bookResponse: ApiResponse<Book[]> = {
	success: true,
	data: library,
  };

//   Thinking question, in a comment: you could have written lastItem as (arr: any[]): any. It would run identically. Explain in your own words what you'd lose by using any instead of <T>. Specifically: after const book = lastItem(library), what does TypeScript know about book in the generic version vs the any version — and which one catches book.titel (typo)? (This is the entire argument for generics over any — take a real swing.)
// Ans: if i use any the code will work but it doesn;t provide type so they dont know what type of data is there and might be someone accidentially pass data like string and actual code might be run number function. narrowing not work. for type: Property 'titel' does not exist on type 'Book'. Did you mean 'title'?


const delay = (ms: number): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, ms));

const getGreeting = async (name: string): Promise<string> => {
	await delay(100);
	return `Hello ${name}`;
};

(async () => {
	const result = await getGreeting("Lovish");

	// Function return type: Promise<string>
	// Awaited variable type: string
	console.log(result);
})();

interface User {
	id: number;
	name: string;
}

const users: User[] = [
	{
		id: 1,
		name: "Lovish",
	},
	{
		id: 2,
		name: "Abhi",
	},
];
const fetchUser = async (id: number): Promise<{ id: number; name: string }> => {
	await delay(300);

	const user = users.find((user) => user.id === id);

	return {
		id: user?.id ?? -1,
		name: user?.name ?? "",
	};
};

(async () => {
	const result = await fetchUser(1);

	console.log(result);
	console.log(result.name); // TypeScript knows this is string
})();

// The realistic one — Promise<Book | null>: reuse your Book/library. Write const findBookAsync = async (id: number): Promise<Book | null> that returns the found book or null (use .find() + ??). Await it twice — once with a real id, once with a missing id. Then try to access .title on the result directly (without a null check) and predict what TS says. Fix it with an if (book) guard. (This forces union + null-safety + async + generics together — the capstone.)


const findBookAsync = async (id: number): Promise<Book | null> => {
	await delay(300);

	const book = library.find((book) => book.id === id);

	return book ?? null;
};

(async () => {
	const existingBook = await findBookAsync(1);
	const missingBook = await findBookAsync(999);

	console.log(existingBook);
	console.log(missingBook);

	// ❌ TypeScript Error:
	// Object is possibly 'null'
	console.log(existingBook?.title);

	// ✅ Null-safe access
	if (existingBook) {
		console.log(existingBook.title);
	}

	if (missingBook) {
		console.log(missingBook.title);
	} else {
		console.log("Book not found");
	}
})();

// Parallel + typed: using Promise.all, await two fetchUser calls at once (from task 2), destructure both results into typed variables, and print both. In a comment: what type does await Promise.all([...]) give you back? (Predict — it's an array, and TS knows each element's type.)

(async () => {
	const [user1, user2] = await Promise.all([
		fetchUser(1),
		fetchUser(2),
	]);

	// Type of await Promise.all([...]):
	// [
	//   { id: number; name: string },
	//   { id: number; name: string }
	// ]
	//
	// TS knows each array element's type based on the promises passed.

	console.log(user1);
	console.log(user2);

	console.log(user1.name); // string
	console.log(user2.name); // string
})();


// Thinking question, in a comment: in task 3, TypeScript refused to let you access .title until you added the if (book) check. Connect this to real API code: why is it good that TS forces this check, and what runtime crash does it prevent? Relate it to the Cannot read properties of null error that plain JavaScript would throw. (This is TS turning a class of runtime crashes into compile-time reminders — take a real swing.)
// ANs: / TypeScript forces the if (book) check because findBookAsync returns Book | null.
// In real API code, data is often missing: a user may be deleted, a product may be
// unavailable, or an API request may return no matching record.
//
// Without this check, plain JavaScript would allow:
//
// const book = await findBookAsync(999);
// console.log(book.title);
//
// If book is null, JavaScript crashes at runtime with:
// "Cannot read properties of null (reading 'title')"
//
// TypeScript moves this problem from runtime to compile time by warning us:
// "Object is possibly 'null'"
//
// The if (book) guard narrows the type from Book | null to Book, proving to TS
// that it is safe to access properties.
//
// This prevents an entire class of production crashes caused by unexpected null
// or missing API responses. Instead of users discovering the error through a
// broken page, developers are reminded to handle the missing-data case while coding.