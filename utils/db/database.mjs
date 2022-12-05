import { readFileSync, accessSync, writeFileSync } from 'fs';

const _initFile = (__pathFile, __jsonFile) => writeFileSync(__pathFile, JSON.stringify(__jsonFile, null, 2));
const _readJson = (__pathFile) => JSON.parse(readFileSync(__pathFile))
const path = {
	user: './utils/db/users.json',
	grup: './utils/db/groups.json',
	set: './utils/db/sets.json'
}
try {
	accessSync(path.user)
} catch (e) {
	_initFile(path.user, [])
}
try {
	accessSync(path.grup);
} catch (e) {
	_initFile(path.grup, []);
}
try {
	accessSync(path.set);
} catch (e) {
	_initFile(path.set, []);
}
var db = {
	user: _readJson(path.user),
	grup: _readJson(path.grup),
	set: _readJson(path.set)
}
async function initDatabase() {
		setInterval(async() => {
			_initFile(path.user, db.user)
			_initFile(path.grup, db.grup)
			_initFile(path.set, db.set)
		}, 990);
}

export default initDatabase;
export { db }